import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaVideo } from 'react-icons/fa';

function Login() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/rooms/create', { name: username });
            navigate(`/room/${response.data._id}`);
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transition-transform transform hover:scale-105">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
                    <FaUser className="text-3xl mr-3 text-indigo-600" /> Login
                </h1>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full p-4 border border-gray-300 rounded-lg mb-6 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                />
                <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors transition-transform transform hover:scale-105"
                >
                    <FaVideo className="inline-block mr-2" /> Join Room
                </button>
            </div>
        </div>
    );
}

export default Login;
