import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import '../styles/Header.css';


const Header = ({ query, onSearch }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState(query); 
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <header>
      <h1>NightRabbit</h1>
      <div>
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search videos..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <button className="logout-button" onClick={() => handleLogout()}>Logout</button>
    </header>
  );
};

export default Header;
