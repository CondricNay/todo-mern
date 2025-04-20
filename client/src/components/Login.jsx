import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        if (result.data.status === "Success") {
          localStorage.setItem("userId", result.data.userId);
          navigate('/');
        } else {
          alert("Invalid credentials");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
    <h2 className="auth-heading">Login</h2>
    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required className="auth-input" />
    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required className="auth-input" />
    <button type="submit" className="auth-button">Login</button>
  
    <p className="auth-link-text">
      Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
    </p>
  </form>
  );
}

export default Login;
