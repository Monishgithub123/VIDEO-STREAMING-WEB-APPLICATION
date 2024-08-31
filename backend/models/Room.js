const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    isPrivate: { type: Boolean, default: false },
    password: { type: String },  // Use a library like bcrypt to hash passwords
});

module.exports = mongoose.model('Room', RoomSchema);
