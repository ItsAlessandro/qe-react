import React, { useState } from 'react'
import tick from '../../images/utils/tick.svg'
import reject from '../../images/utils/reject.svg'
import './Request.css'

function Request({colour}) {
  const [outcome, setOutcome] = useState(-1);

  function handleClick(e) {    
    setOutcome(e.target.id)
  }

  if (outcome == -1) {
    return (
      <div className='request'>
          <div className='request-label'>
              <p className='request-nickname'>nickname</p>
          </div>
          <div>
            <button className='request-button' id='0' style={{backgroundColor:'#000000'}} onClick={(e) => handleClick(e)}>
              <img src={reject} id='0'></img>
            </button>
          </div>
          <div>
            <button className='request-button' id='1' style={{backgroundColor:'#0075ff'}} onClick={(e) => handleClick(e)}>
              <img src={tick} id='1'></img>
            </button>
          </div>
      </div>
    )  
  }
  else if (outcome == 0) {
    return (<div></div>)
  }
  else {
    return (
    <div className='request'>
        <div className='request-circle' style={{backgroundColor: colour}}></div>
        <div className='request-accepted-label'>
            <p className='request-nickname'>nickname</p>
        </div>
    </div>
    )
  }
}

export default Request