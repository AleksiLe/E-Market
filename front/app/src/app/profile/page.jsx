'use client'
import validateToken from "@/services/validateToken"
import { useState, useEffect } from 'react'
import ChangePassword from '../../components/profile/changePassword'
import ChangeEmail from '../../components/profile/changeEmail'
export default function Profile() {

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            validateToken(token).then((result) => {
                if (!result) {
                    window.localStorage.removeItem('token');
                    window.location.href = '/';
                }
            });
        }
    }, []);
    const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
    const [showChangeEmailPopup, setShowChangeEmailPopup] = useState(false);

    const handleChangeEmailClick = () => {
        setShowChangeEmailPopup(true);
    }

    const handleCloseChangeEmailPopup = () => {
        setShowChangeEmailPopup(false);
    }

    const handleChangePasswordClick = () => {
        setShowChangePasswordPopup(true);
    };

    const handleCloseChangePasswordPopup = () => {
        setShowChangePasswordPopup(false);
    };


    return(
        <div className="p-10 sm:p-40">
            <h1 className="text-4xl m-2 font-bold text-center">Profile</h1>
            <div className="text-lg m-2 text-center">
                <p>Welcome to your profile page!</p>
                <p>Here you can view and edit your personal information.</p>
                <div className="flex justify-center">
                    <button
                        onClick={handleChangePasswordClick}
                        className="bg-blue-500 hover:bg-blue-700 text-black dark:text-white font-bold py-2 px-4 rounded-full m-2">
                        Change Password
                    </button>
                    <button
                        onClick={handleChangeEmailClick}
                        className="bg-blue-500 hover:bg-blue-700 text-black dark:text-white font-bold py-2 px-4 rounded-full m-2">
                        Change Email
                    </button>
                </div>
            </div>
            {showChangePasswordPopup && <ChangePassword onClose={handleCloseChangePasswordPopup} />}
            {showChangeEmailPopup && <ChangeEmail onClose={handleCloseChangeEmailPopup} />}
        </div>
    )
}