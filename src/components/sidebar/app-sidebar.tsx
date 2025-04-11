import { Calendar, LayoutDashboard, LogOut, Search, Settings } from "lucide-react"
import {useAuth} from '@/components/Auth/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useLocation } from "react-router-dom"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  
  // Menu items.
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
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
                    <AvatarImage src=" " />
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