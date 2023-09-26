import tick from '../../images/tick.svg'
import reject from '../../images/reject.svg'
import './Request.css';

interface RequestProps {
  index: number
  colour: string
  nickname: string
  type: number
  rejectPlayer: (selIndex: number) => void
  acceptPlayer: (selIndex: number) => void
}

const Request: React.FC<RequestProps> = ({ index, colour, nickname, type, rejectPlayer, acceptPlayer }) => {

  return (
    <div className='request'>
        {
            type === 1
            ? 
            <>
                <div className="request-label">
                    <p className='request-nickname'>{nickname}</p>
                </div>
                <div>
                    <button 
                        className="request-button"
                        style={{backgroundColor:'#000000'}}
                        onClick={() => rejectPlayer(index)}
                    >
                        <img src={reject}></img>
                    </button>
                </div>
                <div className="request-button">
                    <button 
                        className="request-button"
                        style={{backgroundColor:'#0075ff'}}
                        onClick={() => acceptPlayer(index)}
                    >
                        <img src={tick}></img>
                    </button>
                </div>
            </>
            :
            <>
                <div className='request-circle' style={{backgroundColor: colour}}></div>
                <div className='request-accepted-label'>
                    <p className='request-nickname'>{nickname}</p>
                </div>
            </>
        }
    </div>
)
};

export default Request;
