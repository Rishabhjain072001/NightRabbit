import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import '../styles/Header.css';


const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = () => {
    console.log(query);
  };

  return (
    <header>
      <h1>NightRabbit</h1>
      <div className="search-container">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search videos..." />
        <button>Search</button>
      </div>
      <button className="logout-button" onClick={() => handleLogout()}>Logout</button>
    </header>
  );
};

export default Header;
