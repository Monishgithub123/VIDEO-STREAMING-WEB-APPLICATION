require('dotenv').config();  // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const roomRoutes = require('./routes/roomRoutes');

app.use('/api/rooms', roomRoutes);


// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// WebSocket setup
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast signaling data to other clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
