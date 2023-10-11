import { useEffect, useState } from 'react'
import { db } from '../../data/firebase'
import { getDoc, doc } from 'firebase/firestore'

import AnimalAuction from '../../components/AnimalAuction'

import './Game.css'

import Crown from '../../images/Crown.png'
import NoStatus from '../../images/NoStatus.png'

import Triangle from '../../images/Triangle.png'

import Zero from '../../images/Points/Zero.png'
import Forest from '../../images/Points/Forest.png'
import Savana from '../../images/Points/Savana.png'
import Jungle from '../../images/Points/Jungle.png'
import Water from '../../images/Points/Water.png'
import Tundra from '../../images/Points/Tundra.png'
import Biomes from '../../images/Points/Biomes.png'
import China from '../../images/Points/China.png'
import Europe from '../../images/Points/Europe.png'
import Japan from '../../images/Points/Japan.png'
import USA from '../../images/Points/USA.png'
import UK from '../../images/Points/UK.png'

import NoPoints from '../../images/Points/NoPoints.png'

import Zero1 from '../../images/Points/Zero1.png'
import Zero2 from '../../images/Points/Zero2.png'
import Zero3 from '../../images/Points/Zero3.png'
import Zero4 from '../../images/Points/Zero4.png'
import Zero5 from '../../images/Points/Zero5.png'

import Biome1 from '../../images/Points/Biome1.png'
import Biome2 from '../../images/Points/Biome2.png'
import Biome3 from '../../images/Points/Biome3.png'
import Biome4 from '../../images/Points/Biome4.png'
import Biome5 from '../../images/Points/Biome5.png'

import Biomes1 from '../../images/Points/Biomes1.png'
import Biomes2 from '../../images/Points/Biomes2.png'
import Biomes3 from '../../images/Points/Biomes3.png'
import Biomes4 from '../../images/Points/Biomes4.png'
import Biomes5 from '../../images/Points/Biomes5.png'

import Nation1 from '../../images/Points/Nation1.png'
import Nation2 from '../../images/Points/Nation2.png'
import Nation3 from '../../images/Points/Nation3.png'
import Nation4 from '../../images/Points/Nation4.png'

let pointsVisible = false

function Game() {
    const pointTypes = ["zero", "forest", "savana", "jungle", "water", "tundra", "biomes", "nation"]
    const pointBackgrounds: { [key: string]: string } = {
        "zero": Zero,
        "forest": Forest,
        "savana": Savana,
        "jungle": Jungle,
        "water": Water,
        "tundra": Tundra,
        "biomes": Biomes
    }
    const nationPointBackgrounds: { [key: string]: string } = {
        "china": China,
        "europe": Europe,
        "japan": Japan,
        "usa": USA,
        "uk": UK
    }
    const biomePointAmounts: { [key: number]: string } = {
        0: NoPoints,
        1: Biome1,
        2: Biome2,
        3: Biome3,
        4: Biome4,
        5: Biome5
    }
    const pointAmounts: { [key: string]: { [key: number]: string } } =
    {
        "zero": { 0: NoPoints, 1: Zero1, 2: Zero2, 3: Zero3, 4: Zero4, 5: Zero5 },
        "forest": biomePointAmounts,
        "savana": biomePointAmounts,
        "jungle": biomePointAmounts,
        "water": biomePointAmounts,
        "tundra": biomePointAmounts,
        "biomes": { 0: NoPoints, 1: Biomes1, 2: Biomes2, 3: Biomes3, 4: Biomes4, 5: Biomes5 },
        "nation": { 0: NoPoints, 1: Nation1, 2: Nation2, 3: Nation3, 4: Nation4 }
    }

    // To fetch from the DB
    const playerId = 1
    const playerNames = ["Bob", "Rob", "Cob"]
    const playerNations = ["china", "usa", "japan"]
    const auctioneer = 0
    // End

    let spent = 1000
    let playerPoints: { [key: number]: { [key: string]: number } } = {
        0: { "zero": 3, "forest": 3, "savana": 3, "jungle": 3, "water": 3, "tundra": 3, "biomes": 3, "nation": 3 },
        1: { "zero": 3, "forest": 3, "savana": 3, "jungle": 3, "water": 3, "tundra": 3, "biomes": 3, "nation": 3 },
        2: { "zero": 3, "forest": 3, "savana": 3, "jungle": 3, "water": 3, "tundra": 3, "biomes": 3, "nation": 3 }
    }

    let currentBid = ""

    const [selectedId, setSelectedId] = useState(0)

    //const { currentLobby, updateLobby } = useLobbyFinder()
    //
    //const [players, setPlayers] = useState<string[]>()
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const docSnap = await getDoc(doc(db, 'sessions', currentLobby))
    //         setPlayers(docSnap.data()?.gamePlayers)
    //     }
    //     fetchData()
    // }, [])

    let players = [3, 2, 4]

    function togglePoints(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let playerId = parseInt((event.target as HTMLInputElement).id)

        let triangle = document.getElementById(`triangle-${playerId}`)
        let points = document.getElementById("points-view")

        if (pointsVisible) {
            if (playerId == selectedId) {
                if (points && triangle) {
                    points.style.display = "none"
                    triangle.style.display = "none"
                }

                pointsVisible = false
            }
            else {

                let previousTriangle = document.getElementById(`triangle-${selectedId}`)
                if (previousTriangle)
                    previousTriangle.style.display = "none"
                if (triangle)
                    triangle.style.display = "block"
            }
        }
        else {
            if (points && triangle) {
                points.style.display = "block"
                triangle.style.display = "block"
            }

            pointsVisible = true
        }

        setSelectedId(playerId)
    }

    function inputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (currentBid)
            event.target.value = parseInt(currentBid).toLocaleString("it-IT")
        else
            event.target.value = ""
    }

    function inputOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key == "Backspace") {
            currentBid = currentBid.slice(0, -1)
        }
        else if (/^[0-9]$/i.test(event.key)) {
            currentBid += event.key
        }
    }

    return (
        <div className='game-container'>
            <div className='animal'>
                <AnimalAuction />
            </div>

            {
                playerId == auctioneer ?
                    <div>
                        <input className='input auctioneer-bid' type='text' readOnly={true} />
                        <input className='input input-game-auctioneer' type='text' onChange={inputOnChange} onKeyDown={inputOnKeyDown} />
                    </div >
                    :
                    <div>
                        <input className='input input-game' type='text' onChange={inputOnChange} onKeyDown={inputOnKeyDown} />
                    </div>
            }

            <button className='button button-game'>Conferma</button>

            <div className='players'>
                <div className='players-container'>
                    {players?.map((point, index) => (
                        <div className='player-info' key={index}>
                            {
                                index == auctioneer ? <img className='player-status' src={Crown} /> : <img className='player-status' src={NoStatus} />
                            }
                            <div
                                id={index.toString()}
                                className='player-points'
                                onClick={(e) => togglePoints(e)}
                            >
                                12
                                <img id={`triangle-${index}`} src={Triangle} className='triangle' />
                            </div>
                        </div>
                    ))}
                </div>

                <div id='points-view' className='points-view'>
                    <div className='points-header'>
                        <div className='points-label'>
                            {playerNames[selectedId]}
                        </div>
                        <div className='money-label'>
                            {selectedId == playerId ? spent : ""}
                        </div>
                    </div>
                    {pointTypes.map((type) => (
                        <div className='point-container'>
                            <div className='point-image-container'>
                                <div className='point-image'>
                                    <img src={type == "nation" ? nationPointBackgrounds[playerNations[selectedId]] : pointBackgrounds[type]} />
                                    <img className='point-amount-image' src={pointAmounts[type][playerPoints[selectedId][type]]} />
                                </div>
                            </div>
                            <div className='point-label'>
                                <div className='point-amount-number'>
                                    {playerPoints[selectedId][type]}
                                </div>
                                <div className='smaller-font'>
                                    &nbsp;pts
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default Game;