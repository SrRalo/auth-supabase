import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function CalendarPage() {
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
            <CardTitle>Vista del Calendario</CardTitle>
            <div className="flex flex-wrap gap-2 ml-auto">
              <Button size="sm" variant="outline">
                Anterior
              </Button>
              <Button size="sm" variant="outline">
                Siguiente
              </Button>
              <Button size="sm">
                Nueva Cita
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pl-2 overflow-x-auto">
            <div className="min-h-[400px] w-full">
              <div className="w-full grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden min-w-[768px]">
                {/* Encabezados de los días */}
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                  <div key={day} className="bg-card p-2 text-center font-medium">
                    {day}
                  </div>
                ))}
                
                {/* Ejemplo de días del mes - Esto se reemplazará con la lógica real del calendario */}
                {Array.from({ length: 35 }).map((_, i) => (
                  <div 
                    key={i}
                    className="bg-card p-2 min-h-[100px] hover:bg-accent transition-colors"
                  >
                    <span className="text-sm">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CalendarPage;