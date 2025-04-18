export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  DASHBOARD: {
    HOME: '/dashboard',
    CALENDAR: '/calendar',
    CLIENTS: '/clients',
    SETTINGS: '/settings',
  }
} as const

// Tipo para las rutas
export type AppRoutes = typeof ROUTES