import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSearch } from 'react-icons/fa'; 

import '../styles/Header.css';
import { getSearchSuggestions } from '../api/searchSuggestionApi';

const Header = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const [localSearchquery, setLocalSearchquery] = useState(query); 
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef(null);  
  const [isInputFocused, setIsInputFocused] = useState(false); 
  const [highlightedIndex, setHighlightedIndex] = useState(0); // Track the highlighted index

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
        setHighlightedIndex(0); // Reset highlighted index on suggestion update
      } catch {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, [localSearchquery]);

  useEffect(() => {
    if (query !== localSearchquery) {
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
        setSuggestions([]); 
      }
    }, 100);
  };

  // Handle focus event to set the input as focused
  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleKeyDown = (e) => {
    if (suggestions.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
          break;
        case 'ArrowUp':
          setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          break;
        case 'Enter':
          handleSuggestionClick(suggestions[highlightedIndex]);
          break;
        default:
          break;
      }
    }
  };

  return (
    <header>
      <h1>
        <Link to="/" className="header-link">
          <img src="/rabbit-logo-light.jpeg" alt="Rabbit Logo" className="logo-image" />
          <img src="/text-image.jpeg" alt="Night Rabbit" className="text-image" />
        </Link>
      </h1>
      <div
        className="search-container"
        ref={searchContainerRef}
        onBlur={handleBlur} 
        onFocus={handleFocus} 
      >
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={localSearchquery}
            onChange={(e) => setLocalSearchquery(e.target.value)}
            placeholder="Search videos..."
            onBlur={handleBlur} 
            onFocus={handleFocus}
            onKeyDown={handleKeyDown} // Handle keyboard navigation
          />
          <button type="submit"><FaSearch /></button>
        </form>
        {localSearchquery && isInputFocused && suggestions.length > 0 && (
          <div className="suggestions-list">
            {loading ? (
              <div className='suggestion-item'>
                <span>Loading...</span>
              </div>
            ) : (
              suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  className={`suggestion-item ${index === highlightedIndex ? 'highlighted' : ''}`} // Apply highlighted class
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseDown={(e) => e.preventDefault()} 
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
