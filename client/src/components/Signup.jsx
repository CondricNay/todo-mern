import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { name, email, password })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
    <h2 className="auth-heading">Register</h2>
    <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required className="auth-input" />
    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required className="auth-input" />
    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required className="auth-input" />
    <button type="submit" className="auth-button">Register</button>
  
    <p className="auth-link-text">
      Already have an account? <Link to="/login" className="auth-link">Login</Link>
    </p>
  </form>
  );
}

export default Signup;
