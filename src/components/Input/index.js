import React from 'react'
import './Input.css'

function Input({userName, setUserName}) {

    function handleChange (event) {
        setUserName(event.target.value)
    }   

    return (
        <div>
            <input 
                className='input'
                type='text'
                value={userName}
                placeholder='UserName'
                maxLength={20}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}

export default Input