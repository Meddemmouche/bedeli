'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar(){
    const items = ['Category', 'Gifts', 'Message', 'About'];
    const pathname = usePathname();
    return (
        <nav className="grid grid-cols-3 items-center px-8 py-4 bg-transparent">
            <div className="justify-self-start">
                {pathname !== "/connection" && pathname !== "/connection/log-in" ? (
                    <Link 
                        href="/connection/sign-in" 
                        className="px-6 py-2 bg-red-300 hover:bg-red-400 text-gray-800 rounded-md font-medium transition-colors"
                    >
                        Sign in
                    </Link>
                ) : (null)}
            </div>   
            <div className="justify-self-center flex items-center gap-12 bg-white border border-gray-300 px-6 space-x-10 py-6 rounded-md shadow-lg">
                <Link className="text-gray-700 hover:text-gray-900 font-medium" href="/">Home</Link>
                {items.map((itm) => (
                    <Link className="text-gray-700 hover:text-gray-900 font-medium" href="/{/${itm.toLowerCase()}}" key={itm}>{itm}</Link>
                ))}
            </div>
            <div className="justify-self-end">
                {pathname !== "/connection" && pathname !== "/connection/log-in" ? (
                    <Link 
                        href="/connection/log-in" 
                        className="px-6 py-2 bg-red-300 hover:bg-red-400 text-gray-800 rounded-md font-medium transition-colors"
                    >
                        Log in
                    </Link>
                ) : (null)}
            </div>
        </nav>
    );
};