import './PinCode.css'
import { useSessionUrl } from '../../store'

function PinCode () {

    const currentSessionUrl = useSessionUrl(state => state.sessionUrl)
    const updateSessionUrl = useSessionUrl(state => state.updateUrl)

    function handleChange (event) {
        let array = [...currentSessionUrl]
        if (event.target.value.length >= 1) { // only if is a printable char
            array[event.target.id] = array[event.target.id] 
            ? event.target.value[1].toUpperCase() 
            : event.target.value[0].toUpperCase()

            if (event.target.id !== '5') {
                document.getElementById((parseInt(event.target.id) + 1).toString()).focus()
            } else document.getElementById(event.target.id).blur()            
        }
        updateSessionUrl(array)
    } 

    function handleBackSpace (event) {
        if(event.keyCode === 8) { // Backspace
            let array = [...currentSessionUrl]
            array[event.target.id] = ''
            updateSessionUrl(array)

            if (event.target.id !== '0') {
                document.getElementById((parseInt(event.target.id) - 1).toString()).focus()
            }
            else document.getElementById(event.target.id).blur()
        }
    }

    return (
        <div className='pincode'>
            <input 
                type='text' placeholder='R' value={currentSessionUrl[0]} id='0'
                onChange={(e) => handleChange(e)} className='pincode-input' onKeyDown={(e) => handleBackSpace(e)}
            />
            <input 
                type='text' placeholder='O' value={currentSessionUrl[1]} id='1'
                onChange={(e) => handleChange(e)} className='pincode-input' onKeyDown={(e) => handleBackSpace(e)}
            />
            <input 
                type='text' placeholder='O' value={currentSessionUrl[2]} id='2'
                onChange={(e) => handleChange(e)} className='pincode-input' onKeyDown={(e) => handleBackSpace(e)}
            />
            <input 
                type='text' placeholder='M' value={currentSessionUrl[3]} id='3'
                onChange={(e) => handleChange(e)} className='pincode-input' onKeyDown={(e) => handleBackSpace(e)}
            />
            <input 
                type='text' placeholder='I' value={currentSessionUrl[4]} id='4'
                onChange={(e) => handleChange(e)} className='pincode-input' onKeyDown={(e) => handleBackSpace(e)}
            />
            <input 
                type='text' placeholder='D' value={currentSessionUrl[5]} id='5'
                onChange={(e) => handleChange(e)} className='pincode-input' onKeyDown={(e) => handleBackSpace(e)}
            />
        </div>
    )
}

export default PinCode