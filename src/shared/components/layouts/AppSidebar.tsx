import { Calendar, LayoutDashboard, LogOut, Menu, Search, Settings, User, Users } from "lucide-react"
import { useAuth } from '@/features/auth/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Link, useLocation } from "react-router-dom"
import { ROUTES } from "@/config/routes"
import { Button } from "@/shared/components/ui/button"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar"

// Menu items configuration
const items = [
  {
    title: "Dashboard",
    url: ROUTES.DASHBOARD.HOME,
    icon: LayoutDashboard,
  },
  {
    title: "Clientes",
    url: ROUTES.DASHBOARD.CLIENTS,
    icon: Users,
  },
  {
    title: "Calendar",
    url: ROUTES.DASHBOARD.CALENDAR,
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: ROUTES.DASHBOARD.SETTINGS,
    icon: Settings,
  },
]

export function AppSidebar() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const { toggleSidebar } = useSidebar()

  const handleSignOut = async () => {
    await signOut()
  }
  
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="absolute right-4 top-4 group-data-[state=collapsed]:left-1/2 group-data-[state=collapsed]:-translate-x-1/2 group-data-[state=collapsed]:top-2"
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>

          <SidebarGroupLabel className="mt-6 mb-6 flex items-center px-4 group-data-[state=collapsed]:justify-center">
            <Avatar className="size-10">
              <AvatarImage src="" />
              <AvatarFallback className="text-lg">
                {user?.email ? user.email[0].toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="mr-4 ml-4 group-data-[state=collapsed]:hidden">
              <span className="text-base text-gray-600 dark:text-white truncate block">
                {user?.email}
              </span>
              <User className="size-4 text-gray-400 group-data-[state=expanded]:hidden" />
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut} tooltip="Cerrar sesión">
                  <LogOut />
                  <span>Cerrar sesión</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}