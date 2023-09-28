import { useName, useRole } from '../../data/storage'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PinCode from '../../components/PinCode'
import Request from '../../components/Request'
import Popup from '../../components/Popup'
import home from '../../images/home.svg'
import { db } from '../../data/firebase'
import { doc, updateDoc, onSnapshot, getDoc, deleteDoc } from 'firebase/firestore'
import { useLobbyFinder } from '../../data/storage'

import '../Home/Home.css'
import './Lobby.css'

let popupText: string = ""
let popupImage: number = 0

let removedLobby: boolean = false

function Lobby() {

    const { userName, updateName } = useName()
    const { isOwner, updateRole } = useRole()
    const { currentLobby, updateLobby } = useLobbyFinder()
    const [ pending, setPending ] = useState<string[]>([])
    const [ playersCount, setPlayersCount ] = useState(1)
    const [ displayPopUp, setDisplay ] = useState(false)
    const [ loadingGame, setLoadingGame ] = useState(false)

    const navigate = useNavigate()

    async function handleRemoveLobby () {
        removedLobby = true
        await deleteDoc(doc(db, 'sessions', currentLobby))
        navigate('/')
    }

    async function handleExit (name : string) {
        const response = await getDoc(doc(db, 'sessions', currentLobby))
        let currentPlayers : string[] = response.data()?.gamePlayers
        currentPlayers.splice(currentPlayers.indexOf(name), 1)
        await updateDoc(doc(db, 'sessions', currentLobby), {
            gamePlayers: currentPlayers
        })
        navigate('/')
    }

    async function rejectPlayer (index : number) {
        const response = await getDoc(doc(db, 'sessions', currentLobby))
        let currentArray : string[] = response.data()?.gamePending
        currentArray.splice(index, 1)

        await updateDoc(doc(db, 'sessions', currentLobby), {
            gamePending: currentArray
        })
    }

    async function acceptPlayer (index : number) {
        const response = await getDoc(doc(db, 'sessions', currentLobby))
        let currentPlayers : string[] = response.data()?.gamePlayers
        let currentPending : string[] = response.data()?.gamePending
        
        currentPlayers.push(currentPending.splice(index, 1)[0])
        setPlayersCount(oldCount => ++oldCount)

        await updateDoc(doc(db, 'sessions', currentLobby), {
            gamePlayers: currentPlayers,
            gamePending: currentPending
        })
    }

    async function createGame () {
        const response = await getDoc(doc(db, 'sessions', currentLobby))
        let currentPlayers : string[] = response.data()?.gamePlayers
        if (currentPlayers.length > 2) {
            await updateDoc(doc(db, 'sessions', currentLobby), {
                gameStarted: true
            })
            navigate('../game/${currentLobby}')
        } else {
            popupImage = 1
            popupText = "Ci devono essere almeno 3 giocatori per iniziare la partita"
            setDisplay(true)
        }
    }

    const closingTab = async () => {
        handleExit(userName)
    }
    useEffect(() => {
        window.addEventListener("beforeunload", closingTab)
        return () => {
            window.removeEventListener("beforeunload", closingTab)
        }
    }, [])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'sessions', currentLobby), (doc) => {
            if (!removedLobby) {
                let playersToDisplay = [...doc.data()?.gamePlayers, ...doc.data()?.gamePending]
                let counter = 0;
                playersToDisplay = playersToDisplay.map(
                    function (val: string, index : number) {
                        if (index < doc.data()?.gamePlayers.length) {
                            return (
                                <Request
                                    key={index}
                                    index={index}
                                    colour={'#FFFFFF'}
                                    nickname={val}
                                    type={0} // 0 = joined player
                                    rejectPlayer={rejectPlayer}
                                    acceptPlayer={acceptPlayer}
                                />
                            )
                        } else if (isOwner) {
                            return (
                                <Request
                                    key={index}
                                    index={counter++}
                                    colour={'#FFFFFF'}
                                    nickname={val}
                                    type={1} // 1 = pending player
                                    rejectPlayer={rejectPlayer}
                                    acceptPlayer={acceptPlayer}
                                />
                            )

                        }
                        
                    }
                )
                setPending(playersToDisplay)
            }
        })
        return () => { unsub() }
    }, [])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'sessions', currentLobby), (doc) => {
            if (doc.data()?.gameStarted) {
                navigate('../game/${currentLobby}')
            } 
        })
        return () => { unsub() }
    }, [])

    return (
        <div className='lobby home'>
            {
                displayPopUp && 
                <Popup 
                    imageIndex={popupImage} 
                    text={popupText} 
                    display={displayPopUp} 
                    setDisplay={setDisplay}
                    isLoading={loadingGame}
                    setLoading={setLoadingGame}
                />
            }
                <div className='lobby-header home-header'></div>

                <div className='lobby-code home-options'>
                    <PinCode enabled={false} />
                </div>

                <div className='lobby-body'>
                <div className='lobby-container'>
                {pending}
                </div>
                    {isOwner ? 
                    <div className='lobby-footer'>
                        <button 
                            className='button'
                            style={playersCount < 3 ? {backgroundColor: '#7BB8FF'} : {backgroundColor: '#0075FF'}}
                            onClick={() => createGame()}
                        >
                            Avvia
                        </button>
                        <button 
                            className='button button-home-icon' 
                            style={{ backgroundColor: 'black', width: '20%' }}
                            onClick={() => handleRemoveLobby()}
                        >
                            <img src={home}></img> 
                        </button>
                    </div>
                    :
                    <div className='lobby-footer'>
                        <button 
                            className='button button-home-icon' 
                            style={{ backgroundColor: 'black'}}
                            onClick={() => handleExit(userName)}
                        >
                            <img src={home}></img> 
                        </button>
                    </div>
                }
                </div>
        </div>
    )
}

export default Lobby
