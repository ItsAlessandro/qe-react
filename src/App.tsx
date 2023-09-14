import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Lobby'

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/'> 
                <Route index element={<Home/>} />
                <Route path='lobby' element={<Login/>} />
            </Route>
        </Routes>
    </Router>
  );
}

export default App;
