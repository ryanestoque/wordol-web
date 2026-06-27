import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import GameScreen from './pages/GameScreen'
import { Toaster } from './components/ui/sonner'
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/game" element={<GameScreen />}>
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
