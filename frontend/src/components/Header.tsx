import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/CharityFinder(test).png'; // Adjust the path if needed

const Header: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center bg-gray-100">
            {/* Logo */}
            <div className="py-5">
                <img src={logo} alt="CharityFinder Logo" className="w-60 h-auto mx-auto" /> {/* Increased logo size */}
            </div>

            {/* NavBar */}
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
                </ul>
            </nav>
        </div>
    );
};

export default Header;
