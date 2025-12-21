"use client"
import { createContext, useState, useEffect } from 'react';
import { validateSession } from '@/app/lib/session';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to refresh authentication status
    const refreshAuth = async () => {
        console.log("Refreshing auth status...");
        const valid = await validateSession();
        console.log("Session valid:", valid);
        setIsAuthenticated(valid);
    };

    useEffect(() => {
        // Call validateSession on mount and set isAuthenticated
        refreshAuth();
    }, []);
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}


