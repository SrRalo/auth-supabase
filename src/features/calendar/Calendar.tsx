import { Card, CardHeader } from '@/shared/components/ui'

export default function Calendar() {
  return (
    <div className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            Hoy
          </button>
          <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            Mes
          </button>
          <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            Semana
          </button>
          <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            Día
          </button>
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