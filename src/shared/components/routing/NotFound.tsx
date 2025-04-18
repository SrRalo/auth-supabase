import { Button } from "@/shared/components/ui/button"
import { Link } from "react-router-dom"
import { ROUTES } from "@/config/routes"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-xl">Página no encontrada</h2>
        <p className="text-muted-foreground">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <Button asChild>
          <Link to={ROUTES.DASHBOARD.HOME}>Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}