// NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Not-Found.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <img
        src="/not-found image.png" 
        alt="404 Not Found"
        className="notfound-image"
      />
      <div className="notfound-actions">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={() => navigate('/')}>Go to Home Page</button>
      </div>
    </div>
  );
};

export default NotFound;
