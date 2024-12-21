import React, { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  const location = useLocation();
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('query') || '');

  const shouldShowHeader = location.pathname !== '/login';

  return (
    <div className="layout">
      {shouldShowHeader && <Header query={query} setQuery={setQuery} />}
      {/* Render the child route components here */}
      <div className="main-content">
        <Outlet context={{ query, setQuery }}/>
      </div>
    </div>
  );
};

export default Layout;
