'use client'

import { usePathname } from 'next/navigation'
import Hyperlink from '@/components/navbar/hyperlink'

export default function Navbar() {
    //console.log(usePathname())
    return (
        <nav className="bg-white bg-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a> */}
          <ul className="flex font-medium p-0 space-x-8 rtl:space-x-reverse flex-row mt-0 border-0 bg-whit dark:bg-gray-900">
            <li>
              <Hyperlink path={usePathname()} address="/" text="Home" />
            </li>
            <li>
              <Hyperlink path={usePathname()} address="/products" text="Products" />
            </li>
          </ul>
        <div className="items-center justify-between hidden w-full sm:flex sm:w-auto sm:order-1" id="navbar-user">
          <ul className="flex font-medium p-0 space-x-8 rtl:space-x-reverse flex-row mt-0 border-0 bg-whit dark:bg-gray-900">
            <li>
              <Hyperlink path={usePathname()} address="/about" text="About" />
            </li>
            <li>
              <Hyperlink path={usePathname()} address="/contact" text="Contact" />
            </li>
          </ul>
        </div>
        </div>
      </nav>  
    );
}

//ul className="flex flex-col font-medium p-4 sm:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 sm:space-x-8 rtl:space-x-reverse sm:flex-row sm:mt-0 sm:border-0 sm:bg-white dark:bg-gray-800 sm:dark:bg-gray-900 dark:border-gray-700"
// Navbar icon and dropdown menu for user
/* <div className="flex items-center sm:order-2 space-x-3 sm:space-x-0 rtl:space-x-reverse">
    <button type="button" className="flex text-sm bg-gray-800 rounded-full sm:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo">
    </button>
    //<!-- Dropdown menu -->
    <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
        </li>
        <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
        </li>
        <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
        </li>
        <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
        </li>
        </ul>
    </div>
    <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
</div>  
*/