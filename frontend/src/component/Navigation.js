import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css'; // Import the CSS file

const Navigation = () => {
  return (
    
    <ul className="navigation">
      
      <li>
        <Link to="/">Booking Room</Link>
      </li>
      <li>
        <NavLink to="/filter">Filter</NavLink>
      </li>
      <li>
        <NavLink to="/view">View Bookings</NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
