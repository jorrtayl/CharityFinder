// src/frontend/components/About.tsx
import React from 'react';
import Header from './Header'; // Ensure this path is correct
import jordanImage from '../images/team/jordan.png';
import zachImage from '../images/team/zach.png';
import danielImage from '../images/team/daniel.png';
import jaceImage from '../images/team/jace.png';

const About: React.FC = () => {
    const teamMembers = [
        {
            name: 'Jordan Taylor',
            role: 'Frontend Developer',
            image: jordanImage,
            description: 'Jordan is the lead developer for CharityFinder, overseeing the project’s vision and direction.'
        },
        {
            name: 'Zach Coomer',
            role: 'Database Developer',
            image: zachImage,
            description: 'Zach specializes in backend development, ensuring smooth integration of APIs and databases.'
        },
        {
            name: 'Daniel Cunningham',
            role: 'Backend Developer',
            image: danielImage,
            description: 'Daniel works on frontend UI, ensuring a user-friendly interface and responsive design.'
        },
        {
            name: 'Jace Riley',
            role: 'Mobile App Developer',
            image: jaceImage,
            description: 'Jace is responsible for mobile aspects of CharityFinder, including UX and design elements.'
        }
    ];

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            <Header />

            <h1 className="text-3xl font-bold mt-8">Meet the Team</h1>

            {teamMembers.map((member, index) => (
                <div className={`flex items-center my-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} key={index}>
                    <img src={member.image} alt={member.name} className="w-48 h-48 rounded-full mx-8" />
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">{member.name}</h2>
                        <h3 className="text-lg text-gray-600">{member.role}</h3>
                        <p className="mt-4">{member.description}</p>
                    </div>
                </div>
            ))}

            <footer className="w-full bg-gray-800 text-white p-4 text-center mt-auto">
                <p>© 2024 CharityFinder</p>
            </footer>
        </div>
    );
};

export default About;
