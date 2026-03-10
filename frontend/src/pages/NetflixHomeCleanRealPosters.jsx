import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Plus, ThumbsUp, Search, Bell, User, Menu, X } from 'lucide-react';

const NetflixHomeClean = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredContent, setFeaturedContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);

  // Sample content data with real HD movie posters
  const sampleContent = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
      posterUrl: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7XEYeprN00x7jrBfsI.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7L.jpg",
      year: "2016",
      rating: "TV-14",
      match: "98",
      genre: "Sci-Fi",
      type: "series",
      duration: "45 min"
    },
    {
      id: 2,
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign.",
      posterUrl: "https://image.tmdb.org/t/p/w500/7TcE14S1tR2oX3ZC2s2n3k2o2fA.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/original/3j2P1pJw0n7sYq1Zc2s2n3k2o2fA.jpg",
      year: "2016",
      rating: "TV-MA",
      match: "92",
      genre: "Drama",
      type: "series",
      duration: "50 min"
    },
    {
      id: 3,
      title: "The Witcher",
      description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny.",
      posterUrl: "https://image.tmdb.org/t/p/w500/5E3s8wH5nCvX5U5K3n2o2fA.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/original/7TcE14S1tR2oX3ZC2s2n3k2o2fA.jpg",
      year: "2019",
      rating: "TV-MA",
      match: "89",
      genre: "Fantasy",
      type: "series",
      duration: "55 min"
    },
    {
      id: 4,
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology.",
      posterUrl: "https://image.tmdb.org/t/p/w500/8IB2e4r4o5lP2Zc2s2n3k2o2fA.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/original/3j2P1pJw0n7sYq1Zc2s2n3k2o2fA.jpg",
      year: "2010",
      rating: "PG-13",
      match: "94",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 28min"
    },
    {
      id: 5,
      title: "Breaking Bad",
      description: "A high school chemistry teacher turns to manufacturing methamphetamine.",
      posterUrl: "https://image.tmdb.org/t/p/w500/3j2P1pJw0n7sYq1Zc2s2n3k2o2fA.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/original/8IB2e4r4o5lP2Zc2s2n3k2o2fA.jpg",
      year: "2008",
      rating: "TV-MA",
      match: "97",
      genre: "Crime",
      type: "series",
      duration: "47 min"
    },
    {
      id: 6,
      title: "The Mandalorian",
      description: "The travels of a lone bounty hunter in the outer reaches of the galaxy.",
      posterUrl: "https://image.tmdb.org/t/p/w500/7TcE14S1tR2oX3ZC2s2n3k2o2fA.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/original/5E3s8wH5nCvX5U5K3n2o2fA.jpg",
      year: "2019",
      rating: "TV-14",
      match: "91",
      genre: "Sci-Fi",
      type: "series",
      duration: "40 min"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFeaturedContent(sampleContent.slice(0, 1));
      setTrendingContent(sampleContent);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePlay = (item) => {
    console.log('Playing:', item.title);
    window.location.href = `/watch/${item.id}`;
  };

  const handleInfo = (item) => {
    console.log('Info for:', item.title);
  };

  const handleAddToList = (item) => {
    console.log('Added to list:', item.title);
  };

  const handleLike = (item) => {
    console.log('Liked:', item.title);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#141414', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p style={{ color: 'white', fontSize: '1.125rem' }}>Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #333;
          border-top: 3px solid #e50914;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .card-hover:hover {
          transform: scale(1.3);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
          z-index: 100;
          transition: all 0.3s ease;
        }
        
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 70%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
        }
        
        .card-hover:hover .card-overlay {
          opacity: 1;
        }
        
        .content-row-scroll {
          display: flex;
          gap: 0.25rem;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0 4%;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .content-row-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: background-color 0.3s ease;
        }
        
        .navbar.scrolled {
          background-color: rgba(20, 20, 20, 0.95);
          backdrop-filter: blur(10px);
        }
        
        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 4%;
        }
        
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 3rem;
        }
        
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.5rem;
          color: #e50914;
          cursor: pointer;
        }
        
        .logo {
          width: 32px;
          height: 32px;
          background: #e50914;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
        }
        
        .navbar-nav {
          display: flex;
          list-style: none;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
        }
        
        .nav-link {
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .nav-link:hover {
          color: #b3b3b3;
        }
        
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .search-container {
          position: relative;
        }
        
        .search-input {
          background: rgba(51, 51, 51, 0.8);
          border: 1px solid #333333;
          border-radius: 4px;
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          width: 200px;
        }
        
        .icon-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        
        .icon-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .profile-button {
          width: 32px;
          height: 32px;
          background: #e50914;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
        }
        
        .hero {
          position: relative;
          height: 85vh;
          min-height: 600px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
        }
        
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          padding: 0 4% 6rem;
          max-width: 600px;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          line-height: 1.1;
        }
        
        .hero-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
          line-height: 1.4;
        }
        
        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: white;
          color: black;
        }
        
        .btn-primary:hover {
          background: rgba(255, 255, 255, 0.75);
        }
        
        .btn-secondary {
          background: rgba(109, 109, 110, 0.7);
          color: white;
          border: 1px solid white;
        }
        
        .btn-secondary:hover {
          background: rgba(109, 109, 110, 0.4);
        }
        
        .content-section {
          padding: 3rem 0;
        }
        
        .section-header {
          padding: 0 4%;
          margin-bottom: 1.5rem;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin: 0;
        }
        
        .content-card {
          flex: 0 0 auto;
          width: 200px;
          height: 113px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          background: #181818;
        }
        
        .content-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .content-title {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: white;
        }
        
        .content-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.75rem;
          color: white;
        }
        
        .match-score {
          color: #46d369;
          font-weight: 600;
        }
        
        .content-description {
          font-size: 0.75rem;
          color: white;
          line-height: 1.3;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .content-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .action-btn-play {
          background: white;
          color: black;
        }
        
        .action-btn-play:hover {
          background: rgba(255, 255, 255, 0.75);
        }
        
        .action-btn-secondary {
          background: rgba(109, 109, 110, 0.7);
          color: white;
          border: 1px solid white;
        }
        
        .action-btn-secondary:hover {
          background: rgba(109, 109, 110, 0.4);
        }
        
        .footer {
          background: #141414;
          color: white;
          padding: 3rem 4% 2rem;
          border-top: 8px solid #e50914;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .footer-section h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #b3b3b3;
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .footer-link {
          color: #b3b3b3;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }
        
        .footer-link:hover {
          color: white;
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid #333;
        }
        
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: #e50914;
        }
        
        .footer-copyright {
          color: #b3b3b3;
          font-size: 0.875rem;
        }
        
        @media (max-width: 768px) {
          .navbar-nav {
            display: none;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1rem;
          }
          
          .content-row-scroll {
            padding: 0 2%;
          }
          
          .footer-content {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-content">
          <div className="navbar-left">
            {/* Logo */}
            <div 
              className="navbar-brand"
              onClick={() => window.location.href = '/'}
            >
              <div className="logo">S</div>
              STREAMFLIX
            </div>

            {/* Navigation Links */}
            <ul className="navbar-nav">
              {[
                { name: 'Home', path: '/' },
                { name: 'TV Shows', path: '/tv-shows' },
                { name: 'Movies', path: '/movies' },
                { name: 'New & Popular', path: '/new-popular' },
                { name: 'My List', path: '/my-list' }
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    className="nav-link"
                    onClick={() => window.location.href = item.path}
                    style={{ 
                      fontWeight: item.name === 'Home' ? 600 : 400,
                      textDecoration: item.name === 'Home' ? 'underline' : 'none'
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className="navbar-right">
            {/* Search */}
            <div className="search-container">
              {isSearchOpen ? (
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles..."
                    className="search-input"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="icon-button"
                  >
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="icon-button"
                >
                  <Search size={16} />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="icon-button">
              <Bell size={16} />
            </button>

            {/* Profile */}
            <div className="profile-button">
              <User size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${featuredContent[0]?.backdropUrl})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            {featuredContent[0]?.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-description"
          >
            {featuredContent[0]?.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-buttons"
          >
            <button
              onClick={() => handlePlay(featuredContent[0])}
              className="btn btn-primary"
            >
              <Play size={16} fill="currentColor" />
              Play
            </button>
            <button
              onClick={() => handleInfo(featuredContent[0])}
              className="btn btn-secondary"
            >
              <Info size={16} />
              More Info
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>
        </div>
        <div className="content-row-scroll">
          {trendingContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="content-card card-hover"
              onClick={() => handleInfo(item)}
            >
              <img
                src={item.posterUrl}
                alt={item.title}
                onError={(e) => {
                  e.target.src = 'https://picsum.photos/seed/' + item.title.replace(/\s+/g, '-').toLowerCase() + '/200/113';
                }}
              />
              
              {/* Hover Overlay */}
              <div className="card-overlay">
                <h3 className="content-title">{item.title}</h3>
                
                <div className="content-info">
                  <span className="match-score">{item.match}% Match</span>
                  <span>{item.year}</span>
                  <span style={{ border: '1px solid #757575', padding: '0 4px', fontSize: '0.625rem' }}>{item.rating}</span>
                  <span>{item.duration}</span>
                </div>

                <p className="content-description">
                  {item.description}
                </p>

                <div className="content-actions">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePlay(item); }}
                    className="action-btn action-btn-play"
                  >
                    <Play size={12} fill="currentColor" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToList(item); }}
                    className="action-btn action-btn-secondary"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLike(item); }}
                    className="action-btn action-btn-secondary"
                  >
                    <ThumbsUp size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Press</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>View</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Website</a>
              <a href="#" className="footer-link">Mobile App</a>
              <a href="#" className="footer-link">Smart TV</a>
              <a href="#" className="footer-link">Tablet</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Terms of Use</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Cookie Policy</a>
              <a href="#" className="footer-link">Copyright</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Social</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Twitter</a>
              <a href="#" className="footer-link">Instagram</a>
              <a href="#" className="footer-link">Facebook</a>
              <a href="#" className="footer-link">YouTube</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-brand">
            <div className="logo">S</div>
            STREAMFLIX
          </div>
          <div className="footer-copyright">
            © 2024 Streamflix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NetflixHomeClean;
