import React, { useState } from 'react';
import { logoutUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

import '../styles/Header.css';


const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');


  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      logoutUser();
      navigate('/login');
    } catch (err) {
      console.log('Invalid credentials');
    }
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
    </header>
  );
};

export default Header;
