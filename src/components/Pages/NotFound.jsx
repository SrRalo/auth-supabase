import React from 'react'
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

        <button onClick={() => window.history.back()} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go Back
        </button>

        </div>
    )
}