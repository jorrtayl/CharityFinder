// src/frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD:frontend/src/App.tsx
import NavBar from './components/NavBar';
import Home from './components/Home';
=======
import Home from './frontend/components/Home';
>>>>>>> master:charityfinder/src/App.tsx

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
