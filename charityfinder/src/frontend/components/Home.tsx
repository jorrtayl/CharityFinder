// src/frontend/components/Home.tsx
import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

interface Slide {
    title: string;
    description: string;
    imageUrl: string;
}

const slides: Slide[] = [
    {
        title: 'Charity 1',
        description: 'Helping those in need.',
        imageUrl: '/images/charity1.jpg'
    },
    {
        title: 'Charity 2',
        description: 'Support education for all.',
        imageUrl: '/images/charity2.jpg'
    },
    {
        title: 'Charity 3',
        description: 'Providing clean water to communities.',
        imageUrl: '/images/charity3.jpg'
    }
];

const Home: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(slideInterval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="home-container">
            <h2>Welcome to CharityFinder</h2>
            <p>Find the best charities to donate to.</p>

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
