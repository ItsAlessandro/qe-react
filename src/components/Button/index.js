import React from 'react'
import './Button.css'

function Button({text, color}) {
  return (
    <button className='button' style={{backgroundColor: color}}>
        {text}
    </button>
  )
}

export default Button