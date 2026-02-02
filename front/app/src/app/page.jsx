'use client'
import Link from 'next/link'
import { useState } from 'react'
import Login from '../components/authentication/login'
import Register from '../components/authentication/register'
export default function Home() {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showRegisterPopup, setShowRegisterPopup] = useState(false);

    const handleLoginClick = () => {
        setShowLoginPopup(true);
    };

    const handleCloseLoginPopup = () => {
        setShowLoginPopup(false);
    };

    const handleRegisterClick = () => {
        setShowLoginPopup(false);
        setShowRegisterPopup(true);
    };

    const handleCloseRegisterPopup = () => {
        setShowRegisterPopup(false);
    };

    const handleLoginClickFromRegister = () => {
        setShowRegisterPopup(false);
        setShowLoginPopup(true);
    }

    return (
        <div className="p-10 sm:p-40">
            <h1 className="text-4xl m-2 font-bold text-center">Shopping made simple for everyone</h1>
            <p className="text-lg m-2 text-center">Welcome to the E-Market</p>
            <div className="flex justify-center">
                <Link href="/products" className="bg-blue-500 hover:bg-blue-700 text-black dark:text-white font-bold py-2 px-4 rounded-full m-2">Shop Now</Link>
                <button
                    onClick={handleLoginClick}
                    className="bg-blue-500 hover:bg-blue-700 text-black dark:text-white font-bold py-2 px-4 rounded-full m-2">
                    Sign Up
                </button>
            </div>
            {showLoginPopup && <Login onClose={handleCloseLoginPopup} onRegisterClick={handleRegisterClick} />}
            {showRegisterPopup && <Register onClose={handleCloseRegisterPopup} onLoginClick={handleLoginClick} onLoginClickFromRegister={handleLoginClickFromRegister} />}
        </div>
    );
}