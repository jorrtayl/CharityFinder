// src/frontend/components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav className="w-full bg-white border-t border-b border-black">
            <ul className="flex justify-center space-x-8 py-4">
                <li>
                    <Link to="/" className="text-lg text-black hover:text-blue-500">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="text-lg text-black hover:text-blue-500">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/donate" className="text-lg text-black hover:text-blue-500">
                        Donate
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="text-lg text-black hover:text-blue-500">
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
