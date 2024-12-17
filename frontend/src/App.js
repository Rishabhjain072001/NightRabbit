import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" exact element={<HomePage />} />
        </Route>
        <Route path="/login" exact element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
