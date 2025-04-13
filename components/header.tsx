import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
            <div>
                <img src="/logo.png" alt="Logo" className="h-10" />
            </div>
            <div className="flex gap-4">
                <Link href={"/signin"} className="text-blue-500 cursor-pointer hover:underline">Sign in</Link>
                <Link href={"/signup"} className="text-blue-500 cursor-pointer hover:underline">Sign up</Link>
            </div>
        </header>
    );
};

export default Header;