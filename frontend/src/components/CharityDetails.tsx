import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharityDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get charity ID from URL
    const [charity, setCharity] = useState<any>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/organization/${id}`)
            .then(response => {
                if (response.data) {
                    setCharity(response.data);
                } else {
                    console.error('No charity details found');
                    setCharity(null);
                }
            })
            .catch(error => {
                console.error('Error fetching charity details:', error);
            });
    }, [id]);

    if (!charity) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-4">{charity.name}</h1>
            <p>{charity.mission || 'No mission available.'}</p>
            <p>Address: {charity.address || 'No address available.'}</p>
            <p>EIN: {charity.ein}</p>
            {/* Add more fields as necessary based on the API response */}
            {charity.website && (
                <div className="mt-8">
                    <a href={charity.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Visit Website
                    </a>
                </div>
            )}
        </div>
    );
};

export default CharityDetails;
