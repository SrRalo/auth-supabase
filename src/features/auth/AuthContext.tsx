import { createContext, useContext, useState, useEffect } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import supabase from '@/config/supabase'

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<any>;
    signUp: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Verificar sesión actual al cargar
        const checkSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()
                
                if (error) throw error
                
                setUser(session?.user || null)
            } catch (error) {
                const authError = error as AuthError
                setError(authError.message)
            } finally {
                setLoading(false)
            }
        }
        
        checkSession()
        
        // Configurar listener para cambios en la autenticación
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user || null)
                setLoading(false)
            }
        )
        
        return () => {
            if (authListener && authListener.subscription) {
                authListener.subscription.unsubscribe()
            }
        }
    }, [])
    
    const signIn = async (email: string, password: string) => {
        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            
            if (error) throw error
            return data
        } catch (error) {
            const authError = error as AuthError
            setError(authError.message)
            throw error
        } finally {
            setLoading(false)
        }
    }
    
    const signUp = async (email: string, password: string) => {
        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            })
            
            if (error) throw error
            return data
        } catch (error) {
            const authError = error as AuthError
            setError(authError.message)
            throw error
        } finally {
            setLoading(false)
        }
    }
    
    const signOut = async () => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        } catch (error) {
            const authError = error as AuthError
            setError(authError.message)
        } finally {
            setLoading(false)
        }
    }
    
    const value: AuthContextType = {
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut
    }
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}