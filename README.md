# Video Streaming App

A real-time video streaming application built using the MERN stack that supports one-on-one and group video calls. It utilizes WebRTC for video streaming and WebSocket for signaling. The app includes features such as room creation, room management, and a responsive user interface.

## Features

- **Real-Time Video Streaming:** Supports both one-on-one and group video calls.
- **WebRTC:** Enables video and audio communication in the browser.
- **WebSocket Signaling:** Ensures efficient signaling for real-time communication.
- **Room Management:** Create and join rooms dynamically.
- **Responsive UI:** Optimized for various screen sizes.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, WebSocket, WebRTC
- **Database:** MongoDB

## Screenshots

### Login Page
![Login Page](./screenshots/login-page.png)

### Room Page
![Room Page](./screenshots/room-page.png)

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-link
2.Navigate to the project directory:
cd video-streaming-app

3.Install server dependencies:
cd backend
npm install


4.Create a .env file in the backend directory with the following content:
MONGO_URI=mongodb://localhost:27017/video-streaming-app
PORT=5000

5.Start the backend server:
npm start

6.Install frontend dependencies:

cd ../frontend
npm install

7.Start the frontend development server:
npm start
8.Access the application at http://localhost:3000

Usage
Create Room: Enter your username and create a room.
Join Room: Share the room ID with others and join the room.
Toggle Audio/Video: Use the buttons to enable or disable your audio and video.
