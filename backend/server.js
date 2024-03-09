const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect('mongodb+srv://AyushUpadhyay:f3YZ29WfCyKArnED@cluster0.zrlkuij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Database connection established');
    } catch (err) {
        console.error('Database connection error:', err);
    }
}
main().catch(err => console.log(err));

const cors = require('cors');
const corsOptions = {
    credentials: true,
    origin: ['https://scaler-intership-frontend-backend-rkas.vercel.app'],
}
app.use(cors(corsOptions));
const bookingRouter = require('./router.js');
app.use(bookingRouter); // Use booking router for all routes related to bookings

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
