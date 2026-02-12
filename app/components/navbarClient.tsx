'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { User, LogOut, ChartNoAxesGantt } from 'lucide-react';
import { useState } from 'react';
import type { Session } from 'next-auth';

export default function NavbarClient({ session }: { session: Session | null }){
    const items = ['Gifts', 'Messages', 'About'];
    const pathname = usePathname();
    const [showDropdown, setShowDropdown] = useState(false);
    
    const showAuthButtons = pathname !== "/connection" && !pathname.startsWith("/connection/");
    const isLoggedIn = !!session;

    return (
        <nav className="grid grid-cols-3 items-center px-8 py-4 bg-transparent">
            <div className="justify-self-start">
                {showAuthButtons && !isLoggedIn && (
                    <Link 
                        href="/connection/sign-in" 
                        className="px-6 py-2 bg-red-300 hover:bg-red-400 text-gray-800 rounded-md font-medium transition-colors"
                    >
                        Sign Up
                    </Link>
                )}
            </div>   
            <div className="justify-self-center flex items-center gap-12 bg-white border border-gray-300 px-6 space-x-10 py-6 rounded-md shadow-lg">
                <Link className="text-gray-700 hover:text-gray-900 font-medium" href="/">Home</Link>
                <Link className="text-gray-700 hover:text-gray-900 font-medium" href="/category">Category</Link>
                {items.map((itm) => (
                    <Link className="text-gray-700 hover:text-gray-900 font-medium" href={`/${itm.toLowerCase()}`} key={itm}>{itm}</Link>
                ))}
                {pathname !== "/post" && (
                    <Link className="text-gray-700 hover:text-gray-900 font-medium" href="/post">Post exchange</Link>
                )}
            </div>
            <div className="justify-self-end">
                {pathname !== "/connection" && pathname !== "/connection/log-in" ? (
                    isLoggedIn ? (
                        <div className="relative">
                            <button 
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-medium">
                                    {session.user?.name?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
                                </div>
                                <span className="text-gray-700 font-medium hidden md:block">
                                    {session.user?.name?.split(' ')[0]}
                                </span>
                            </button>
                            
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <Link 
                                        href="/profile" 
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <User className="w-4 h-4" />
                                        Profile
                                    </Link>
                                    <Link
                                        href="/proposals"
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                                    >
                                        <ChartNoAxesGantt className="w-4 h-4" />
                                        Proposals
                                    </Link>
                                    <button 
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Log out
                                    </button>
                                </div>
                            )}
                            
                            {/* Close dropdown when clicking outside */}
                            {showDropdown && (
                                <div 
                                    className="fixed inset-0 z-40" 
                                    onClick={() => setShowDropdown(false)}
                                />
                            )}
                        </div>
                    ) : showAuthButtons ? (
                        <Link 
                            href="/connection/log-in" 
                            className="px-6 py-2 bg-red-300 hover:bg-red-400 text-gray-800 rounded-md font-medium transition-colors"
                        >
                            Log in
                        </Link>
                    ) :
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