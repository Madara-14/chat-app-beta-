import React from 'react';
import { useNavigate } from 'react-router-dom';
import './slash.css'; // Assuming this is your CSS file for Lash component
import Logo from './assets/logochat.webp'; // Import the logo image

function Lash() {
  const navigate = useNavigate();

  const RegisterPage = () => {
    navigate('/register');
  };

  const LoginPage = () => {
    navigate('/login');
  };

  return (
    <div className="lash-container">
      <div className="center-container">
        <img 
          src={Logo}
          alt="Chat Bubble"
          className="chat-image"
        />
        <h1>Welcome to the Chatty App</h1>
        <div className="button-container">
          <button className="styled-button" onClick={RegisterPage}>Register</button>
          <button className="styled-button" onClick={LoginPage}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Lash;
