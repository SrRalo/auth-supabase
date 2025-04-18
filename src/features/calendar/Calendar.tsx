import { Card, CardHeader, Button, SidebarTrigger } from '@/shared/components/ui'

export default function Calendar() {
  return (
    <div className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-auto">
      <SidebarTrigger />
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            Hoy
          </Button>
          <Button variant="outline" size="sm">
            Mes
          </Button>
          <Button variant="outline" size="sm">
            Semana
          </Button>
          <Button variant="outline" size="sm">
            Día
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4">
        <Card className="col-span-12 w-full">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="space-y-1 flex-1">
              <h3 className="text-2xl font-semibold">Calendario de Actividades</h3>
              <p className="text-sm text-muted-foreground">
                Gestiona tus eventos y actividades
              </p>
            </div>
          </CardHeader>
          {/* Aquí irá el componente de calendario cuando se implemente */}
          <div className="h-[600px] flex items-center justify-center text-muted-foreground">
            Calendario en desarrollo
          </div>
        </Card>
      </div>
    </div>
  )
}