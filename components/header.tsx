import React, { Suspense } from 'react';
import UserHeaderSection from './UserHeaderSection';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center w-full px-4 py-3 bg-gray-900">
            <img src= "UH-LOGO-COLORED-C.png" alt="Logo" className="size-11 md:size-16 ml-2 w-auto cursor-pointer" />
                <UserHeaderSection/>
        </header>
    );
};

export default Header;