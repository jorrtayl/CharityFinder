import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav className="w-full bg-white border-t border-b border-black">
            <div className="container mx-auto">
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
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;