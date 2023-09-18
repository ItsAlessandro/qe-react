import { useState } from 'react'
import tick from '../../images/tick.svg'
import reject from '../../images/reject.svg'
import './Request.css';

interface RequestProps {
  colour: string;
  nickname: string;
}

const Request: React.FC<RequestProps> = ({ colour, nickname }) => {
  const [ outcome, setOutcome ] = useState(-1)

  function handleClick(id: number) {
    setOutcome(id)
  }

  if (outcome === -1) {
    return (
      <div className='request'>
        <div className='request-label'>
          <ScaleText maxFontSize={20}>
          <p className='request-nickname'>{nickname}</p>
          </ScaleText>
        </div>
        <div>
          <button className='request-button' id='0' style={{backgroundColor:'#000000'}} onClick={() => handleClick(0)}>
            <img src={reject} alt='' onClick={() => handleClick(0)}></img>
          </button>
        </div>
        <div>
          <button className='request-button' id='1' style={{backgroundColor:'#0075ff'}} onClick={() => handleClick(1)}>
            <img src={tick} alt='' onClick={() => handleClick(1)}></img>
          </button>
        </div>
      </div>
    );
  } else if (outcome === 0) {
    return (<div></div>)
  } else {
    return (
      <div className='request'>
        <div className='request-circle' style={{backgroundColor: colour}}></div>
        <div className='request-accepted-label'>
          <p className='request-nickname'>{nickname}</p>
        </div>
      </div>
    );
  }
};

export default Request;
