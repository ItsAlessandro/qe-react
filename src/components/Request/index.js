import React, { useState } from 'react'
import './Request.css'

function Request({colour}) {

  return (
    <div className='request'>
        <div className='request-circle' style={{backgroundColor: colour}}></div>
        <div className='request-label'>
            <p className='request-nickname'> nickname </p>
        </div>
    </div>
  )
}

export default Request