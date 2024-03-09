import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './view.css'; 

const View = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch all bookings when the component mounts
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const handleDeleteBooking = async (id) => {
    try {
      
      await axios.delete(`/bookings/${id}`);
      console.log(id);
      
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="view-container">
      <h1 className="view-heading">View Bookings</h1>
      <br/>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Room Type</th>
            <th>Room Number</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="white-text">
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.roomType}</td>
              <td>{booking.roomNumber}</td>
              <td>{booking.checkInTime}</td>
              <td>{booking.checkOutTime}</td>
              <td>
                <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default View;
