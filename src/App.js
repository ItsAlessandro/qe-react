import { theme } from './theme'
import { ThemeProvider } from '@mui/material'

import Home from './pages/Home'
import Lobby from './pages/Lobby'
import './style.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
            <Home />
        </div>
    </ThemeProvider>
  );
}

export default App;
