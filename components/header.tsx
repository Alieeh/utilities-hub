import React from 'react';
import UserProfile from './userProfile';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-900">
            <div>
                <img src= "UH-LOGO-COLORED-C.png" alt="Logo" className="ml-5 h-20 w-auto cursor-pointer" />
            </div>
            <UserProfile/>
            
        </header>
    );
};

export default Header;