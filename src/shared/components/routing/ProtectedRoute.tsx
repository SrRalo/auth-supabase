import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { ROUTES } from '@/config/routes'

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to={ROUTES.AUTH.LOGIN} />
  }

  return <Outlet />
}