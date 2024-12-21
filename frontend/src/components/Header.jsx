import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import '../styles/Header.css';

const Header = ({query, setQuery}) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [localSearchquery, setlocalSearchquery] = useState(query); 
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(localSearchquery)
    navigate(`/?query=${localSearchquery}`);
  };

  return (
    <header>
      <h1>NightRabbit</h1>
      <div>
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            value={localSearchquery}
            onChange={(e) => setlocalSearchquery(e.target.value)}
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
