import { useState, React, useActionState, useEffect } from 'react';
import { register } from '@/app/actions/auth';

export default function Register({ onClose, onLoginClick, onLoginClickFromRegister }) {
    const [state,  action, pending] = useActionState(register, undefined);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        console.log(state)
        if (state?.success) {
            setShowSuccess(true);
            // Redirect to login after 2 seconds
            const timer = setTimeout(() => {
                onClose();
                onLoginClick();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [state?.success]);



    return (
        <div className="fixed inset-0 flex items-center justify-center dark:bg-white bg-black bg-opacity-50 dark:bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl dark:text-white text-black font-bold mb-4">Register</h2>
                {showSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {state?.message}
                    </div>
                )}
                {state?.error?.message && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {state.error.message}
                    </div>
                )}
                <form action={action}>
                    <div className="mb-4">
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {state?.error?.email && <p className="text-red-500">{state.error.email}</p>}
                    <div className="mb-4">
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {state?.error?.username && <p className="text-red-500">{state.error.username}</p>}
                    <div className="mb-4">
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {state?.error?.password && <p className="text-red-500">{state.error.password}</p>}
                    <div className="mb-4">
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {state?.error?.confirmPassword && <p className="text-red-500">{state.error.confirmPassword}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {pending ? 'Registering...' : 'Register'}
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
                    Already have an account?{' '}
                    <button
                        onClick={onLoginClickFromRegister}
                        className="text-blue-500 hover:text-blue-700 font-bold focus:outline-none"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}