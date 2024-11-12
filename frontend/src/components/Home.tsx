import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import redCrossSlideshow from '../images/slideshow/red_cross.png';
import doctorsWithoutBorders from '../images/slideshow/doctors_without_borders.png';
import worldWildlifeFund from '../images/slideshow/world_wildlife_fund.png';
import {Organization, Tag} from '../API/types';
import OrgCard from './OrgCard';
import Header from './Header';
import OrgCardManager from './OrgCardManager';
import { searchByName, searchByNameAndGroup } from '../API/search';

// Main Home component for the CharityFinder application
const Home: React.FC = () => {
    // Define slides for the slideshow
    const slides = [
        { imageUrl: redCrossSlideshow, title: 'Red Cross' },
        { imageUrl: doctorsWithoutBorders, title: 'Doctors Without Borders' },
        { imageUrl: worldWildlifeFund, title: 'World Wildlife Fund' },
    ];

    // State to manage the current slide index in the slideshow, initialized to 0 to start from the first slide
    const [currentSlide, setCurrentSlide] = useState(0);

    // State to store the search query input by the user
    const [searchQuery, setSearchQuery] = useState('');

    // State to store search results from the API
    const [searchResults, setSearchResults] = useState<any[]>([]);

    // State to store selected tags for filtering search results
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [searchedOrgs, setSearchedOrgs] = useState<Organization[]>([]);
    const navigate = useNavigate();

    const searchCurrent = () => {
        if(selectedTag === null) {
            searchByName(searchQuery)
                .then(response => {
                    // Check if response data contains organizations
                    if (response.length > 0) {
                        setSearchedOrgs(response)
                    } else {
                        setSearchResults([]); // Clear results if none found
                    }
                })
                .catch(error => console.error('Error fetching search results:', error));
        } else {
            searchByNameAndGroup(searchQuery, selectedTag)
                .then(response => {
                    // Check if response data contains organizations
                    if (response.length > 0) {
                        setSearchedOrgs(response)
                    } else {
                        setSearchResults([]); // Clear results if none found
                    }
                })
                .catch(error => console.error('Error fetching search results:', error));
        }
    }

    // useEffect hook to handle automatic slideshow change every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((currentSlideIndex) => (currentSlideIndex + 1) % slides.length);
        }, 5000);

        // Cleanup timer on component unmount
        return () => clearInterval(timer);
    }, [slides.length]);

    // Search when query or tag is changed
    useEffect(() => {
        if(searchQuery.length >= 1) {
            searchCurrent()
        }
    }, [searchQuery, selectedTag])

    // Function to handle search input changes and fetch search results
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
    };
  
    // Function to toggle selection of a tag and refetch results based on updated tags
    const handleTagToggle = (tag: Tag) => {
        // Update selected tags based on whether the tag is already selected
        if(tag === selectedTag) {
            setSelectedTag(null)
        }
        else {
            setSelectedTag(tag);
        }
    };

    // Function to handle selecting a charity from search results and navigate to its details page
    const handleSelectCharity = async (id: string) => {
        try {
            // Fetch charity details by ID and navigate to charity page with data in state
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
            <p className="text-xl font-bold text-gray-700 mt-2 mb-2 text-center">
                Your Generosity, Their Transformation!
            </p>

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
            <div className="flex justify-center space-x-4 mb-4 overflow-x-auto w-2/3">
                {Object.keys(Tag).filter(key => isNaN(Number(key))).map((tagString: string, index: number) => (
                    <button
                        key={Tag[index + 1]}
                        onClick={() => handleTagToggle(index + 1)}
                        className={`px-4 py-2 rounded-full border ${
                            (index + 1 === selectedTag) ? 'bg-blue-500 text-white' : 'bg-white text-black'
                        }`}
                    >
                        {tagString.replaceAll('_', " ")}
                    </button>
                ))}
            </div>

            {searchResults.length > 0 && (
                <div className="w-2/3 bg-white shadow-md rounded mt-2 mb-4 max-h-60 overflow-y-auto">
                    {searchResults.map((result) => (
                        <div
                            key={result.ein}
                            onClick={() => handleSelectCharity(result.ein)}
                            className="p-2 cursor-pointer transition-all duration-300 ease-in-out bg-white hover:bg-blue-100 hover:animate-bounce"
                        >
                            {result.name}
                        </div>
                    ))}
                </div>
            )}

            <div className="relative w-full max-w-4xl h-96 mb-8 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <div
                    className="absolute inset-y-0 left-0 w-1/8 flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-50 transition-all"
                    onClick={() => setCurrentSlide((currentSlideIndex) => (currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1))}
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
                    onClick={() => setCurrentSlide((currentSlideIndex) => (currentSlideIndex + 1) % slides.length)}
                >
                    <button className="text-4xl text-gray-700 font-bold">{">"}</button>
                </div>
            </div>
            
            <OrgCardManager orgs={searchedOrgs}/>
            
            <footer className="w-full bg-gray-800 text-white p-4 text-center mt-auto">
                <p>© 2024 CharityFinder</p>
            </footer>
        </div>
    );
};

export default Home;