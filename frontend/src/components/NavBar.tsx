// src/frontend/components/NavBar.tsx
import React from 'react';
import '../styles/NavBar.css';
<<<<<<< HEAD:frontend/src/components/NavBar.tsx
import logo from '../images/CharityFinder(test).png';
=======
>>>>>>> master:charityfinder/src/frontend/components/NavBar.tsx
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/donate">Donate</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;