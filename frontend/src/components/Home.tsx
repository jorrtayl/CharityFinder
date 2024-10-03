// src/frontend/components/Home.tsx
import React, { useState, useEffect } from 'react';
import logo from '../images/CharityFinder(test).png';
import redCrossSlideshow from '../images/slideshow/red_cross.png';
import doctorsWithoutBorders from '../images/slideshow/doctors_without_borders.png';
import worldWildlifeFund from '../images/slideshow/world_wildlife_fund.png';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

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
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (searchTerm) {
            setLoading(true);
            const delayDebounceFn = setTimeout(() => {
                axios.get(`http://localhost:8123/search/${searchTerm}`)
                    .then((response) => {
                        setSearchResults(response.data.organizations || []);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error('Error fetching search results:', error);
                        setLoading(false);
                    });
            }, 300); 
            
            return () => clearTimeout(delayDebounceFn);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            {/* Logo */}
            <div className="py-5">
                <img src={logo} alt="CharityFinder Logo" className="w-48 mx-auto" />
            </div>

            {/* NavBar */}
            <NavBar />

            {/* Search Bar */}
            <div className="mt-4 mb-8 w-2/3 relative">
                <input
                    type="text"
                    className="w-full p-4 rounded-full border border-gray-300"
                    placeholder="Search for charities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {searchResults.length > 0 && (
                    <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                        {loading ? (
                            <div className="p-4">Loading...</div>
                        ) : (
                            searchResults.map((result: any, index) => (
                                <Link
                                    to={`/charity/${result.ein}`}
                                    key={index}
                                    className="block px-4 py-2 hover:bg-gray-200"
                                >
                                    {result.name}
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Slideshow */}
            <div className="relative w-full max-w-4xl h-80 mb-8 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <div
                    className="absolute inset-y-0 left-0 w-1/8 flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-50 transition-all"
                    onClick={handlePreviousSlide}
                >
                    <button className="text-4xl text-gray-700 font-bold">{"<"}</button>
                </div>
                
                <div className="h-full w-full flex justify-center items-center">
                    <img
                        src={slides[currentSlide].imageUrl}
                        alt={slides[currentSlide].title}
                        className="h-full w-full object-cover object-center rounded-lg"
                    />
                </div>
                
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
