import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLobbyCreation } from './data/storage';

import Home from './pages/Home'
import Login from './pages/Lobby'

function App() {

    const { currentLobby, updateLobby } = useLobbyCreation()

    return (
        <Router>
            <Routes>
                <Route path='/'> 
                    <Route index element={<Home/>} />
                    <Route path={`lobby/${currentLobby}`} element={<Login/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
