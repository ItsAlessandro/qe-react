import { useName, useUrl } from '../../data/storage'

import PinCode from '../../components/PinCode'

import header from '../../images/HomeBackground.svg'
import './Home.css'
import '../../theme/index.css'

function Home () {

    const { roomUrl, updateUrl } = useUrl()
    const { userName, updateName } = useName()

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
                        maxLength={20}
                        onChange={(e) => updateName(e.currentTarget.value)}
                    />
                </div>
                <div className="home-form-buttons">
                    <button className='button'> Partecipa </button>
                    <button className='button'> Crea </button>
                </div>
            </div>
        </div>
    )
}

export default Home