const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['A', 'B', 'C'], // Room types: A, B, C
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // Add other properties as needed
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
