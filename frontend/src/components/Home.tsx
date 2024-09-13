// src/frontend/components/Home.tsx
import React, { useState } from 'react';
import '../styles/Home.css';
import logo from '../images/CharityFinder(test).png';
import redCross from '../images/red_cross.png';
import doctorsWithoutBorders from '../images/doctors_without_borders.png';
import worldWildlifeFund from '../images/world_wildlife_fund.png';
import redCrossSlideshow from '../../images/slideshow/red_cross.png';
import charity2 from '../../images/doctors_without_borders.png';  // Import other images
import charity3 from '../../images/world_wildlife_fund.png';
import NavBar from './NavBar'; // Import the NavBar
import { Link } from 'react-router-dom';

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

    searchByName("American Cancer Society").then((json) => console.log(json))

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
