import { Card } from '@/shared/components/ui/card'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-8">
      <div className="p-4 md:p-8">
        <SidebarTrigger />
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium">Total Clientes</h3>
            <div className="mt-2 text-2xl font-bold">120</div>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium">Socios Activos</h3>
            <div className="mt-2 text-2xl font-bold">85</div>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium">Ingresos Mensuales</h3>
            <div className="mt-2 text-2xl font-bold">€4,500</div>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium">Nuevos este mes</h3>
            <div className="mt-2 text-2xl font-bold">12</div>
          </Card>
        </div>
      </div>
    </div>
  )
}