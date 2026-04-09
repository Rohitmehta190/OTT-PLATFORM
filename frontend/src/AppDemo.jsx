import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Components
import Background from './components/ui/Background';
import Navbar from './components/NavbarNew';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/HomeNew';
import Browse from './pages/Browse';
import Watch from './pages/Watch';
import Auth from './pages/Auth';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';

// Store
import { useAuthStore } from './store/authStore';

// Styles
import './styles/globals.css';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        {/* Background */}
        <Background />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(26, 15, 31, 0.9)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: {
                primary: '#39ff14',
                secondary: '#0a0e27',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff006e',
                secondary: '#0a0e27',
              },
            },
          }}
        />

        {/* Main App */}
        <div className="relative z-10">
          {/* Navbar - Only show on authenticated pages */}
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/watch/:id" element={<Watch />} />
                    
                    {/* Protected Routes */}
                    <Route path="/watchlist" element={
                      <ProtectedRoute>
                        <Watchlist />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
