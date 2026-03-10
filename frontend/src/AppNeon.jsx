import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Neon Pages
import NeonHome from './pages/NeonHome';
import TVShows from './pages/TVShows';
import Movies from './pages/Movies';
import NewPopular from './pages/NewPopular';
import MyList from './pages/MyList';
import WatchPage from './pages/WatchPage';

// Import Neon Styles
import './styles/neonProfessional.css';

function AppNeon() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<NeonHome />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/new-popular" element={<NewPopular />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="*" element={<NeonHome />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppNeon;
