const { Booking } = require('./model/booking');

// Function to check for overlapping time slots
const isTimeSlotAvailable = async (checkInTime, checkOutTime) => {
    const existingBookings = await Booking.find({
        $or: [
            { checkInTime: { $lt: checkOutTime }, checkOutTime: { $gt: checkInTime } }, // Check if new booking overlaps with existing bookings
            { checkInTime: { $gte: checkInTime, $lt: checkOutTime } }, // Check if new booking starts within existing booking
            { checkOutTime: { $gt: checkInTime, $lte: checkOutTime } } // Check if new booking ends within existing booking
        ]
    });

    return existingBookings.length === 0; // Return true if no overlapping bookings found, otherwise return false
};

// POST request to create a new booking
const createBooking = async (req, res) => {
    try {
        const { name, email, roomType, roomNumber, checkInTime, checkOutTime, price } = req.body;

        // Check if the time slot is available
        const isAvailable = await isTimeSlotAvailable(checkInTime, checkOutTime);
        if (!isAvailable) {
            // If the time slot is not available, send booking cancel response
            return res.status(400).json({ message: 'Booking cancel: Overlapping time slot' });
        }

        // If the time slot is available, create the booking
        const booking = new Booking({ name, email, roomType, roomNumber, checkInTime, checkOutTime, price });
        await booking.save();
        
        res.status(200).json(booking);
    } catch (err) {
        console.log('Error creating booking:', err);
        res.status(500).json({ error: 'Error creating booking' });
    }
};

// GET request to fetch all bookings
const getAllBookings = async (req, res) => {
    try {
        // Fetch all bookings from the database
        const bookings = await Booking.find();

        // Return the fetched bookings in the response
        res.status(200).json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ error: 'Error fetching bookings' });
    }
};

// DELETE request to delete a booking by ID
const deleteBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully', deletedBooking });
    } catch (err) {
        console.error('Error deleting booking:', err);
        res.status(500).json({ error: 'Error deleting booking' });
    }
};

module.exports = { createBooking, getAllBookings, deleteBookingById };
