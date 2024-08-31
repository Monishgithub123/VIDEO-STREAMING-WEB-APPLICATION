const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const User = require('../models/User'); // Assuming you have a User model

// Validation function for room creation
const validateRoomCreation = (name) => {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return 'Room name is required and should be a non-empty string.';
    }
    return null;
};

// Create room
router.post('/create', async (req, res) => {
    const { name } = req.body;
    const validationError = validateRoomCreation(name);
    if (validationError) return res.status(400).json({ error: validationError });

    try {
        const room = new Room({ name });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ error: 'Failed to create room.' });
    }
});

// Join room
router.post('/join', async (req, res) => {
    const { roomId, userId } = req.body;

    try {
        // Check if room exists
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ error: 'Room not found' });

        // Optionally validate userId if needed
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Add user to room if not already present
        if (!room.users.includes(userId)) {
            room.users.push(userId);
            await room.save();
        }
        res.status(200).json(room);
    } catch (error) {
        console.error('Error joining room:', error);
        res.status(500).json({ error: 'Failed to join room.' });
    }
});

module.exports = router;
