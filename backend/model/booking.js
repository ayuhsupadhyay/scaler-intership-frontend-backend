const mongoose = require('mongoose');

// Define schema for booking
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    roomType: { type: String, required: true },
    roomNumber: { type: Number, required: true },
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String, required: true },
    price: { type: Number, required: true }
});

// Create model from schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Booking };
