import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios  from 'axios';
axios.defaults.baseURL="https://scaler-intership-frontend-backend.vercel.app";
axios.defaults.withCredentials=true;



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



