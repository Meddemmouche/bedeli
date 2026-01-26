import Link from 'next/link';

export default function Navbar(){
    const items = ['Category', 'Gifts', 'Message', 'About'];
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-transparent">
            <Link 
                href="/connection/sign-in" 
                className="px-6 py-2 bg-red-300 hover:bg-red-400 text-gray-800 rounded-md font-medium transition-colors"
            >
                Sign in
            </Link>            
            <div className="flex items-center gap-12 bg-white border border-gray-300 px-6 space-x-10 py-6 rounded-md shadow-lg">
                <Link className="text-gray-700 hover:text-gray-900 font-medium" href="/">Home</Link>
                {items.map((itm) => (
                    <Link className="text-gray-700 hover:text-gray-900 font-medium" href="/{itm}" key={itm}>{itm}</Link>
                ))}
            </div>
            <Link 
                href="/connection/log-in" 
                className="px-6 py-2 bg-red-300 hover:bg-red-400 text-gray-800 rounded-md font-medium transition-colors"
            >
                Log in
            </Link>
        </nav>
    );
};