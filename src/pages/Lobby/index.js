import React from 'react'
import PinCode from '../../components/PinCode'
import Request from '../../components/Request'
import '../Home/Home.css'
import './Lobby.css'

function Lobby() {

  return (
    <div className='lobby home'>
            <div className='lobby-header home-header'></div>

            <div className='lobby-code home-code'>
                <PinCode />
            </div>

            <div className='lobby-body'>
              <div className='lobby-container'>
                <Request colour="#4287f5"></Request>
                <Request colour="#4287f5"></Request>
                <Request colour="#4287f5"></Request>
                <Request colour="#4287f5"></Request>
                <Request colour="#4287f5"></Request>
                <Request colour="#4287f5"></Request>
                <Request colour="#4287f5"></Request>
              </div>
              <div className='lobby-startbutton-container'>
                <button className='generic-button'>Avvia</button>
              </div>
            </div>
    </div>
  )
}

export default Lobby