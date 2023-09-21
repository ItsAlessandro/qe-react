import { useUrl } from "../../data/storage"

import './PinCode.css'

function PinCode({enabled} : {enabled : boolean}) {

    const  { roomUrl, updateUrl } = useUrl()
    const placeholders = ['R', 'O', 'O', 'M', 'I', 'D'];

    function handleChange (event : React.ChangeEvent<HTMLInputElement>) {
        if (enabled) {
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
    }

    function handleBackspace (event : React.KeyboardEvent<HTMLInputElement>) {
        if (enabled) {
            if (event.keyCode === 8) {
                let array = [...roomUrl]
                array[parseInt(event.currentTarget.id)] = ''
                updateUrl(array)
                if (event.currentTarget.id !== '0') 
                    document.getElementById((parseInt(event.currentTarget.id) - 1).toString())?.focus()
            }
        }
    }

    return (
        <div className='pincode'>
            {placeholders.map((placeholder, index) => (
                <input
                    key={index}
                    type='text'
                    placeholder={placeholder}
                    value={roomUrl[index]}
                    id={index.toString()}
                    className='pincode-input'
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => handleBackspace(e)}
                    style={!enabled ? {outline: 'none'} : {}}
                />
            ))}
        </div>
    )
}

export default PinCode