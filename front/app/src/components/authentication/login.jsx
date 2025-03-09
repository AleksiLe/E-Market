'use client'

import postLogin from "@/services/postLogin";
import { useState } from 'react';
import { useToken } from '@/context/tokenContext';

export default function Login({ onClose, onRegisterClick }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { checkToken } = useToken();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await postLogin(email, password);
        if (data.success) {
            localStorage.setItem('token', data.token);
            checkToken();
            onClose();
        } else {
            setErrorMessage(data.message || 'Something went wrong');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center dark:bg-white bg-black bg-opacity-50 dark:bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl dark:text-white text-black font-bold mb-4">Login</h2>
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm dark:text-white text-black">
                    Not registered?{' '}
                    <button
                        onClick={onRegisterClick}
                        className="text-blue-500 hover:text-blue-700 font-bold focus:outline-none"
                    >
                        Create an account
                    </button>
                </p>
            </div>
        </div>
    );
}