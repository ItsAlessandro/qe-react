import React, { useState } from 'react'
import PinCode from '../../components/PinCode'
import './Home.css'

function Home() {
    const [pinCode, setPinCode] = useState(['', '', '', '', '', ''])

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

            </div>
        </div>
    )
}

export default Home