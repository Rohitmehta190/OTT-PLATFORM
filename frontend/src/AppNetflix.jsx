import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Netflix Pages
import NetflixHome from './pages/NetflixHome';
import NetflixAuth from './pages/NetflixAuth';
import NetflixWatch from './pages/NetflixWatch';

// Import Netflix Styles
import './styles/netflix.css';

function AppNetflix() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<NetflixHome />} />
          <Route path="/auth" element={<NetflixAuth />} />
          <Route path="/watch/:id" element={<NetflixWatch />} />
          <Route path="*" element={<NetflixHome />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppNetflix;
