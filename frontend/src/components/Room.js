import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';

function Room() {
    const { id } = useParams();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    useEffect(() => {
        const startLocalStream = async () => {
            try {
                // Access the media devices (camera and microphone)
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                
                // Assign the stream to the local video element only if it's not already set
                if (localVideoRef.current && !localStream) {
                    setLocalStream(stream);
                    localVideoRef.current.srcObject = stream;
                }

                // WebRTC and WebSocket setup can be done here
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        // Start the local video stream
        startLocalStream();

        return () => {
            // Clean up WebRTC and WebSocket connections and stop all tracks when the component unmounts
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [id, localStream]);

    const toggleAudio = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
                setIsAudioEnabled(track.enabled);
            });
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
                setIsVideoEnabled(track.enabled);
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <header className="w-full p-4 bg-gray-800 shadow-md fixed top-0 left-0 z-50">
                <h1 className="text-3xl font-bold text-center">Video Streaming App</h1>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center mt-16 p-4">
                <h1 className="text-4xl font-bold mb-8 text-center">Room {id}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    <div className="relative w-full h-80 md:h-[calc(100vh-20rem)] border border-gray-700 rounded-lg overflow-hidden bg-gray-800 shadow-lg">
                        <video ref={localVideoRef} autoPlay muted className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute bottom-4 left-4 bg-gray-700 text-white text-sm p-2 rounded-md shadow-md">
                            Local Video
                        </div>
                    </div>
                    <div className="relative w-full h-80 md:h-[calc(100vh-20rem)] border border-gray-700 rounded-lg overflow-hidden bg-gray-800 shadow-lg">
                        <video ref={remoteVideoRef} autoPlay className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute bottom-4 left-4 bg-gray-700 text-white text-sm p-2 rounded-md shadow-md">
                            Remote Video
                        </div>
                    </div>
                </div>
            </main>
            <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-center space-x-4 shadow-lg">
                <button
                    onClick={toggleAudio}
                    className="text-white text-2xl p-2 rounded-md hover:bg-gray-600 transition-transform transform hover:scale-110"
                >
                    {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>
                <button
                    onClick={toggleVideo}
                    className="text-white text-2xl p-2 rounded-md hover:bg-gray-600 transition-transform transform hover:scale-110"
                >
                    {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                </button>
            </div>
            <footer className="w-full bg-gray-800 text-gray-400 text-center p-4 mt-4">
                <p className="text-sm">&copy; 2024 Video Streaming App. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Room;
