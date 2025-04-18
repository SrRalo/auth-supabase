// Configuración del tema
export const THEME_CONSTANTS = {
  STORAGE_KEY: 'sharkmin-theme'
} as const

// Configuración de la barra lateral
export const SIDEBAR_CONFIG = {
  COOKIE_MAX_AGE: 60 * 60 * 24 * 7, // 7 days
  WIDTH: '16rem',
  WIDTH_MOBILE: '18rem',
  WIDTH_ICON: '3rem'
} as const

// Tipos de membresía
export const MEMBERSHIP_TYPES = [
  'Invitado',
  'Socio',
  'Casual'
] as const

// Tipos de suscripción
export const SUBSCRIPTION_TYPES = [
  'Mensual',
  'Anual'
] as const

// Claves de almacenamiento
export const STORAGE_KEYS = {
  SIDEBAR_STATE: 'sidebar_state'
} as const