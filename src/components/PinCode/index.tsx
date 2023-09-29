import { useEffect, useState } from 'react'
import { useCode } from "../../data/genericData"

import './PinCode.css'

function PinCode({enabled} : {enabled : boolean}) {

    const codeHandler = useCode() 
    const placeholders = ['R', 'O', 'O', 'M', 'I', 'D'];
    const  [ pinValues, setPinValues ] = useState(['', '', '', '', '', '']);

    function handleChange (event : React.ChangeEvent<HTMLInputElement>) {
        if (enabled) {
            let array : string[] = [...pinValues]
            if (event.target.value.length >= 1) {

                array[parseInt(event.target.id)] = array[parseInt(event.target.id)] 
                ? event.target.value[1].toUpperCase() 
                : event.target.value[0].toUpperCase()

                if (parseInt(event.target.id) !== 5) 
                    document.getElementById((parseInt(event.target.id) + 1).toString())?.focus()
                else 
                    document.getElementById(event.target.id)?.blur()
            }
            setPinValues(array)
            codeHandler.updateCode(array.join(''))
        }
    }

    function handleBackspace (event : React.KeyboardEvent<HTMLInputElement>) {
        if (enabled) {
            if (event.keyCode === 8) {
                let array = [...pinValues]
                array[parseInt(event.currentTarget.id)] = ''
                setPinValues(array)
                codeHandler.updateCode(array.join(''))
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
                    value={pinValues[index]}
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