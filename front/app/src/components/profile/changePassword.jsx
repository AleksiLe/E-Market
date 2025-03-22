'use client'
import { useState } from 'react'
import PostChangePassword from '@/services/postChangePassword'
import PropTypes from 'prop-types';

export default function ChangePassword({ onClose }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error or success messages

    const validatePassword = () => {
        if (password !== confirmPassword || password.length == 0) { // Didn't think this before but empty strings are also ==
            setErrorMessage('Passwords do not match.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous messages

        if (!validatePassword()) {
            return;
        }

        const token = window.localStorage.getItem('token');
        if (!token) {
            setErrorMessage('You must be logged in to change your password.');
            window.location.href = '/';
            return;
        }

        const data = await PostChangePassword(token, password);
        if (data.success) {
            setErrorMessage('Password changed successfully!');
            onClose();
        } else if (data.errors) {
            const messages = data.errors.map((error) => `${error.path} : ${error.msg}`).join('\n');
            setErrorMessage(messages);
        } else {
            setErrorMessage(data.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center dark:bg-white bg-black bg-opacity-50 dark:bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl dark:text-white text-black font-bold mb-4">Change Password</h2>
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="password">
                            New Password
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
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
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
                            Change Password
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
            </div>
        </div>
    );
}

ChangePassword.propTypes = {
    onClose: PropTypes.func.isRequired,
};