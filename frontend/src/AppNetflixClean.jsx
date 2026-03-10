import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Netflix Clean Pages
import NetflixHomeClean from './pages/NetflixHomeClean';
import NetflixWatch from './pages/NetflixWatch';
import NetflixAuth from './pages/NetflixAuth';

// Import Netflix Clean Styles
import './styles/netflix-clean.css';

function AppNetflixClean() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<NetflixHomeClean />} />
          <Route path="/auth" element={<NetflixAuth />} />
          <Route path="/watch/:id" element={<NetflixWatch />} />
          <Route path="*" element={<NetflixHomeClean />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppNetflixClean;
