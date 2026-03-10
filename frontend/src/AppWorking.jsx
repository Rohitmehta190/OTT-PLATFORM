import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Working Professional Page
import SimpleProfessional from './pages/SimpleProfessional';

function AppWorking() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
        <Routes>
          <Route path="/" element={<SimpleProfessional />} />
          <Route path="*" element={<SimpleProfessional />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppWorking;
