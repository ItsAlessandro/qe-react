import { useState } from 'react';
import tick from '../../images/tick.svg';
import reject from '../../images/reject.svg';
import './Request.css';

interface RequestProps {
  colour: string;
  nickname: string;
}

const Request: React.FC<RequestProps> = ({ colour, nickname }) => {
  const [ outcome, setOutcome ] = useState(-1)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setOutcome(parseInt((event.target as HTMLButtonElement).id))
  }

  if (outcome === -1) {
    return (
      <div className='request'>
        <div className='request-label'>
          <p className='request-nickname'>{nickname}</p>
        </div>
        <div>
          <button className='request-button' id='0' style={{backgroundColor:'#000000'}} onClick={(e) => handleClick(e)}>
            <img src={reject} id='0' alt=''></img>
          </button>
        </div>
        <div>
          <button className='request-button' id='1' style={{backgroundColor:'#0075ff'}} onClick={(e) => handleClick(e)}>
            <img src={tick} id='1' alt=''></img>
          </button>
        </div>
      </div>
    );
  } else if (outcome === 0) {
    return (<div></div>);
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