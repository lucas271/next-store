"use client"
import { useEffect, useState } from 'react';
import NavbarLinks from './NavbarLinks';
import Link from 'next/link';

export default function Navbar() {
   return <>
         <header className="navbar h-[10vh] z-50">
            <div className={`fixed z-50 w-screen h-[10vh] py-3 text-gray-500 text-xl shadow-sm bg-white transition duration-200`}>
               <nav className="flex h-full justify-between items-center px-8 gap-8 capitalize sm:justify-around sm:p-0">
                 <NavbarLinks />
               </nav>
            </div>
         </header>
      </>
}