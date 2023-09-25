import { useRole } from '../../data/storage'
import { useEffect, useState } from 'react'
import PinCode from '../../components/PinCode'
import Request from '../../components/Request'
import home from '../../images/home.svg'
import { db } from '../../data/firebase'
import { doc, updateDoc, onSnapshot, getDoc, collection, query, where } from 'firebase/firestore'
import { useLobbyFinder } from '../../data/storage'

import '../Home/Home.css'
import './Lobby.css'

function Lobby() {
  
  const { isOwner, updateRole } = useRole()
  const { currentLobby, updateLobby } = useLobbyFinder()
  const [ pending, setPending ] = useState<string[]>([])
  
  function playMySong(url: string) {
    var audio = document.createElement('audio')
    audio.style.display = "none"
    audio.src = url
    audio.autoplay = true
    document.body.appendChild(audio)
    audio.play()
  }
  const audio = require('./backgroundmusic.wav')
  playMySong(audio)
  

  async function rejectPlayer (index : number) {
    const response = await getDoc(doc(db, 'sessions', currentLobby))
    let currentArray : string[] = response.data()?.gamePending
    currentArray.splice(index, 1)
    console.log(currentArray)

    await updateDoc(doc(db, 'sessions', currentLobby), {
        gamePending: currentArray
    })
  }

  async function acceptPlayer (index : number) {
    const response = await getDoc(doc(db, 'sessions', currentLobby))
    let currentPlayers : string[] = response.data()?.gamePlayers
    let currentPending : string[] = response.data()?.gamePending
    
    currentPlayers.push(currentPending.splice(index, 1)[0])

    await updateDoc(doc(db, 'sessions', currentLobby), {
        gamePlayers: currentPlayers,
        gamePending: currentPending
    })
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'sessions', currentLobby), (doc) => {
        let playersToDisplay = [...doc.data()?.gamePlayers, ...doc.data()?.gamePending]
        let counter = 0;
        playersToDisplay = playersToDisplay.map(
            function (val: string, index : number) {
                if (index < doc.data()?.gamePlayers.length) {
                    return (
                        <Request
                            key={index}
                            index={index}
                            colour={'#FFFFFF'}
                            nickname={val}
                            type={0} // 0 = joined player
                            rejectPlayer={rejectPlayer}
                            acceptPlayer={acceptPlayer}
                        />
                    )
                } else {
                    return (
                        <Request
                            key={index}
                            index={counter++}
                            colour={'#FFFFFF'}
                            nickname={val}
                            type={1} // 1 = pending player
                            rejectPlayer={rejectPlayer}
                            acceptPlayer={acceptPlayer}
                        />
                    )

                }
                
            }
        )
        setPending(playersToDisplay)
    })
    return () => { unsub() }
}, [])

  return (
    <div className='lobby home'>
            <div className='lobby-header home-header'></div>

            <div className='lobby-code home-options'>
                <PinCode />
            </div>

            <div className='lobby-body'>
              <div className='lobby-container'>
              {pending}
              </div>
              {isOwner ? 
                <div className='lobby-footer'>
                    <button className='button'>Avvia</button>
                    <button className='button' style={{ backgroundColor: 'black', width: '20%' }}>
                      <img src={home} alt=''></img> 
                    </button>
                </div>
              :
                <div className='lobby-footer'>
                  <button className='button' style={{ backgroundColor: 'black'}}>
                    <img src={home} alt=''></img> 
                  </button>
                </div>
              }
            </div>
    </div>
  )
}

export default Lobby
