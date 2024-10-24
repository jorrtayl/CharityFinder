// src/frontend/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CharityDetails from './components/CharityDetails';
import CategoryPage from './components/CategoryPage';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/charity/:id" element={<CharityDetails />} />
                    <Route path="/category/:name" element={<CategoryPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
