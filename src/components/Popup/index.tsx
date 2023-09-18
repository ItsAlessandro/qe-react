import './Popup.css';
import sadbear from '../../images/sadbear.svg';
import sadlion from '../../images/sadlion.svg';

interface PopupProps {
  imageIndex: number
  text: string
  buttons: {text: string, colour: string}[]
}

const images = [
  {
    src: "",
    alt: "",
  },
  {
    src: sadbear,
    alt: "",
  },
  {
    src: sadlion,
    alt: "",
  },
];

const Popup: React.FC<PopupProps> = ({imageIndex, text, buttons}) => {
  
  const indexToImage = (imageIndex: number) => {
    if (imageIndex < 0 || imageIndex >= images.length) {
      return null;
    }
    
    return images[imageIndex];
  };
  
  const image = indexToImage(imageIndex)
  return (
    <div className='popup-background'>
      <div className='popup'>
        <div className='popup-img-container'>
          <img className='popup-img' src={image?.src}></img>
        </div>
        <div className='label'>
          <p>
          {text}
          </p>
        </div>
        <div className='popup-buttons-container'>
          {buttons.map((button) => (
            <button
              key={button.text}
              style={{ backgroundColor: button.colour }}
              className='button'
            >
            {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Popup;