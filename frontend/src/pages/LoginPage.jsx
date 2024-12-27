import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';


const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/'); 
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        {error && <p className='login-error'>{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
