import { useState } from 'react'
import './Popup.css';
import sadbear from '../../images/sadbear.svg';
import sadlion from '../../images/sadlion.svg';

interface Props {
  imageIndex: number
  text: string
  display: boolean
  setDisplay: (display: boolean) => void
  isLoading: boolean
  setLoading: (refused: boolean) => void
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

const Popup: React.FC<Props> = ({imageIndex, text, display, setDisplay, isLoading, setLoading}) => {
  
  const popupSettings = {
    display: display ? "flex" : "none"
  }

  const indexToImage = (imageIndex: number) => {
    if (imageIndex < 0 || imageIndex >= images.length) {
      return null;
    }
    
    return images[imageIndex];
  };


  function handleClick() {
    if (isLoading) setLoading(false)
    setDisplay(false)
  }
  
  const image = indexToImage(imageIndex)
  return (
    <div className='popup-background' style={popupSettings}>
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
          <button 
          className='button'
          style={{backgroundColor:"black"}}
          onClick={() => handleClick()}
          >
            Indietro
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popup
