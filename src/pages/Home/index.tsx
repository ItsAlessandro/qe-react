import { useEffect, useState } from 'react'
import { useLobbyFinder, useName, useUrl, useRole } from '../../data/storage'
import { db } from '../../data/firebase'
import { doc, addDoc, collection, serverTimestamp, query, where, getDocs, updateDoc, onSnapshot, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import PinCode from '../../components/PinCode'

import './Home.css'
import '../../theme/index.css'

function Home () {

    const navigate = useNavigate()

    const { roomUrl, updateUrl } = useUrl()
    const { userName, updateName } = useName()
    const { currentLobby, updateLobby } = useLobbyFinder()
    const { isOwner, updateRole } = useRole()

    const [ joining, setJoining ] = useState(false)
    const [ listening, setListening ] = useState(false) // Participate

    useEffect(() => { // joins to the latest update of currentLobby state
        if (joining) {
            try {
                navigate(`lobby/${currentLobby}`)
            } catch (error) {
                alert('ERROR WHILE ACCESSING THE ROOM')
            }
        }      
    }, [joining])

    useEffect(() => {
        if (listening) {
            try {
                const unsub = onSnapshot(doc(db, 'sessions', currentLobby), (doc) => {
                    let updatedPlayers : string [] = doc.data()?.gamePlayers
                    if (updatedPlayers.find(e => e == userName)) {
                        setJoining(true)
                    }
                })
            } catch (error) {
                alert('ERROR WHILE CONNECTING TO DATABASE')
            }
        }
    }, [listening]) 

    async function credentialCheck (url : string, username : string, intent : string) {
        
        if (username.length < 6 || username.length > 24) {
            alert('INVALID USERNAME')
            return false;
        } else if (url.length != 6) {
            alert('INVALID URL')
            return false;
        }

        const q = query(collection(db, 'sessions'),
            where('roomUrl', '==', url))     
        try {
            const querySnapshot = await getDocs(q)
            if (intent === 'CREATE') {
                if (querySnapshot.empty) return true
                else alert('URL ALREADY IN USE')
            } else if (intent === 'JOIN') {
                if (querySnapshot.empty) alert('ROOM NOT FOUND')
                else return true
            }
        } catch (error) {
            alert('ERROR WHILE ACCESSING DATABASE')
        }
        return false
    }

    
    async function handleCreation () {
        const currentUrl : string = roomUrl.join('')
        if (await credentialCheck(currentUrl, userName, 'CREATE')) { // username & url valid
            try {
                const response = await addDoc(collection(db, 'sessions'), {
                    roomUrl: currentUrl,
                    roomOwner: userName,
                    gameStarted: false,
                    gamePlayers: [userName],
                    gamePending: []
                })
                updateRole(true)
                updateLobby(response.id)
                setJoining(true)
            } catch (error) {
                alert('ERROR WHILE CREATING THE ROOM')
            }
        }
    }

    async function handleJoin () {    
        const currentUrl : string = roomUrl.join('')
        if (await credentialCheck(currentUrl, userName, 'JOIN')) { // username & url valid
            const q = query(collection(db, 'sessions'), where('roomUrl', '==', currentUrl))
            try {
                const querySnapshot = await getDocs(q)
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async document => {
                        if (!document.data().gameStarted) {
                            let pendingArray = [...document.data().gamePending]
                            let joinedArray = [...document.data().gamePlayers]
                            if (pendingArray.find(e => e == userName) || joinedArray.find(e => e == userName)) {
                                alert('USERNAME ALREADY IN USE')
                            } else {
                                try {
                                    pendingArray.push(userName)
                                    await updateDoc(doc(db, 'sessions', document.id), {
                                        gamePending: pendingArray
                                    })
                                    updateLobby(document.id)
                                    setListening(true)
                                } catch (error) {
                                    alert('ERROR WHILE UPDATING DATABASE')
                                }
                            }
                        } else {
                            alert('GAME ALREADY STARTED')
                        }
                    })
                }
            } catch (error) {
                alert('ERROR WHILE ACCESSING DATABASE')
            }
        }
    }

    return (
        <div className='home'>
            <div className="home-header"> </div>

            <div className="home-options">
                <PinCode />
            </div>
            
            <div className="home-form">
                <div className="home-form-input">
                    <input 
                        className='input'
                        type="text"
                        value={userName}
                        placeholder='Username'
                        maxLength={24}
                        onChange={(e) => updateName(e.currentTarget.value)}
                    />
                </div>
                <div className="home-form-buttons">
                    <button className='button' onClick={handleJoin}> Partecipa </button>
                    <button className='button' onClick={handleCreation}> Crea </button>
                </div>
            </div>
        </div>
    )
}

export default Home