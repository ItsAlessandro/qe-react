import { useUrl } from "../../data/storage"

import './PinCode.css'

function PinCode() {

    const  { roomUrl, updateUrl } = useUrl()

    function handleChange (event : React.ChangeEvent<HTMLInputElement>) {
        let array : string[] = [...roomUrl]
        if (event.target.value.length >= 1) {

            array[parseInt(event.target.id)] = array[parseInt(event.target.id)] 
            ? event.target.value[1].toUpperCase() 
            : event.target.value[0].toUpperCase()

            if (parseInt(event.target.id) !== 5) 
                document.getElementById((parseInt(event.target.id) + 1).toString())?.focus()
            else 
                document.getElementById(event.target.id)?.blur()
        }
        updateUrl(array)
    }

    function handleBackspace (event : React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 8) {
            let array = [...roomUrl]
            array[parseInt(event.currentTarget.id)] = ''
            updateUrl(array)

            if (event.currentTarget.id !== '0') 
                document.getElementById((parseInt(event.currentTarget.id) - 1).toString())?.focus()
        }
    }

    return (
        <div className='pincode'>
            <input type='text' placeholder='R' value={roomUrl[0]} id='0' className='pincode-input'
            onChange={(e) => handleChange(e)}  onKeyDown={(e) => handleBackspace(e)} />

            <input type='text' placeholder='O' value={roomUrl[1]} id='1' className='pincode-input'
            onChange={(e) => handleChange(e)}  onKeyDown={(e) => handleBackspace(e)} />

            <input type='text' placeholder='O' value={roomUrl[2]} id='2' className='pincode-input'
            onChange={(e) => handleChange(e)}  onKeyDown={(e) => handleBackspace(e)} />

            <input type='text' placeholder='M' value={roomUrl[3]} id='3' className='pincode-input'
            onChange={(e) => handleChange(e)}  onKeyDown={(e) => handleBackspace(e)} />

            <input type='text' placeholder='I' value={roomUrl[4]} id='4' className='pincode-input'
            onChange={(e) => handleChange(e)}  onKeyDown={(e) => handleBackspace(e)} />

            <input type='text' placeholder='D' value={roomUrl[5]} id='5' className='pincode-input'
            onChange={(e) => handleChange(e)}  onKeyDown={(e) => handleBackspace(e)} />
        </div>
    )
}

export default PinCode