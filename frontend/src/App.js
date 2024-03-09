import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import statement

import BookingForm from './booking.js';
import Filter from './filter.js';
import View from './view.js';

import './App.css'; 
import Navigation from './component/Navigation.js';

function App() {
  return (
    <Router> {/* Wrap your Routes inside a Router */}
      <div className="App">
        <Navigation/>
        <h1 className='management'>Hotel Management</h1>
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
