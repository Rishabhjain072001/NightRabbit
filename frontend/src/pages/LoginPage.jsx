import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Eye icons

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ email, password }, (shouldLogin) => {
        if (shouldLogin) {
          navigate('/');
        } else {
          setShowConfirmation(true);
        }
      });
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmLogin = async () => {
    setConfirmLoading(true);

    try {
      await login({ email, password, confirm: true }, (shouldLogin) => {
        if (shouldLogin) {
          navigate('/');
        }
      });
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong!');
    } finally {
      setConfirmLoading(false);
      setShowConfirmation(false);
    }
  };

  const handleCancelLogin = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <img src="/logo.jpeg" alt="Website Logo" className="login-logo" /> {/* Logo */}

        {/* <h2 className="login-title">Login</h2> */}
        {error && <p className="login-error">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? <span className="button-spinner"></span> : 'Login'}
        </button>

        <div className="additional-links">
          <a href="https://get-login-creds.example.com" target="_blank" rel="noopener noreferrer">
            Get Login Credentials
          </a>
          <a href="https://t.me/yourtelegramchannel" target="_blank" rel="noopener noreferrer">
            Join our Telegram Channel
          </a>
        </div>
      </form>

      {showConfirmation && (
        <>
          <div className="popup-backdrop"></div>
          <div className="confirmation-popup">
            <p>
              You are already logged in from another device. If you continue, you will be logged out from that device.
            </p>
            <button onClick={handleConfirmLogin} disabled={confirmLoading}>
              {confirmLoading ? <span className="button-spinner"></span> : 'Continue'}
            </button>
            <button onClick={handleCancelLogin} disabled={confirmLoading}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
