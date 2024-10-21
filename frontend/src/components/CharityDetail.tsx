// src/frontend/components/CharityDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharityDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get charity ID from URL
    const [charity, setCharity] = useState<any>(null);

    useEffect(() => {
        axios.get(`http://localhost:8123/search/${id}`)
            .then(response => {
                setCharity(response.data);
            })
            .catch(error => {
                console.error('Error fetching charity details:', error);
            });
    }, [id]);

    if (!charity) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-4">{charity.name}</h1>
            <p>{charity.description}</p>
            {/* Add more fields as necessary based on the API response */}
            <div className="mt-8">
                <a href={charity.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Visit Website
                </a>
            </div>
        </div>
    );
};

export default CharityDetail;
