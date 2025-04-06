import { useAuth } from '../Auth/AuthContext'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

function Dashboard() {
  const { user, signOut } = useAuth()
  
  const handleSignOut = async () => {
    await signOut()
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Mi Aplicación</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-600">
                {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Bienvenido a tu panel de control. Esta página solo es accesible
            si has iniciado sesión correctamente.
          </p>
          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Tarjetas de ejemplo */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900">Estadísticas</h2>
              <p className="mt-2 text-gray-600">Visualiza tus estadísticas del mes</p>
              <Link
                to="/stats"
                className="inline-block px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Ver Estadísticas
              </Link>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900">Perfil</h2>
              <p className="mt-2 text-gray-600">Administra tu información personal</p>
              <Link
                to="/profile"
                className="inline-block px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Editar Perfil
              </Link>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900">Configuración</h2>
              <p className="mt-2 text-gray-600">Personaliza las opciones de tu cuenta</p>
              <Link
                to="/settings"
                className="inline-block px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Ir a Configuración
              </Link>
            </div>
          </div>
        </div>



      </main>

      <p>Hola mundo</p>
      <Button >Click Me</Button>
    </div>
  )
}

export default Dashboard