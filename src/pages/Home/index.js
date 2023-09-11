import React, { useState } from 'react'
import PinCode from '../../components/PinCode'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './Home.css'

function Home() {
    const [pinCode, setPinCode] = useState(['', '', '', '', '', ''])
    const [userName, setUserName] = useState('')

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
                    <Input 
                        userName={userName}
                        setUserName={setUserName}
                    />
                </div>
                <div className='home-form'>
                    <Button text={'Partecipa'} color={'#0075FF'} />
                    <Button text={'Crea'} color={'#0075FF'}/>
                </div>
            </div>
        </div>
    )
}

export default Home