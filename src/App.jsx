import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/Auth/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Login from './components/Auth/Register'
import Register from './components/Auth/Login'
import Dashboard from './components/Pages/Dashboard'
import { CalendarPage } from './components/Pages/Calendar'
import NotFound from './components/Pages/NotFound'
import { ThemeProvider } from './components/theme/ThemeToggle'
import { DashboardLayout } from './components/layouts/DashboardLayout'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/register" element={<Login/>} />
            <Route path="/" element={<Register />} />
            
            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Route>
            </Route>
            
            {/* Redirección a dashboard si está autenticado o login si no lo está */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App