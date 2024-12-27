import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

import '../styles/Header.css';
import { getSearchSuggestions } from '../api/searchSuggestionApi';

const Header = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const [localSearchquery, setLocalSearchquery] = useState(query); 
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef(null);  // Ref to track the search container
  const [isInputFocused, setIsInputFocused] = useState(false); // Track if the input is focused

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCategoriesClick = () => {
    navigate('/categories');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(localSearchquery);
    setSuggestions([]); 
    navigate(`/?query=${localSearchquery}`);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setLocalSearchquery(suggestion.title);
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
    if(query !== localSearchquery){
      fetchSuggestions();
    }
  }, [localSearchquery]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query') || '';
    setLocalSearchquery(queryParam);
    setQuery(queryParam);
  }, [location.search]);

  // Handle blur event to clear suggestions when focus is lost
  const handleBlur = (e) => {
    setTimeout(() => {
      if (!searchContainerRef.current.contains(document.activeElement)) {
        setSuggestions([]); // Clear suggestions if focus is outside
      }
    }, 100);
  };

  // Handle focus event to set the input as focused
  const handleFocus = () => {
    setIsInputFocused(true);
  };

  return (
    <header>
      <h1><Link to="/" className="header-link">NightRabbit</Link></h1>
      <div
        className="search-container"
        ref={searchContainerRef}
        onBlur={handleBlur} // Add the blur handler here
        onFocus={handleFocus} // Set focus state when the input is focused
      >
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={localSearchquery}
            onChange={(e) => setLocalSearchquery(e.target.value)}
            placeholder="Search videos..."
            onBlur={handleBlur} // Handle the blur event
            onFocus={handleFocus} // Handle the focus event
          />
          <button type="submit"><FaSearch /></button>
        </form>
        {localSearchquery && isInputFocused && (
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
                  onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking suggestion
                >
                  <span>{suggestion.title}</span>
                  <span>{suggestion.category_name}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="header-buttons">
        <button className="categories-button" onClick={handleCategoriesClick}>
          Categories
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
