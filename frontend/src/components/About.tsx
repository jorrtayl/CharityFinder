import React, { useState } from 'react';
import Header from './Header';
import jordanImage from '../images/team/jordan.png';
import zachImage from '../images/team/zach.png';
import danielImage from '../images/team/daniel.png';
import jaceImage from '../images/team/jace.png';
import mainTeamImage from '../images/team/main_team_image.png';

// Modal Component
const Modal: React.FC<{ member: any; onClose: () => void }> = ({ member, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg w-80 text-center relative">
            <img src={member.image} alt={member.name} className="w-48 h-48 rounded-full mx-auto mb-4 object-cover" />
            <h2 className="text-xl font-bold">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            <p className="mt-4">Email: <a href={`mailto:${member.email}`} className="text-blue-500">{member.email}</a></p>
            <p>GitHub: <a href={member.github} className="text-blue-500" target="_blank" rel="noopener noreferrer">{member.github}</a></p>
            <button onClick={onClose} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
        </div>
    </div>
);

const About: React.FC = () => {
    const [selectedMember, setSelectedMember] = useState<any>(null);

    const teamMembers = [
        {
            name: 'Jordan Taylor',
            role: 'Frontend Developer',
            image: jordanImage,
            description: 'Jordan is the frontend developer and team coordinator, ensuring the interface is easy to use and looks appealing.',
            email: 'jordanrtayl@gmail.com',
            github: 'https://github.com/jorrtayl'
        },
        {
            name: 'Zach Coomer',
            role: 'Database Developer',
            image: zachImage,
            description: 'Zach specializes in database management, storing valuable data efficiently.',
            email: 'zach@example.com',
            github: 'https://github.com/zach'
        },
        {
            name: 'Daniel Cunningham',
            role: 'Backend Developer',
            image: danielImage,
            description: 'Daniel works on the backend, syncing API calls with the frontend and integrating the database.',
            email: 'daniel@example.com',
            github: 'https://github.com/daniel'
        },
        {
            name: 'Jace Riley',
            role: 'Mobile App Developer',
            image: jaceImage,
            description: 'Jace is responsible for the mobile aspects of CharityFinder, including UX and design elements.',
            email: 'jace@example.com',
            github: 'https://github.com/jace'
        }
    ];

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            <Header />
            <h1 className="text-3xl font-bold mt-8">Meet the Team</h1>

            {/* Main larger image below the title */}
            <img src={mainTeamImage} alt="Our Team" className="w-3/4 max-w-2xl mt-6 mb-12 rounded-lg shadow-lg" />

            {teamMembers.map((member, index) => (
                <div
                    key={index}
                    className={`flex items-center my-8 cursor-pointer ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    onClick={() => setSelectedMember(member)}
                >
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-48 h-48 rounded-full mx-8 object-cover object-top blur-none"
                    />
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">{member.name}</h2>
                        <h3 className="text-lg text-gray-600">{member.role}</h3>
                        <p className="mt-4">{member.description}</p>
                    </div>
                </div>
            ))}

            {/* Modal */}
            {selectedMember && <Modal member={selectedMember} onClose={() => setSelectedMember(null)} />}

            <footer className="w-full bg-gray-800 text-white p-4 text-center mt-auto">
                <p>© 2024 CharityFinder</p>
            </footer>
        </div>
    );
};

export default About;
