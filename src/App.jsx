import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/Auth/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Login from './components/Auth/Register'
import Register from './components/Auth/Login'
import Dashboard from './components/Pages/Dashboard'
import NotFound from './components/Pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/register" element={<Login/>} />
          <Route path="/" element={<Register />} />
          
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

          </Route>
          
          {/* Redirección a dashboard si está autenticado o login si no lo está */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App