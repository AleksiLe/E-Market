'use client';
import { useState } from 'react';
import postChangeEmail from '@/services/postChangeEmail';

export default function ChangeEmail({ onClose }) {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const validateEmail = () => {
        if (email !== confirmEmail) {
            alert("Emails do not match.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail()) {
            return;
        }

        const token = window.localStorage.getItem('token');
        if (!token) {
            alert("You must be logged in to change your email.");
            window.location.href = '/';
            return;
        }

        const data = await postChangeEmail(token, email);
        if (data.success) {
            onClose();
        } else if (data.errors) {
            const messages = data.errors.map((error) => error.path + " : " + error.msg).join("\n");
            alert(messages);
        } else {
            alert(data.message);
        } 
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center dark:bg-white bg-black bg-opacity-50 dark:bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-lg w-96">
                <h2 className="text-2xl dark:text-white text-black font-bold mb-4">Change Email</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="email">
                            New Email
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
                        <label className="block dark:text-white text-black text-sm font-bold mb-2" htmlFor="confirm-email">
                            Confirm New Email
                        </label>
                        <input
                            type="email"
                            id="confirm-email"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Change Email
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