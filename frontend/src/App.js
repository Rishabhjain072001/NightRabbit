import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import VideoPage from './pages/VideoPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryVideosPage from './pages/CategoryVideosPage';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />}/>
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path="/category/:categoryId/videos" element={<CategoryVideosPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
