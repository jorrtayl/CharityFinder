import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharityDetails: React.FC = () => {
    const { ein } = useParams<{ ein: string }>();
    const [charityDetails, setCharityDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (ein) {
            axios.get(`http://localhost:3000/organization/${ein}`)
                .then(response => {
                    setCharityDetails(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching charity details:', error);
                    setError('Failed to load charity details.');
                    setLoading(false);
                });
        }
    }, [ein]);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error || !charityDetails) {
        return <div className="text-center p-4">{error || 'Charity details not available.'}</div>;
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mt-8">{charityDetails.name}</h1>
            <p className="mt-4">{charityDetails.mission}</p>
            {/* Additional details like address, phone number, etc., can be added here */}
        </div>
    );
};

export default CharityDetails;
