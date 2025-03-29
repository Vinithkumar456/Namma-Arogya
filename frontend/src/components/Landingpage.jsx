import React from 'react';
import './Landingpage.css';
import { useNavigate } from 'react-router-dom';

function Landingpage() {
  const navigate = useNavigate(); // 🟢 Add this

  return (
    <div className="haidoc-landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
       
          <span>NammaArogya</span>
        </div>
        <div className="nav-links">
          
          <button className="login-btn" onClick={() => navigate('/login')}>
        Login
      </button>
          <button className="register-btn" onClick={() => navigate('/register')}>
            Register
          </button>
          <button onClick={() => navigate('/doctorlogin')} className="doctor-login-btn">
            Doctor Login
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Section */}
        <div className="content-left">
          <h1>We Are Ready to <span>Help Your Health Problems</span></h1>
          <p>
            In times like today, your health is very important,
            especially since the number of COVID-19 cases is
            increasing day by day, so we are ready to help you
            with your health consultation
          </p>
          <button className="consultation-btn">Register</button>

          {/* Stats */}
          
        </div>

        {/* Right Section */}
        <div className="content-right">
          <div className="image-container">
            <div className="doctors-placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
