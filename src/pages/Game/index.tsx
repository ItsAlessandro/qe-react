import { useState } from 'react'

import AnimalAuction from '../../components/AnimalAuction'

import './Game.css'
import Crown from '../../images/Crown.png'
import ForestPoints from '../../images/PointBackgrounds/ForestPoints.png'

function Game() {
    let players = [2, 3, 5, 7, 11]

    function togglePoints(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let points = document.getElementById("points-view")

        if (points) {
            if (points.style.display === "none") 
                points.style.display = "block"
            else 
                points.style.display = "none"
        }
        let playerId = (event.target as HTMLInputElement).id
    }

    return (
        <div className='game-container'>
            <div className='animal'>
                <AnimalAuction />
            </div>

            <input className='input input-game' type='number'/>

            <button className='button button-game'>
                Conferma
            </button>

            <div className='players'>
                <div className='players-container'>
                    {players.map((point, index) => (
                        <div className='player-info'>
                            <div>
                                <img className='player-status' src={Crown} />
                            </div>
                            <div 
                                id={index.toString()} 
                                className='player-points' 
                                onClick={(e) => togglePoints(e)}
                            >
                                {point}
                            </div>
                        </div>
                    ))}
                </div>

                <div id='points-view' className='points-view'>
                    <h2>Points</h2>
                </div>
            </div>
        </div >
    );
}

export default Game;