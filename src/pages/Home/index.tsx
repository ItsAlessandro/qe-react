import { useEffect, useState } from 'react'
import { useLobbyCreation, useName, useUrl } from '../../data/storage'
import { db } from '../../data/firebase'
import { doc, addDoc, collection, serverTimestamp, setDoc, query, getDoc, where, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import PinCode from '../../components/PinCode'

import './Home.css'
import '../../theme/index.css'

function Home () {

    const navigate = useNavigate()
    const sessionsRef = collection(db, 'sessions');
    const { roomUrl, updateUrl } = useUrl()
    const { userName, updateName } = useName()
    const { currentLobby, updateLobby } = useLobbyCreation()

    useEffect (() => {
        if (currentLobby.length > 1) {
            navigate(`lobby/${currentLobby}`)
        } 
    }, [currentLobby])

    async function handleRoomCreation () {
        const currentUrl: string = roomUrl.join('')

        if (currentUrl.length < 6 || userName.length < 6) {
            alert('URL OR USERNAME ERROR')
        } else {
            const q = query(sessionsRef, where('roomUrl', '==', roomUrl.join('')))  
            const queryResponse = await getDocs(q)
            if (queryResponse.empty) {
                try {
                    const response = await addDoc(sessionsRef, {
                        roomUrl: currentUrl,
                        owner: userName,
                        players: [userName],
                        timestamp: serverTimestamp()
                    })
                    updateLobby(response.id)
                } 
                catch (error) {
                    console.log(error)
                }
            } else {
                alert('ROOM EXISTING')
            }
        } 
        updateName('')
        updateUrl(['', '', '', '', '', ''])
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
                        placeholder='nickname'
                        maxLength={20}
                        onChange={(e) => updateName(e.currentTarget.value)}
                    />
                </div>
                <div className="home-form-buttons">
                    <button className='button'> Partecipa </button>
                    <button className='button' onClick={handleRoomCreation}> Crea </button>
                </div>
            </div>
        </div>
    )
}

export default Home