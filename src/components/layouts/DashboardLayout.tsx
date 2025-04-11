import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Outlet } from "react-router-dom"

const queryClient = new QueryClient()

export function DashboardLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-auto w-full">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  )
}

export default DashboardLayout