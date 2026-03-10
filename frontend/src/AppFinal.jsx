import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Final Professional Page
import FinalProfessional from './pages/FinalProfessional';

function AppFinal() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
        <Routes>
          <Route path="/" element={<FinalProfessional />} />
          <Route path="*" element={<FinalProfessional />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppFinal;
