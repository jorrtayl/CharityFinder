import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import redCrossSlideshow from '../images/slideshow/red_cross.png';
import doctorsWithoutBorders from '../images/slideshow/doctors_without_borders.png';
import worldWildlifeFund from '../images/slideshow/world_wildlife_fund.png';
import {Tag} from '../API/types';
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
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        const tagString = selectedTags.join(',');
        if (query.length >= 1) {
            axios.get(`http://localhost:3000/search/${query}`, { params: { tags: tagString } })
                .then(response => {
                    // Ensure that we access the organizations array correctly
                    if (response.data && response.data.organizations) {
                        setSearchResults(response.data.organizations);
                    } else {
                        setSearchResults([]); // Clear results if none found
                    }
                })
                .catch(error => console.error('Error fetching search results:', error));
        } else {
            setSearchResults([]);
        }
    };
  
    const handleTagToggle = (tag: Tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
        console.log(tag)
        
        // If there is an existing search query, refetch based on tags
        if (searchQuery.length >= 1) {
            axios.get(`http://localhost:3000/search/${searchQuery}`, { params: { tags: updatedTags.join(',') } })
                .then(response => {
                    setSearchResults(response.data.organizations || []);
                })
                .catch(error => console.error('Error fetching search results:', error));
        }
    };

    const handleSelectCharity = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/organization/${id}`, { timeout: 5000 });
            if (response.data) {
                navigate(`/charity/${id}`, { state: { charity: response.data } });
            } else {
                console.error('No charity details found.');
            }
        } catch (error) {
            console.error('Error fetching charity details:', error);
            navigate(`/charity/${id}`, { state: { charity: null } });
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            <Header />

            {/* Motto */}
            <p className="text-xl font-bold text-gray-700 mt-2 mb-2 text-center">
                Your generosity, their transformation
            </p>

            {/* Search Bar */}
            <div className="mt-4 mb-2 w-2/3 relative">
                <input
                    type="text"
                    className="w-full p-4 rounded-full border border-gray-300 shadow-sm"
                    placeholder="Search for charities..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {/* Tags Scroller */}
            <div className="flex space-x-4 mb-4 overflow-x-auto w-2/3">
                {Object.keys(Tag).filter(key => isNaN(Number(key))).map((tagString: string, index: number) => (
                    <button
                        key={Tag[index + 1]}
                        onClick={() => handleTagToggle(index + 1)}
                        className={`px-4 py-2 rounded-full border ${
                            selectedTags.includes(index + 1) ? 'bg-blue-500 text-white' : 'bg-white text-black'
                        }`}
                    >
                        {tagString.replaceAll('_', " ")}
                    </button>
                ))}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
                <div className="w-2/3 bg-white shadow-md rounded mt-2 mb-4 max-h-60 overflow-y-auto">
                    {searchResults.map((result) => (
                        <div
                            key={result.ein} // Use ein as a unique identifier
                            onClick={() => handleSelectCharity(result.ein)}
                            className="p-2 cursor-pointer transition-all duration-300 ease-in-out bg-white hover:bg-blue-100 hover:animate-bounce"
                            >
                            {result.name}
                        </div>
                    ))}
                </div>
            )}
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

            <footer className="w-full bg-gray-800 text-white p-4 text-center mt-auto">
                <p>© 2024 CharityFinder</p>
            </footer>
        </div>
    );
};

export default Home;
