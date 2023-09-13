import { useTheme } from '@emotion/react'
import PinCode from '../../components/PinCode'
import { useDisplayName, useSessionUrl } from '../../store'
import './Home.css'

// Firebase imports
import { db } from '../../firebase'
import { doc, setDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore'

function Home() {

    const theme = useTheme()
    const displayName = useDisplayName(state => state.displayName)
    const changeName = useDisplayName(state => state.updateName)
    const sessionURL = useSessionUrl(state => state.sessionUrl)

    async function handleCreateSession () {
        if (sessionURL.join('').length != 6) {
            alert('INVALID SESSION URL')
        } else if (displayName.length < 3) {
            alert('INVALID USERNAME')
        } else {
            await addDoc(collection(db, 'sessions'), {
                sessionURL: sessionURL.join(''),
                owner: displayName,
                creation: serverTimestamp()
            })
        }   
    }

    return (
        <div className='home'>
            <div className='home-header'></div>
            <div className='home-code'>
                <PinCode />
            </div>
            <div className='home-options' id='test-id'>
                <div className='home-form-input'>
                    <input 
                        style={theme.input}
                        type='text'
                        value={displayName}
                        placeholder='UserName'
                        maxLength={20}
                        onChange={(e) => changeName(e)}
                    />
                </div>
                <div className='home-form'>
                    <button style={theme.button}> Partecipa </button>
                    <button style={theme.button} onClick={handleCreateSession}> Crea </button>
                </div>
            </div>
        </div>
    )
}

export default Home