import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext'
import { useEffect } from 'react'

export default function NotFound() {
    const { user } = useAuth()
    
    useEffect(() => {
        document.title = '404 - Not Found'
    }, [])
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-lg">Page Not Found</p>
        <Link to={user ? '/dashboard' : '/login'} className="mt-6 text-blue-500 hover:underline">
            Go Back
        </Link>
        </div>
    )
}