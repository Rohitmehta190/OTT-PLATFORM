import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Netflix Exact Pages
import NetflixHomeExact from './pages/NetflixHomeExact';
import NetflixWatch from './pages/NetflixWatch';
import NetflixAuth from './pages/NetflixAuth';

// Import Netflix Exact Styles
import './styles/netflix-exact.css';

function AppNetflixExact() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<NetflixHomeExact />} />
          <Route path="/auth" element={<NetflixAuth />} />
          <Route path="/watch/:id" element={<NetflixWatch />} />
          <Route path="*" element={<NetflixHomeExact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppNetflixExact;
