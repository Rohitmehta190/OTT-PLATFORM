import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Debug Professional Page
import DebugProfessional from './pages/DebugProfessional';

function AppDebug() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
        <Routes>
          <Route path="/" element={<DebugProfessional />} />
          <Route path="*" element={<DebugProfessional />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppDebug;
