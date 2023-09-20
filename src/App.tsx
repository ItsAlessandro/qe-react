import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useLobbyFinder } from './data/storage'

import Home from './pages/Home'
import Lobby from './pages/Lobby'

function App() {

    const { currentLobby, updateLobby } = useLobbyFinder()

    return (
        <Router>
            <Routes>
                <Route path='/'> 
                    <Route index element={<Home/>} />
                    <Route path={`lobby/${currentLobby}`} element={<Lobby/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
