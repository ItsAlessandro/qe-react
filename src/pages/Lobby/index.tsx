import { useRole } from '../../data/storage'
import PinCode from '../../components/PinCode'
import Request from '../../components/Request'


import '../Home/Home.css'
import './Lobby.css'


function Lobby() {
  const { isOwner, updateRole } = useRole()
  
  return (
    <div className='lobby home'>
            <div className='lobby-header home-header'></div>

            <div className='lobby-code home-options'>
                <PinCode />
            </div>

            <div className='lobby-body'>
              <div className='lobby-container'>
                <Request {...{ colour: "#4287f5", nickname: "lucalucalucalucaluca" }}></Request>
                <Request {...{ colour: "#4287f5", nickname: "marco" }}></Request>
              </div>
              {isOwner ? 
                <div className='lobby-footer'>
                    <button className='button'>Avvia</button>
                    <button className='button' style={{ backgroundColor: 'black', width: '20%' }}> Home </button>
                </div>
              :
                <div className='lobby-footer'>
                  <button className='button' style={{ backgroundColor: 'black'}}> Home </button>
                </div>
              }
            </div>
    </div>
  )
}

export default Lobby
