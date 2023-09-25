import './Leaderboard.css'

function Leaderboard () {
  const playersData = [
    { color: 'red', nickname: 'marco', points: 3 },
    { color: 'blue', nickname: 'luca', points: 7 },
    { color: 'white', nickname: 'gianmarco', points: 3 },
    { color: 'green', nickname: 'sara', points: 6 },
    { color: 'yellow', nickname: 'barbara', points: 11 },
  ];

  // Sort players by points in descending order
  playersData.sort((a, b) => b.points - a.points);
  return (
    <div className='leaderboard'>
      <div className="leaderboard-header"></div>
      <div className='leaderboard-body'>
          <div className='leaderboard-spacer'>
            <p className='leaderboard-label'>Leaderboard</p>
          </div>

          <div className='leaderboard-leaderboard'>
            {playersData.map((player, index) => (
            <div className='standing' key={index}>
              <div className='leaderboard-circle' style={{backgroundColor: player.color}}> 
                <p className='leaderboard-standing'>{index + 1}</p>
              </div>
              <div className='leaderboard-playername-label'>
                <p className='leaderboard-playername'>{player.nickname}</p>
              </div>
              <div className='leaderboard-points-container'>
                <p className='leaderboard-standing-points'>{`${player.points} pts`}</p>
              </div>
            </div>
            ))}
          </div>
        <button className='button'>Home</button>
        </div>
    </div>
  )
}

export default Leaderboard
