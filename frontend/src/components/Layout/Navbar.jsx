import React from 'react';
import { logoutUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      logoutUser();
      navigate('/login');
    } catch (err) {
      console.log('Invalid credentials');
    }
  };

  return (
    <div>
      <button onClick={() => handlelogout}>Logout</button>
    </div>
  );
};

export default Navbar;
