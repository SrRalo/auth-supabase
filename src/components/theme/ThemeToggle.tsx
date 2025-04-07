import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

// Componente para el botón de cambio de tema
export function ThemeToggle() {
  // Estado para controlar el tema actual
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Efecto para inicializar el tema basado en las preferencias del usuario o localStorage
  useEffect(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // Si hay un tema guardado, usarlo
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } 
    // Si no hay tema guardado, detectar preferencia del sistema
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);
  
  // Función para cambiar el tema
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Aplicar el tema al documento
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        onClick={toggleTheme} 
        size="icon" 
        variant="outline" 
        className="h-10 w-10 rounded-full bg-background shadow-lg hover:shadow-xl transition-shadow"
        aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      >
        {/* Ícono de sol para tema oscuro (mostrar cuando el tema actual es oscuro) */}
        {theme === 'dark' && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
        
        {/* Ícono de luna para tema claro (mostrar cuando el tema actual es claro) */}
        {theme === 'light' && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path 
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" 
            />
          </svg>
        )}
      </Button>
    </div>
  );
}

// Componente envoltorio para integrar el botón en tu aplicación
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ThemeToggle />
    </>
  );
}

export default ThemeToggle;