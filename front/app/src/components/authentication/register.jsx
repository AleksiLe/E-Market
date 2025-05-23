import postRegister from '@/services/postRegister';
import { useState, React } from 'react';

export default function Register({ onClose, onLoginClick }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) {
            return;
        }

        const data = await postRegister(email, password, username);
        if (data.success) {
            setErrorMessage('');
            onClose();
            onLoginClick();
        } else if (data.errors) {
            const messages = data.errors.map((error) => error.path + " : " + error.msg).join("\n");
            setErrorMessage(messages);
        } else {
            setErrorMessage(data.message || 'Something went wrong');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center dark:bg-white bg-black bg-opacity-50 dark:bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl dark:text-white text-black font-bold mb-4">Register</h2>
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
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <div className="mb-4">
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Register
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
                        onClick={onLoginClick}
                        className="text-blue-500 hover:text-blue-700 font-bold focus:outline-none"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}