import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

// Use relative imports for lazy-loaded components
const Login = lazy(() => import('./features/auth/Login'))
const Register = lazy(() => import('./features/auth/Register'))
const Dashboard = lazy(() => import('./features/dashboard/Dashboard'))
const Calendar = lazy(() => import('./features/calendar/Calendar'))
const ClientTable = lazy(() => import('./features/clients/components/ClientTable'))

// Import non-lazy-loaded components normally
import { AuthProvider } from './features/auth/AuthContext'
import { ProtectedRoute } from './shared/components/routing/ProtectedRoute'
import { DashboardLayout } from './shared/components/layouts/DashboardLayout'
import { ThemeProvider } from './shared/components/theme/ThemeProvider'
import NotFound from './shared/components/routing/NotFound'

function ErrorFallback({ error }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto px-4 space-y-4 text-center">
        <h1 className="text-4xl font-bold text-red-500">¡Ups!</h1>
        <p className="text-lg">Algo salió mal</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={
              <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-7xl mx-auto px-4 text-center">Cargando...</div>
              </div>
            }>
              <div className="w-full max-w-7xl mx-auto px-4">
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/clients" element={<ClientTable />} />
                    </Route>
                  </Route>
                  
                  {/* Root route redirect */}
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App