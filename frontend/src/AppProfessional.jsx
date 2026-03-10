import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Professional Components
import ProfessionalHome from './pages/ProfessionalHomeFixed';
import ProfessionalNavbar from './components/Professional/ProfessionalNavbar';

// Styles
import './styles/professional.css';

function AppProfessional() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333333',
              color: '#ffffff',
              border: '1px solid #555555',
            },
            success: {
              iconTheme: {
                primary: '#46d369',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#e87c03',
                secondary: '#ffffff',
              },
            },
          }}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ProfessionalHome />} />
          <Route path="*" element={<ProfessionalHome />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppProfessional;
