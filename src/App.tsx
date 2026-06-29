import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import GameScreen from './pages/GameScreen'
import Dictionary from './pages/Dictionary'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import { ProtectedRoute, PublicRoute } from '@/components/common/ProtectedRoute'

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* "/" → Home (protected) */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>

          {/* "/home" → Home (protected) */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>

          {/* "/login" → Login (public only — redirect if already signed in) */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }/>

          {/* "/game" → GameScreen (protected) */}
          <Route path="/game" element={
            <ProtectedRoute>
              <GameScreen />
            </ProtectedRoute>
          }/>

          {/* "/dictionary" → Dictionary (protected) */}
          <Route path="/dictionary" element={
            <ProtectedRoute>
              <Dictionary />
            </ProtectedRoute>
          }/>

          {/* Catch-all → redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Toaster position="top-center" visibleToasts={1} />
    </>
  )
}

export default App
