import { useName, useRole } from '../../data/storage'
import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import PinCode from '../../components/PinCode'
import Request from '../../components/Request'
import Popup from '../../components/Popup'
import home from '../../images/home.svg'
import { db } from '../../data/firebase'
import { doc, updateDoc, onSnapshot, getDoc, deleteDoc, deleteField } from 'firebase/firestore'
import { useLobbyFinder } from '../../data/storage'
import { useGame, usePlayer } from '../../data/gameHandler'
import { player, animal } from '../../data/gameHandler'

import '../Home/Home.css'
import './Lobby.css'

let popupText: string = ""
let popupImage: number = 0

let removedLobby = false

function Lobby() {

    const game = useGame()
    const player = usePlayer()

    const { userName, updateName } = useName()
    const { isOwner, updateRole } = useRole()
    const { currentLobby, updateLobby } = useLobbyFinder()
    const [ pending, setPending ] = useState<string[]>([])
    const [ playersCount, setPlayersCount ] = useState(1)
    const [ displayPopUp, setDisplay ] = useState(false)
    const [ loadingGame, setLoadingGame ] = useState(false)

    const [ currentColour, setCurrentColour ] = useState<string>('#FFFFFF')
    const navigate = useNavigate()
      
    useEffect(() => {
        getDoc(doc(db, 'sessions', currentLobby)).then(
            res => {
                let gamePArray = res.data()!.gamePlayers
                let gamePlayersResult : player [] = []
                for (let i = 0; i < gamePArray.length; i++) {
                    player.updateUsername(res.data()![gamePArray[i]].username)
                    player.updateID(res.data()![gamePArray[i]].ID)
                    player.updateRegion(res.data()![gamePArray[i]].region)
                    player.updateColour(res.data()![gamePArray[i]].colour)
                    player.updateMoneySpent(res.data()![gamePArray[i]].moneySpent)
                    player.updateIsAuctioneer(res.data()![gamePArray[i]].isAuctioneer)
                    player.updatePoints(res.data()![gamePArray[i]].points)
                    player.updateBoughtAnimals(res.data()![gamePArray[i]].boughtAnimals)
                    player.updateBids(res.data()![gamePArray[i]].bids)
                    gamePlayersResult.push(player)
                }
                game.updatePlayers(gamePlayersResult)
                console.log('USERNAME: ' + res.data()![gamePArray[0]].username)
            }
        )
        console.log(game)

        try {
            getDoc(doc(db, 'sessions', currentLobby)).then(
                (res) => setCurrentColour(res.data()![userName].colour)
            )
        } catch (err) {
            console.log(err)
        }
        
    }, [playersCount])

    async function handleRemoveLobby () {
        await deleteDoc(doc(db, 'sessions', currentLobby))
        navigate('/')
    }

    async function handleExit (name : string) {
        const response = await getDoc(doc(db, 'sessions', currentLobby))
        let currentPlayers : string[] = response.data()?.gamePlayers
        currentPlayers.splice(currentPlayers.indexOf(name), 1)
        await updateDoc(doc(db, 'sessions', currentLobby), {
            gamePlayers: currentPlayers,
            [name]: deleteField()
        })
        setPlayersCount(old => old - 1)
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

        let currentRegion : string = ''
        await getDoc(doc(db, 'data', 'regions')).then(
            res => { currentRegion = res.data()!.regions[
                response.data()?.gameIndexes[currentPlayers.length - 1]
            ]}
        )

        let currentColour : string = ''
        await getDoc(doc(db, 'data', 'colours')).then(
            res => { currentColour = res.data()!.colours[
                response.data()?.gameIndexes[currentPlayers.length - 1]
            ]}
        )

        await updateDoc(doc(db, 'sessions', currentLobby), {
            gamePlayers: currentPlayers,
            gamePending: currentPending,
            [currentPlayers[currentPlayers.length - 1]]: {
                userName: currentPlayers[currentPlayers.length - 1],
                ID: response.data()?.gameIndexes[currentPlayers.length - 1],
                region: currentRegion,
                colour: currentColour,
                moneySpent: 0,
                isAuctioneer: false,
                points: 0,
                boughtAnimals: [],
                bids: []
            }
        })
    }

    async function createGame () {
        const response = await getDoc(doc(db, 'sessions', currentLobby))
        let currentPlayers : string[] = response.data()?.gamePlayers
        if (currentPlayers.length > 2) {
            await updateDoc(doc(db, 'sessions', currentLobby), {
                gameStarted: true
            })
            navigate(`../game/${currentLobby}`)
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
                if (doc.data() === undefined) { // session removed
                    navigate('/')
                }

                // GAME 

                let playersToDisplay = doc.data() !== undefined 
                ?  [...doc.data()?.gamePlayers, ...doc.data()?.gamePending] : []

                let counter = 0;
                playersToDisplay = playersToDisplay.map(
                    function (val: string, index : number) {
                        if (index < doc.data()?.gamePlayers.length) {
                            return (
                                <Request
                                    key={index}
                                    index={index}
                                    colour={currentColour}
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
            
        })
        return () => { unsub() }
    }, [playersCount, currentColour])

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
