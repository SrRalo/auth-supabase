import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './Auth/AuthContext'

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  
  // Muestra un indicador de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  // Redirecciona a la página de login si no hay usuario
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  // Si el usuario está autenticado, renderiza el contenido protegido
  return <Outlet />
}