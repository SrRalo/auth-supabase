# Sharkmin - Gestión de Clientes y Autenticación con Supabase

Sharkmin es una aplicación web basada en React y construida con Vite, diseñada para proporcionar autenticación segura utilizando Supabase y funcionalidades eficientes para la gestión de clientes. Este proyecto utiliza herramientas y bibliotecas modernas para ofrecer una experiencia robusta y fácil de usar.

## Características

- **Autenticación**: Autenticación de usuarios segura impulsada por Supabase.
- **Gestión de Clientes**: Agregar, editar, eliminar y visualizar información de clientes con una interfaz intuitiva.
- **Diseño Responsivo**: Optimizado para dispositivos de escritorio y móviles.
- **Temas**: Soporte para modo claro y oscuro con un interruptor de tema.
- **Componentes Reutilizables**: Componentes de interfaz modular y reutilizables construidos con Tailwind CSS.
- **Tablas Redimensionables**: Interfaz de tabla con columnas ajustables para mejor visualización de datos.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
src/
  App.jsx                # Punto de entrada principal de la aplicación
  main.jsx              # Configuración inicial de React
  config/               # Configuraciones globales
    constants.ts        # Constantes de la aplicación
    routes.ts          # Configuración de rutas
    supabase.ts        # Configuración de Supabase
  features/            # Características principales organizadas por dominio
    auth/              # Funcionalidad de autenticación
    calendar/          # Módulo de calendario
    clients/           # Gestión de clientes
    dashboard/         # Dashboard principal
  lib/                 # Utilidades y servicios compartidos
    utils.ts          # Funciones utilitarias
    api/              # Servicios de API
  shared/             # Componentes y utilidades compartidas
    components/       # Componentes reutilizables
      ui/            # Componentes base de UI
      layouts/       # Layouts de la aplicación
      dialogs/       # Componentes de diálogo
      theme/         # Gestión de temas
    utils/           # Utilidades compartidas
  styles/             # Estilos globales y assets
  types/              # Definiciones de tipos TypeScript
```

## Comenzando

### Requisitos Previos

- Node.js (>= 16.x)
- npm o yarn
- Una cuenta y proyecto en Supabase

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/sharkmin.git
   cd sharkmin/auth-supabase
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en el directorio raíz y agrega tus credenciales de Supabase:
   ```env
   VITE_SUPABASE_URL=tu-url-de-supabase
   VITE_SUPABASE_ANON_KEY=tu-clave-anonima-de-supabase
   ```

### Ejecutando la Aplicación

Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Construcción para Producción

Para construir la aplicación para producción:
```bash
npm run build
# o
yarn build
```

Los archivos listos para producción estarán en el directorio `dist/`.

## Contribuyendo

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección de errores.
3. Realiza tus cambios y sube la rama.
4. Abre un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Agradecimientos

- [Supabase](https://supabase.com) por el backend de autenticación.
- [Vite](https://vitejs.dev) por el entorno de desarrollo rápido.
- [Tailwind CSS](https://tailwindcss.com) por el framework CSS basado en utilidades.
