// src/frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './frontend/components/NavBar';
import Home from './frontend/components/Home';


const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
