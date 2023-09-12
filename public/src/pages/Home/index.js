import React, { useState } from 'react'
import PinCode from '../../components/PinCode'
import './Home.css'
import { useDisplayName } from '../../store'

function Home() {

    const [pinCode, setPinCode] = useState(['', '', '', '', '', ''])
    const [userName, setUserName] = useState('')

    /* const displayName = useDisplayName(state => state.displayName)
    const changeName = useDisplayName(state => state.updateName)

    console.log(displayName)
    changeName('Ciao')
    console.log(displayName) */

    function InputhandleChange (event) {
        setUserName(event.target.value)
    }   

    return (
        <div className='home'>
            <div className='home-header'></div>
            <div className='home-code'>
                <PinCode 
                    currentState={pinCode}
                    setState={setPinCode}
                />
            </div>
            <div className='home-options' id='test-id'>
                <div className='home-form-input'>
                    <input 
                        className='generic-input'
                        type='text'
                        value={userName}
                        placeholder='UserName'
                        maxLength={20}
                        onChange={(e) => InputhandleChange(e)}
                    />
                </div>
                <div className='home-form'>
                    <button className='generic-button'> Partecipa </button>
                    <button className='generic-button'> Crea </button>
                </div>
            </div>
        </div>
    )
}

export default Home