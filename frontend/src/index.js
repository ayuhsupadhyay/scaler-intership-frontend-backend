import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios  from 'axios';
axios.defaults.baseURL="https://vercel.com/ayuhsupadhyays-projects/scaler-intership-frontend-backend";
axios.defaults.withCredentials=true;



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



