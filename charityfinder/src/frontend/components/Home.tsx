// src/frontend/components/Home.tsx
import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import redCross from '../../images/red_cross.png';
import doctorsWithoutBorders from '../../images/doctors_without_borders.png';
import worldWildlifeFund from '../../images/world_wildlife_fund.png';


interface Slide {
    title: string;
    description: string;
    imageUrl: string;
}

const slides: Slide[] = [
    {
        title: 'American Red Cross',
        description: 'The Red Cross is a humanitarian organization that provides emergency assistance, disaster relief, and education in countries around the globe. The organization is known for its work in response to natural disasters, armed conflicts, and crises. It provides medical care, shelter, and food aid to those affected by catastrophes. The Red Cross also promotes blood donations, helps reconnect separated families, and supports communities through disaster preparedness programs.',
        imageUrl: redCross
    },
    {
        title: 'Doctors Without Borders',
        description: 'Doctors Without Borders is an international medical humanitarian organization that delivers emergency medical aid to people affected by conflict, epidemics, disasters, or exclusion from healthcare. The organization is known for sending doctors, nurses, and medical professionals into the most dangerous and underserved areas to provide life-saving care. MSF operates independently from any political, military, or religious agendas, focusing solely on helping those in need.',
        imageUrl: doctorsWithoutBorders
    },
    {
        title: 'World Wildlife Fund',
        description: 'WWF is one of the world’s largest and most effective conservation organizations. It focuses on environmental sustainability and the protection of endangered species. The organization works to combat climate change, reduce pollution, and preserve natural habitats for wildlife. WWF is involved in efforts to save iconic species like tigers, rhinos, and pandas, and it also advocates for sustainable food systems, clean water, and renewable energy solutions.',
        imageUrl: worldWildlifeFund
    }
];

const Home: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(slideInterval); // Cleanup interval on component unmount
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className={`home-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {/* NavBar here */}
            
            {/* Dark Mode Toggle */}
            <div className="toggle-container">
                <label className="switch">
                    <input type="checkbox" onChange={toggleDarkMode} />
                    <span className="slider"></span>
                </label>
                <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>

            {/* Title */}
            <h1 className="charityfinder-title">CharityFinder</h1>

            {/* Search Bar */}
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search..." />
            </div>

            {/* Slideshow */}
            <div className="slideshow-container">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <img src={slide.imageUrl} alt={slide.title} />
                        <div className="slide-content">
                            <h3>{slide.title}</h3>
                            <p>{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;