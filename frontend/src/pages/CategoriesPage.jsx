import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoriesPage.css';
import { fetchCategoriesByAlphabet } from '../api/categoryApi';

const alphabets = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState('#');
  const navigate = useNavigate();

  const fetchCategories = useCallback(async (letter) => {
    setSelectedLetter(letter);
    try {
        const response = await fetchCategoriesByAlphabet(letter);
        setCategories(response);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
    }
   }, [selectedLetter]);
  
  useEffect(() => {
    fetchCategories(selectedLetter)
  }, [selectedLetter]);
  

  const handleAlphabetClick = async (letter) => {
    setSelectedLetter(letter);
  };

  const handleCategoryClick = (id) => {
    navigate(`/category/${id}/videos`);
  };

  return (
    <div className="categories-page">
      <div className="alphabet-row">
        {alphabets.map((letter) => (
          <span
            key={letter}
            className={`alphabet ${selectedLetter === letter ? 'active' : ''}`}
            onClick={() => handleAlphabetClick(letter)}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="category-grid">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </div>
          ))
        ) : (
          <p className="no-category">Select an alphabet to view categories.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
