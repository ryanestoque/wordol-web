import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import GameScreen from './pages/GameScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/game" element={<GameScreen />}>
        
      </Route>
    </Routes>
  )
}

export default App
