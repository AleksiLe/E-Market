'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import validateToken from '@/services/validateToken';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [isTokenValid, setIsTokenValid] = useState(false);

    const checkToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const isValid = await validateToken(token);
            setIsTokenValid(isValid);
        } else {
            setIsTokenValid(false);
        }
    };

    useEffect(() => {
        checkToken();

        // Listen for changes in localStorage
        const handleStorageChange = () => {
            checkToken();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <TokenContext.Provider value={{ isTokenValid, checkToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);