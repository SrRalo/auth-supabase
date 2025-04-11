import { SidebarTrigger } from "@/components/ui/sidebar"
import { ClientTable } from "../clients/ClientTable"

function Dashboard() {
  return (
    <div className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-auto">
      <SidebarTrigger />
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <ClientTable />
    </div>
  )
}

export default Dashboard