import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Header from './components/Header';  // Use the shared header component

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen overflow-y-scroll"> {/* Force scrollbar to always appear */}
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
