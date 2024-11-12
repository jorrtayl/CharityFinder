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
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [searchedOrgs, setSearchedOrgs] = useState<Organization[]>([]);
    const navigate = useNavigate();

    // useEffect hook to handle automatic slideshow change every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((currentSlideIndex) => (currentSlideIndex + 1) % slides.length);
        }, 5000);

        // Cleanup timer on component unmount
        return () => clearInterval(timer);
    }, [slides.length]);

    // Function to handle search input changes and fetch search results
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Join selected tags into a string format for API request
        const tagString = selectedTags.join(',');
        if (query.length >= 1) {
            axios.get(`http://localhost:3000/search/${query}`, { params: { tags: tagString } })
                .then(response => {
                    // Check if response data contains organizations
                    if (response.data && response.data.organizations) {
                        setSearchResults(response.data.organizations);
                        let orgs = new Array<Organization>();
                        response.data.organizations.map((org: Organization, i: number) => {
                            if(i < 9) {
                                orgs.push(org);
                            }
                        })
                        setSearchedOrgs(orgs)
                    } else {
                        setSearchResults([]); // Clear results if none found
                    }
                })
                .catch(error => console.error('Error fetching search results:', error));
        } else {
            setSearchResults([]); // Clear results if query is empty
        }
    };
  
    // Function to toggle selection of a tag and refetch results based on updated tags
    const handleTagToggle = (tag: Tag) => {
        // Update selected tags based on whether the tag is already selected
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);

        // If there's an active search query, refetch results with updated tags
        if (searchQuery.length >= 1) {
            axios.get(`http://localhost:3000/search/${searchQuery}`, { params: { tags: updatedTags.join(',') } })
                .then(response => {
                    setSearchResults(response.data.organizations || []);
                })
                .catch(error => console.error('Error fetching search results:', error));
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
                            selectedTags.includes(index + 1) ? 'bg-blue-500 text-white' : 'bg-white text-black'
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