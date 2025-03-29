import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Doctorlogin.css';

import axios from 'axios';

function DoctorLogin() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/doctor/login', {
        email: loginData.email,
        password: loginData.password
      }, { withCredentials: true });

      console.log('Doctor Login Successful:', res.data);
      alert('Doctor Login Successful');
      navigate('/doctordashboard'); // Change this to the new path you want to navigate to

    } catch (err) {
      console.error('Doctor Login Error:', err);
      alert('Invalid Doctor Credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src="/logo.svg" alt="HaiDoc Logo" />
          <span>HaiDoc</span>
        </div>
        <h2>Welcome Doctor</h2>
        <p>Login to continue to your dashboard</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="signup-link">
          Only pre-registered doctors can login
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
