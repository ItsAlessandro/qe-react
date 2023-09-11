import React from 'react'
import './PinCode.css'

function PinCode({currentState, setState}) {

    function handleChange (event) {
        setState(oldState => {
            let array = [...oldState]
            if (event.target.value.length >= 1) {

                array[event.target.id] = array[event.target.id] 
                ? event.target.value[1].toUpperCase() 
                : event.target.value[0].toUpperCase()

                if (event.target.id !== '5') {
                    document.getElementById((parseInt(event.target.id) + 1).toString()).focus()
                } else document.getElementById(event.target.id).blur()
                
            } else array[event.target.id] = ''
            
            return array
        })
    }

    return (
        <div className='pincode'>
            <input 
                type='text' placeholder='R' value={currentState[0]} id='0'
                onChange={(e) => handleChange(e)} className='pincode-input'
            />
            <input 
                type='text' placeholder='O' value={currentState[1]} id='1'
                onChange={(e) => handleChange(e)} className='pincode-input'
            />
            <input 
                type='text' placeholder='O' value={currentState[2]} id='2'
                onChange={(e) => handleChange(e)} className='pincode-input'
            />
            <input 
                type='text' placeholder='M' value={currentState[3]} id='3'
                onChange={(e) => handleChange(e)} className='pincode-input'
            />
            <input 
                type='text' placeholder='I' value={currentState[4]} id='4'
                onChange={(e) => handleChange(e)} className='pincode-input'
            />
            <input 
                type='text' placeholder='D' value={currentState[5]} id='5'
                onChange={(e) => handleChange(e)} className='pincode-input'
            />
        </div>
    )
}

export default PinCode