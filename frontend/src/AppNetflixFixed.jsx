import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Netflix Fixed Pages
import NetflixHomeFixed from './pages/NetflixHomeFixed';
import NetflixWatch from './pages/NetflixWatch';
import NetflixAuth from './pages/NetflixAuth';

function AppNetflixFixed() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<NetflixHomeFixed />} />
          <Route path="/auth" element={<NetflixAuth />} />
          <Route path="/watch/:id" element={<NetflixWatch />} />
          <Route path="*" element={<NetflixHomeFixed />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppNetflixFixed;
