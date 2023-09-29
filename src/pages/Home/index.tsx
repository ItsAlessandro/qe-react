import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCode, useLobby, useName } from '../../data/genericData';
import { createLobby, joinLobby } from '../../data/homeHandler';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../data/firebase';

import PinCode from '../../components/PinCode';

import './Home.css';

function Home() {

    const navigate = useNavigate()

    // zustand storage
    const codeHandler = useCode()
    const nameHandler = useName()
    const lobbyHandler = useLobby()

    // participation flag
    const [ listening, setListening ] = useState<boolean>(false) 

    // Lobby participation listening
    useEffect(() => {
        if (listening) {

            // beign executed everytime there's a change in session -> currentLobby
            const unsubscribe = onSnapshot(doc(db, 'sessions', lobbyHandler.currentLobby), doc => {

                // saving a copy of 'players' and 'pending'
                let updatedPlayers : string[] = doc.data()?.players
                let updatedPending : string[] = doc.data()?.pending

                // if the player is accepted or refused, his username is removed from pending array in firestore
                if (!updatedPending.includes(nameHandler.username)) {
                    
                    if (updatedPlayers.includes(nameHandler.username)) { // accepted from the owner
                        try {
                            navigate(`lobby/${lobbyHandler.currentLobby}`)
                        } catch (error) {   
                            alert('ERROR WHILE ACCESSING THE SESSION')
                        }
                    } 
                    else { // refused from the owner
                        setListening(false)
                        alert('REFUSED FROM THE LOBBY') // YOUSSEF
                    }
                } 
            })

            // cleanup function, is executed when the component is disassembled
            return () => { unsubscribe() }
        }
    }, [listening])

    function handleParticipation () {
        // player's username is inserted in pending array 
        joinLobby(codeHandler, nameHandler.username)
    }

    return (
        <div className='home'>
            <div className="home-header"></div>

            <div className="home-options">
                <PinCode enabled={true} />
            </div>
            
            <div className="home-form">

                <div className="home-form-input">
                    <input 
                        className='input'
                        type="text"
                        value={nameHandler.username}
                        placeholder='username'
                        maxLength={12}
                        onChange={(e) => nameHandler.updateName(e.currentTarget.value)}
                    />
                </div>

                <div className="home-form-buttons">
                    <button className='button' onClick={() => handleParticipation()}> Partecipa </button>
                    <button className='button' onClick={() => createLobby(codeHandler, nameHandler.username)}> Crea </button>
                </div>

            </div>
        </div>
    )
}

export default Home
