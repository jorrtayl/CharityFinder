// src/frontend/components/Home.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import redCrossSlideshow from '../images/slideshow/red_cross.png';
import doctorsWithoutBorders from '../images/slideshow/doctors_without_borders.png';
import worldWildlifeFund from '../images/slideshow/world_wildlife_fund.png';
import Header from './Header';

const Home: React.FC = () => {
    const slides = [
        { imageUrl: redCrossSlideshow, title: 'Red Cross' },
        { imageUrl: doctorsWithoutBorders, title: 'Doctors Without Borders' },
        { imageUrl: worldWildlifeFund, title: 'World Wildlife Fund' },
    ];

    const categories = [
        { name: "Children's Charities", imageUrl: redCrossSlideshow, link: '/category/children' },
        { name: 'Wildlife Charities', imageUrl: doctorsWithoutBorders, link: '/category/wildlife' },
        { name: 'Health Charities', imageUrl: worldWildlifeFund, link: '/category/health' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Only search if the query has 2 or more characters without needing a space
        if (query.trim().length >= 2) {
            try {
                const response = await axios.get(`http://localhost:3000/search/${query}`);
                if (response.data.organizations) {
                    setSearchResults(response.data.organizations);
                } else {
                    setSearchResults([]); // Set empty if no results
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]); // Clear results on error
            }
        } else {
            setSearchResults([]); // Clear search results if query is too short
        }
    };

    const handleSelectCharity = (id: string) => {
        navigate(`/charity/${id}`);
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            <Header />

            {/* Search Bar */}
            <div className="mt-4 mb-8 w-2/3">
                <input
                    type="text"
                    className="w-full p-4 rounded-full border border-gray-300"
                    placeholder="Search for charities..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {searchResults.length > 0 && (
                    <div className="bg-white shadow-md rounded mt-2">
                        {searchResults.map((result) => (
                            <div
                                key={result.ein}
                                onClick={() => handleSelectCharity(result.ein)}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                            >
                                {result.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Slideshow */}
            <div className="relative w-full max-w-4xl h-80 mb-8 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <div
                    className="absolute inset-y-0 left-0 w-1/8 flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-50 transition-all"
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1))}
                >
                    <button className="text-4xl text-gray-700 font-bold">{"<"}</button>
                </div>

                <div className="h-full w-full flex justify-center items-center">
                    <img
                        src={slides[currentSlide].imageUrl}
                        alt={slides[currentSlide].title}
                        className="object-cover h-full w-full rounded-lg"
                    />
                </div>

                <div
                    className="absolute inset-y-0 right-0 w-1/8 flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-50 transition-all"
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
                >
                    <button className="text-4xl text-gray-700 font-bold">{">"}</button>
                </div>
            </div>

            {/* Categories Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {categories.map((category, index) => (
                    <div className="text-center" key={index}>
                        <Link to={category.link}>
                            <img src={category.imageUrl} alt={category.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                            <h3 className="text-lg font-semibold">{category.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>

            <footer className="w-full bg-gray-800 text-white p-4 text-center">
                <p>© 2024 CharityFinder</p>
            </footer>
        </div>
    );
};

export default Home;
