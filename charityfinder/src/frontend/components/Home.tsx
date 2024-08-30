// src/frontend/components/Home.tsx
import React from 'react';
import '../styles/Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h2>Welcome to CharityFinder</h2>
            <p>Find the best charities to donate to.</p>
        </div>
    );
};

export default Home;
