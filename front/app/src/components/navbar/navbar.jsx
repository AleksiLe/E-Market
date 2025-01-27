'use client'

import { usePathname } from 'next/navigation'
import Hyperlink from '@/components/navbar/hyperlink'

export default function Navbar() {
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
                <Hyperlink path={usePathname()} address="/contact" text="Contact" />
              </li>
            </ul>
            </div>
          </div>
      </nav>  
    );
}