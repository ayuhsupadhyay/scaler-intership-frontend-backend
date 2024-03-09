import React, { useState, useEffect } from "react";
import axios from "axios";
import "./booking.css";

const roomData = {
  A: [101, 102],
  B: [201, 202, 203],
  C: [301, 302, 303, 304, 305],
};

const roomPricePerHour = {
  A: 100,
  B: 80,
  C: 50,
};

const BookingForm = () => {
  const [roomType, setRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [price, setPrice] = useState(0);
  const [bookingConfirm, setBookingConfirm] = useState(false);

  useEffect(() => {
    if (roomType && checkInTime && checkOutTime) {
      const totalMinutes = calculateTotalMinutes(checkInTime, checkOutTime);
      const totalPrice = (roomPricePerHour[roomType] / 60) * totalMinutes;
      setPrice(totalPrice);
    }
  }, [roomType, checkInTime, checkOutTime]);

  const calculateTotalMinutes = (checkIn, checkOut) => {
      const checkInHour = parseInt(checkIn.split(":")[0]);
      const checkInMinute = parseInt(checkIn.split(":")[1]);
      const checkOutHour = parseInt(checkOut.split(":")[0]);
      const checkOutMinute = parseInt(checkOut.split(":")[1]);
  
      let totalMinutes = (checkOutHour * 60 + checkOutMinute) - (checkInHour * 60 + checkInMinute);
      
      // If the total minutes is negative (check-out before check-in), set it to 0
      if (totalMinutes < 0) {
          totalMinutes = 0;
      }
  
      return totalMinutes;
  };

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
    setRoomNumber("");
  };

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };

  const handleBookNow = async () => {
    try {
      const response = await axios.post("/booking", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        roomType,
        roomNumber,
        checkInTime,
        checkOutTime,
        price,
      });
      console.log(response.data);
      setBookingConfirm(true);
    } catch (error) {
      console.error("Error booking room:", error);
      setBookingConfirm(false);
    }
  };

  return (
    <div className="booking-form">
      <h1 className="heading">Book a Room</h1>

      <div className="sections">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="room-type">Room Type:</label>
          <select
            id="room-type"
            name="room-type"
            value={roomType}
            onChange={handleRoomTypeChange}
            required
          >
            <option value="">Select Room Type</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <label htmlFor="room-number">Select Room:</label>
          <select
            id="room-number"
            name="room-number"
            value={roomNumber}
            onChange={handleRoomNumberChange}
            disabled={!roomType}
            required
          >
            <option value="">-</option>
            {roomType &&
              roomData[roomType].map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
          </select>
        </div>
        <div className="check-in-time">
          <label htmlFor="check-in-time">Check-In Time:</label>
          <input
            type="time"
            id="check-in-time"
            name="check-in-time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="check-out-time">Check-Out Time:</label>
          <input
            type="time"
            id="check-out-time"
            name="check-out-time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price-for-room">Price:</label>
          <input
            type="text"
            id="price-for-room"
            name="price-for-room"
            value={price.toFixed(2)}
            readOnly
          />
        </div>
      </div>
      <div>
        <button type="button" onClick={handleBookNow}>
          Book Now
        </button>

        <p>{bookingConfirm ? "Booking confirmed" : "Booking not confirmed"}</p>
      </div>
    </div>
  );
};

export default BookingForm;
