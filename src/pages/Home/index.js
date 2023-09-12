import React, { useState } from 'react'
import PinCode from '../../components/PinCode'
import './Home.css'

function Home() {

    const [pinCode, setPinCode] = useState(['', '', '', '', '', ''])
    const [userName, setUserName] = useState('')

    function InputhandleChange (event) { // Input
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
            <div className='home-options'>
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