// src/frontend/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CharityDetail from './components/CharityDetail';
import CategoryPage from './components/CategoryPage';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/charity/:id" element={<CharityDetail />} />
                    <Route path="/category/:name" element={<CategoryPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
