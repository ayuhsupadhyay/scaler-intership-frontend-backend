import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./filter.css";

const YourComponent = () => {
  const [roomType, setRoomType] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = useCallback(async () => {
    try {
      let filteredResponse;
      // Check if both roomType and roomNumber are provided for filtering by room
      if (roomType && roomNumber) {
        filteredResponse = await axios.post('/bookings', {
          roomType,
          roomNumber
        });
      }
      
      else if (startTime && endTime) {
        filteredResponse = await axios.post('/bookings', {
          startTime,
          endTime
        });
      }
      
      else {
        filteredResponse = await axios.get('/bookings');
      }
      setFilteredData(filteredResponse.data);
    } catch (error) {
      console.error('Error filtering data:', error);
    }
  }, [roomType, roomNumber, startTime, endTime]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter, roomType, roomNumber, startTime, endTime]);

  return (
    <div className="container">
      <div className='container2'>
        <div className='container3'>
          <div className="filter1">
            <label>Room Type:</label>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option value="">Select Type</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="filter2">
            <label>Room Number:</label>
            <select value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)}>
              <option value="">Select Room</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="filter3">
            <label>Start Time:</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <label className='label2'>End Time:</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>

          <button className='btn' onClick={handleFilter}>Apply Filter</button>
        </div>
      </div>
      
      {/* Display filtered data */}
      <div className='container4'>
        <table className='table'>
          <thead>
            <tr>
              <th>User Details</th>
              <th>Room Details</th>
              <th>Check-In Date and Time</th>
              <th>Check-Out Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
              <tr key={data._id}>
                <td>{data.name} <br /> {data.email}</td>
                <td>{data.type} <br /> {data.roomNumber} <br /> {data.price}</td>
                <td>{data.startDate} <br />  {data.startTime}</td>
                <td>{data.endDate} <br /> {data.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YourComponent;
