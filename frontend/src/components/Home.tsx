// src/frontend/components/Home.tsx
import React, { useState } from 'react';
import '../styles/Home.css';
import logo from '../images/CharityFinder(test).png';
import redCross from '../images/red_cross.png';
import doctorsWithoutBorders from '../images/doctors_without_borders.png';
import worldWildlifeFund from '../images/world_wildlife_fund.png';

import { searchByName } from '../API/search';
import { raw } from 'express';

interface Slide {
    title: string;
    description: string;
    imageUrl: string;
    websiteUrl: string;
}

const slides: Slide[] = [
    {
        title: 'American Red Cross',
        description: 'Provides emergency assistance, disaster relief, and education in the U.S. and internationally.',
        imageUrl: redCross,
        websiteUrl: 'https://www.redcross.org'
    },
    {
        title: 'Doctors Without Borders',
        description: 'Delivers medical care to people affected by conflict, epidemics, and disasters worldwide.',
        imageUrl: doctorsWithoutBorders,
        websiteUrl: 'https://www.doctorswithoutborders.org/'
    },
    {
        title: 'World Wildlife Fund',
        description: 'Works to conserve nature and reduce the most pressing threats to the diversity of life on Earth.',
        imageUrl: worldWildlifeFund,
        websiteUrl: 'https://www.worldwildlife.org/'
    },
    {
        title: 'Charity 4',
        description: 'Helping communities grow.',
        imageUrl: '/images/charity4.jpg',
        websiteUrl: 'https://example.com/charity4'
    },
    {
        title: 'Charity 5',
        description: 'Providing shelter for those in need.',
        imageUrl: '/images/charity5.jpg',
        websiteUrl: 'https://example.com/charity5'
    },
    {
        title: 'Charity 6',
        description: 'Supporting mental health initiatives.',
        imageUrl: '/images/charity6.jpg',
        websiteUrl: 'https://example.com/charity6'
    },
    {
        title: 'Charity 7',
        description: 'Providing shelter for those in need.',
        imageUrl: '/images/charity5.jpg',
        websiteUrl: 'https://example.com/charity7'
    },
    {
        title: 'Charity 8',
        description: 'Supporting mental health initiatives.',
        imageUrl: '/images/charity6.jpg',
        websiteUrl: 'https://example.com/charity8'
    },
    {
        title: 'Charity 9',
        description: 'Providing shelter for those in need.',
        imageUrl: '/images/charity5.jpg',
        websiteUrl: 'https://example.com/charity9'
    },
    {
        title: 'Charity 10',
        description: 'Supporting mental health initiatives.',
        imageUrl: '/images/charity6.jpg',
        websiteUrl: 'https://example.com/charity10'
    },
    {
        title: 'Charity 11',
        description: 'Providing shelter for those in need.',
        imageUrl: '/images/charity5.jpg',
        websiteUrl: 'https://example.com/charity11'
    },
    {
        title: 'Charity 12',
        description: 'Supporting mental health initiatives.',
        imageUrl: '/images/charity6.jpg',
        websiteUrl: 'https://example.com/charity12'
    }
];

const Home: React.FC = () => {
    const savedDarkMode = localStorage.getItem('isDarkMode') === 'true';
    const [startIndex, setStartIndex] = useState(0);
    const [flippedCards, setFlippedCards] = useState<number | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(savedDarkMode);  // Use saved state
    const cardsToShow = 6;

    searchByName("American Cancer Society").then((json) => console.log(json))

    const handleNextSlide = () => {
        setStartIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            // Ensure we do not remove cards and can loop back
            return nextIndex + cardsToShow > slides.length ? 0 : nextIndex;
        });
    };
    
    const handlePreviousSlide = () => {
        setStartIndex((prevIndex) => {
            const prevIndexCalc = prevIndex - 1;
            return prevIndexCalc < 0 ? slides.length - cardsToShow : prevIndexCalc;
        });
    };
    
    // Handle wrapping around when at the end of the list
    const visibleSlides = slides.slice(startIndex, startIndex + cardsToShow).concat(
        slides.slice(0, Math.max(0, (startIndex + cardsToShow) - slides.length))
    );
    

    const handleFlip = (index: number) => {
        setFlippedCards(index === flippedCards ? null : index);
    };

    return (
        <div className={`home-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        {/* Dark Mode Toggle */}
        <div className="toggle-container">
            <label className="switch">
                <input 
                    type="checkbox" 
                    checked={isDarkMode} 
                    onChange={() => {
                        setIsDarkMode(!isDarkMode);
                        localStorage.setItem('isDarkMode', (!isDarkMode).toString());
                    }} 
                />
                <span className="slider"></span>
            </label>
            <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
            {/* Logo */}
            <img src={logo} alt="CharityFinder Logo" className="charityfinder-logo" />
    
            {/* Search Bar */}
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search..." />
            </div>
    
            {/* Slideshow */}
            <div className="line"></div>
            <div className="slideshow-container">
                <div className="card-container">
                    <button className="arrow left" onClick={handlePreviousSlide}>{"<"}</button>
                    
                    <div className="cards">
                        {visibleSlides.map((slide, index) => (
                            <div
                                key={index}
                                className={`card ${flippedCards === index ? 'flipped' : ''}`}
                                onClick={() => handleFlip(index)}
                            >
                                <div className="card-front">
                                    <img src={slide.imageUrl} alt={slide.title} />
                                    <h3>{slide.title}</h3>
                                </div>
                                <div className="card-back">
                                    <p>{slide.description}</p>
                                    <div className="card-buttons">
                                        <button className="go-back" onClick={() => handleFlip(index)}>Go Back</button>
                                        <a href={slide.websiteUrl} target="_blank" rel="noopener noreferrer">
                                            <button className="visit-site">Visit Site</button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
    
                    <button className="arrow right" onClick={handleNextSlide}>{">"}</button>
                </div>
            </div>
            <div className="line"></div>
        </div>
    );
};

export default Home;