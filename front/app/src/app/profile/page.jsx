'use client'
import { useState, useEffect } from 'react'
import ChangePassword from '../../components/profile/changePassword'
import ChangeEmail from '../../components/profile/changeEmail'
import { useToken } from '@/context/tokenContext'

export default function Profile() {
    const { isTokenValid, checkToken } = useToken();
    useEffect(() => {
        checkToken();
        if (!isTokenValid) {
            window.location.href = '/';
        }
    }, [isTokenValid]);

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

    const handleLogOutClick = () => {
        window.localStorage.removeItem('token');
        window.location.href = '/';
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
                    <button
                        onClick={handleLogOutClick}
                        className="bg-blue-500 hover:bg-blue-700 text-black dark:text-white font-bold py-2 px-4 rounded-full m-2">
                        Log Out
                    </button>
                </div>
            </div>
            {showChangePasswordPopup && <ChangePassword onClose={handleCloseChangePasswordPopup} />}
            {showChangeEmailPopup && <ChangeEmail onClose={handleCloseChangeEmailPopup} />}
        </div>
    )
}