const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, deleteBookingById } = require('./controller');

// POST request to create a new booking
router.post('/booking', createBooking);

// GET request to fetch all bookings
router.get('/bookings', getAllBookings);

// DELETE request to delete a booking by ID
router.delete('/booking/:id', deleteBookingById); 

module.exports = router;
