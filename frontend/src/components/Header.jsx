import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

import '../styles/Header.css';
import { getSearchSuggestions } from '../api/searchSuggestionApi';

const Header = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [localSearchquery, setLocalSearchquery] = useState(query); 
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(localSearchquery);
    setSuggestions([]); 
    navigate(`/?query=${localSearchquery}`);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setLocalSearchquery(suggestion.title)
    setSuggestions([]);
    navigate(`/?query=${suggestion.title}`);
  };

  const fetchSuggestions = useCallback(async () => {
    if (localSearchquery.length > 0) {
      setLoading(true);
      try {
        const response = await getSearchSuggestions({ localSearchquery });
        setSuggestions(response); 
        setLoading(false);
      } catch {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, [localSearchquery]);
  
  useEffect(() => {
    if(query != localSearchquery){
    fetchSuggestions()
    }
  }, [localSearchquery]);

  return (
    <header>
      <h1>NightRabbit</h1>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={localSearchquery}
            onChange={(e) => setLocalSearchquery(e.target.value)}
            placeholder="Search videos..."
          />
          <button type="submit"><FaSearch /></button>
        </form>
        {localSearchquery && (
          <div className="suggestions-list">
            {loading ? (
              <div className='suggestion-item'>
                <span>Loading...</span>
              </div>
            ) : (
              suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span>{suggestion.title}</span>
                  <span>{suggestion.category_name}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <button className="logout-button" onClick={() => handleLogout()}>Logout</button>
    </header>
  );
};

export default Header;
