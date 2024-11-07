import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [charities, setCharities] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8123/category/${name}`)
            .then(response => setCharities(response.data))
            .catch(error => console.error('Error fetching category data:', error));
    }, [name]);

    const handleSelectCharity = (id: string) => {
        navigate(`/charity/${id}`);
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-8">{name} Charities</h1>
            {charities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {charities.map((charity) => (
                        <div
                            key={charity.id}
                            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-300"
                            onClick={() => handleSelectCharity(charity.id)}
                        >
                            <h2 className="text-xl font-bold mb-2">{charity.name}</h2>
                            <p className="text-gray-600">{charity.description}</p>
                            <div className="mt-4">
                                <Link 
                                    to={`/charity/${charity.id}`} 
                                    className="text-blue-500 hover:underline"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No charities found for this category.</p>
            )}
        </div>
    );
};

export default CategoryPage;
