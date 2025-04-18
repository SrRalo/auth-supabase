import { Calendar, LayoutDashboard, LogOut, Search, Settings, Users } from "lucide-react"
import { useAuth } from '@/features/auth/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Link, useLocation } from "react-router-dom"
import { ROUTES } from "@/config/routes"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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

  const handleSignOut = async () => {
    await signOut()
  }
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-4 mb-4 flex items-center">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {user?.email ? user.email[0].toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="mr-4 ml-4 text-sm text-gray-600 dark:text-white">
              {user?.email}
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
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
                <SidebarMenuButton onClick={handleSignOut}>
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