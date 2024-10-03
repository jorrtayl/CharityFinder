import React, { useState } from 'react';
import logo from '../images/CharityFinder(test).png';
import redCross from '../images/red_cross.png'; 
import redCrossSlideshow from '../images/slideshow/red_cross.png';
import doctorsWithoutBorders from '../images/slideshow/doctors_without_borders.png'
import worldWildlifeFund from '../images/slideshow/world_wildlife_fund.png'
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

import { financialData, keywordSearch, searchByName } from '../API/search';
import {Tag} from '../API/types';

const Home: React.FC = () => {
    const slides = [
        { imageUrl: redCrossSlideshow, title: 'Red Cross' },
        { imageUrl: doctorsWithoutBorders, title: 'Doctors Without Borders' },
        { imageUrl: worldWildlifeFund, title: 'World Wildlife Fund' },
    ];

    const categories = [
        { name: "Children's Charities", imageUrl: redCrossSlideshow, link: '/children' },
        { name: 'Wildlife Charities', imageUrl: doctorsWithoutBorders, link: '/wildlife' },
        { name: 'Health Charities', imageUrl: worldWildlifeFund, link: '/health' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchString, setSearchString] = useState(0);

    // searchByName("propublica").then((arr) => console.log("Result: ", arr))
    // financialData(142007220).then(filing => console.log("Latest Filing: ", filing));
    // keywordSearch(Tag.Culture, 10)
    //    .then(arr => console.log("Keyword Search Result: ", arr));

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    // Event handlers for Search Bar

    const handleInputChange = (event: any) => {
        setSearchString(event.target.value)
    }

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            searchByName(`${searchString}`)
                .then((arr) => console.log("Result: ", arr))   
        }
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            {/* Logo */}
            <div className="py-5">
                <img src={logo} alt="CharityFinder Logo" className="w-48 mx-auto" /> {/* Increased the size */}
            </div>

            {/* NavBar */}
            <NavBar />

            {/* Search Bar */}
            <div className="mt-4 mb-8 w-2/3">
                <input
                    type="text"
                    className="w-full p-4 rounded-full border border-gray-300"
                    placeholder="Search for charities..."
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* Slideshow */}
            <div className="relative w-full max-w-4xl h-80 mb-8 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                {/* Left arrow with hover effect */}
                <div
                    className="absolute inset-y-0 left-0 w-1/8 flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-50 transition-all"
                    onClick={handlePreviousSlide}
                >
                    <button className="text-4xl text-gray-700 font-bold">{"<"}</button>
                </div>
                
                {/* Image */}
                <div className="h-full w-full flex justify-center items-center">
                    <img
                        src={slides[currentSlide].imageUrl}
                        alt={slides[currentSlide].title}
                        className="object-cover h-full w-full rounded-lg"
                    />
                </div>
                
                {/* Right arrow with hover effect */}
                <div
                    className="absolute inset-y-0 right-0 w-1/8 flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-50 transition-all"
                    onClick={handleNextSlide}
                >
                    <button className="text-4xl text-gray-700 font-bold">{">"}</button>
                </div>
            </div>

            {/* Categories Section */}
            <div className="flex justify-center items-end space-x-8 mb-8">
                {categories.map((category, index) => (
                    <div className="text-center" key={index}>
                        <Link to={category.link}>
                            <img src={category.imageUrl} alt={category.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                            <h3 className="text-lg font-semibold">{category.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="w-full bg-gray-800 text-white p-4 text-center">
                <p>© 2024 CharityFinder</p>
            </footer>
        </div>
    );
};

export default Home;
