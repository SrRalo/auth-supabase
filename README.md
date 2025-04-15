# Sharkmin - Gestión de Clientes y Autenticación con Supabase

Sharkmin es una aplicación web basada en React y construida con Vite, diseñada para proporcionar autenticación segura utilizando Supabase y funcionalidades eficientes para la gestión de clientes. Este proyecto utiliza herramientas y bibliotecas modernas para ofrecer una experiencia robusta y fácil de usar.

## Características

- **Autenticación**: Autenticación de usuarios segura impulsada por Supabase.
- **Gestión de Clientes**: Agregar, editar, eliminar y visualizar información de clientes con una interfaz intuitiva.
- **Diseño Responsivo**: Optimizado para dispositivos de escritorio y móviles.
- **Temas**: Soporte para modo claro y oscuro con un interruptor de tema.
- **Componentes Reutilizables**: Componentes de interfaz modular y reutilizables construidos con Tailwind CSS.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
src/
  App.jsx          # Punto de entrada principal de la aplicación
  components/      # Componentes reutilizables de React
    Auth/          # Componentes relacionados con la autenticación (Login, Register, etc.)
    clients/       # Componentes para la gestión de clientes (Tabla, Formulario, Diálogos, etc.)
    layouts/       # Componentes de diseño (por ejemplo, DashboardLayout)
    Pages/         # Páginas de la aplicación (Dashboard, Calendar, etc.)
    ui/            # Componentes de interfaz de usuario (Botón, Tarjeta, Tooltip, etc.)
  hooks/           # Hooks personalizados de React
  lib/             # Funciones utilitarias e integraciones con APIs
  styles/          # Estilos globales (por ejemplo, Tailwind CSS)
  Supabase/        # Configuración del cliente de Supabase
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
