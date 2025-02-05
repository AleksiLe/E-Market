'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Hyperlink from '@/components/navbar/hyperlink'
import Login from '@/components/authentication/login'
import Register from '@/components/authentication/register'

export default function Navbar() {
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
    return (
        <nav className="bg-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between mx-auto p-1 py-3 sm:p-3 ">
            <ul className="flex font-medium p-0 space-x-8 rtl:space-x-reverse flex-row mt-0 border-0 bg-whit dark:bg-gray-900">
              <li>
                <Hyperlink path={usePathname()} address="/" text="Home" />
              </li>
              <li>
                <Hyperlink path={usePathname()} address="/products" text="Products" />
              </li>
            </ul>
            <div className="justify-between flex sm:w-auto" id="navbar-user">
            <ul className="flex font-medium p-0 space-x-8 rtl:space-x-reverse flex-row mt-0 border-0 bg-whit dark:bg-gray-900">
              <li>
                <Hyperlink path={usePathname()} address="/about" text="About" />
              </li>
              <li>
                {window?.localStorage?.getItem('token') ? 
                  <Hyperlink path={usePathname()} address="/profile" text="Profile" /> : 
                  <button onClick={handleLoginClick} className="text-black dark:text-white hover:text-blue-700">
                    Login
                  </button>
                }
              </li>
            </ul>
            </div>
          </div>
          {showLoginPopup && <Login onClose={handleCloseLoginPopup} onRegisterClick={handleRegisterClick} />}
          {showRegisterPopup && <Register onClose={handleCloseRegisterPopup} onLoginClick={handleLoginClick} />}
      </nav>  
    );
}