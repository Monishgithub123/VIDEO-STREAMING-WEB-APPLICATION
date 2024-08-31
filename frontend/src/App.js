import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Room from './components/Room';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/room/:id" element={<Room />} />
            </Routes>
        </Router>
    );
}

export default App;
