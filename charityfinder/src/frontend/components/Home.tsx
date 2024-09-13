// src/frontend/components/Home.tsx
import React, { useState } from 'react';
import '../styles/Home.css';
import logo from '../../images/CharityFinder(test).png';
import redCross from '../../images/red_cross.png'; // Import the red cross image
import redCrossSlideshow from '../../images/slideshow/red_cross.png';
import charity2 from '../../images/doctors_without_borders.png';  // Import other images
import charity3 from '../../images/world_wildlife_fund.png';
import NavBar from './NavBar'; // Import the NavBar
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const slides = [
        { title: 'Charity 1', imageUrl: redCrossSlideshow, description: 'Help Children in Need' },
        { title: 'Charity 2', imageUrl: charity2, description: 'Support Wildlife Conservation' },
        { title: 'Charity 3', imageUrl: charity3, description: 'Mental Health Support' },
    ];

    const categories = [
        { name: "Children's Charities", imageUrl: redCross, link: '/children' },
        { name: 'Wildlife Charities', imageUrl: charity2, link: '/wildlife' },
        { name: 'Health Charities', imageUrl: charity3, link: '/health' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className="home-container">
            {/* Logo */}
            <div className="logo-container">
                <img src={logo} alt="CharityFinder Logo" className="charityfinder-logo" />
            </div>

            {/* NavBar directly under the logo */}
            <NavBar />

            {/* Search Bar */}
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search for charities..." />
            </div>

            {/* Slideshow */}
            <div className="slideshow-container">
                <button className="arrow left" onClick={handlePreviousSlide}>{"<"}</button>
                <div className="slide">
                    <img src={slides[currentSlide].imageUrl} alt={slides[currentSlide].title} />
                    <div className="slide-content">
                        <h2>{slides[currentSlide].title}</h2>
                        <p>{slides[currentSlide].description}</p>
                    </div>
                </div>
                <button className="arrow right" onClick={handleNextSlide}>{">"}</button>
            </div>

            {/* Categories Section */}
            <div className="category-container">
                {categories.map((category, index) => (
                    <div className="category-card" key={index}>
                        <Link to={category.link}>
                            <img src={category.imageUrl} alt={category.name} />
                            <h3>{category.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
