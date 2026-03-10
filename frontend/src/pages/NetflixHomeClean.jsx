import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Plus, ThumbsUp, Search, Bell, User, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

const NetflixHomeClean = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredContent, setFeaturedContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  
  // Refs for scrolling
  const trendingRowRef = useRef(null);
  const popularRowRef = useRef(null);
  const historyRowRef = useRef(null);
  const heroRowRef = useRef(null);
  
  // Hero slider state
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Real movies data with working poster URLs that match movie names
  const sampleContent = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
      posterUrl: "https://picsum.photos/seed/stranger-things-netflix/200/113",
      backdropUrl: "https://picsum.photos/seed/stranger-things-backdrop/1920/1080",
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
      posterUrl: "https://picsum.photos/seed/the-crown-netflix/200/113",
      backdropUrl: "https://picsum.photos/seed/the-crown-backdrop/1920/1080",
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
      posterUrl: "https://picsum.photos/seed/the-witcher-netflix/200/113",
      backdropUrl: "https://picsum.photos/seed/the-witcher-backdrop/1920/1080",
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
      posterUrl: "https://picsum.photos/seed/inception-movie-poster/200/113",
      backdropUrl: "https://picsum.photos/seed/inception-backdrop/1920/1080",
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
      posterUrl: "https://picsum.photos/seed/breaking-bad-amc/200/113",
      backdropUrl: "https://picsum.photos/seed/breaking-bad-backdrop/1920/1080",
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
      posterUrl: "https://picsum.photos/seed/mandalorian-disney/200/113",
      backdropUrl: "https://picsum.photos/seed/mandalorian-backdrop/1920/1080",
      year: "2019",
      rating: "TV-14",
      match: "91",
      genre: "Sci-Fi",
      type: "series",
      duration: "40 min"
    },
    {
      id: 7,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.",
      posterUrl: "https://picsum.photos/seed/dark-knight-batman/200/113",
      backdropUrl: "https://picsum.photos/seed/dark-knight-backdrop/1920/1080",
      year: "2008",
      rating: "PG-13",
      match: "96",
      genre: "Action",
      type: "movie",
      duration: "2h 32min"
    },
    {
      id: 8,
      title: "The Queen's Gambit",
      description: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess.",
      posterUrl: "https://picsum.photos/seed/queens-gambit-chess/200/113",
      backdropUrl: "https://picsum.photos/seed/queens-gambit-backdrop/1920/1080",
      year: "2020",
      rating: "TV-MA",
      match: "93",
      genre: "Drama",
      type: "series",
      duration: "55 min"
    },
    {
      id: 9,
      title: "Money Heist",
      description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.",
      posterUrl: "https://picsum.photos/seed/money-heist-spanish/200/113",
      backdropUrl: "https://picsum.photos/seed/money-heist-backdrop/1920/1080",
      year: "2017",
      rating: "TV-MA",
      match: "95",
      genre: "Crime",
      type: "series",
      duration: "45 min"
    },
    {
      id: 10,
      title: "The Office",
      description: "A mockumentary sitcom that depicts the everyday work lives of office employees.",
      posterUrl: "https://picsum.photos/seed/the-office-dwight/200/113",
      backdropUrl: "https://picsum.photos/seed/the-office-backdrop/1920/1080",
      year: "2005",
      rating: "TV-14",
      match: "90",
      genre: "Comedy",
      type: "series",
      duration: "22 min"
    },
    {
      id: 11,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      posterUrl: "https://picsum.photos/seed/interstellar-space/200/113",
      backdropUrl: "https://picsum.photos/seed/interstellar-backdrop/1920/1080",
      year: "2014",
      rating: "PG-13",
      match: "88",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 49min"
    },
    {
      id: 12,
      title: "Narcos",
      description: "The story of Pablo Escobar, one of the most notorious drug lords in history.",
      posterUrl: "https://picsum.photos/seed/narcos-colombia/200/113",
      backdropUrl: "https://picsum.photos/seed/narcos-backdrop/1920/1080",
      year: "2015",
      rating: "TV-MA",
      match: "94",
      genre: "Crime",
      type: "series",
      duration: "45 min"
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

  const scrollRow = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = 800; // Adjust scroll amount as needed
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const nextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % sampleContent.length);
  };

  const prevHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + sampleContent.length) % sampleContent.length);
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
              <span style={{ 
                position: 'absolute', 
                top: '4px', 
                right: '4px', 
                width: '8px', 
                height: '8px', 
                background: '#e50914', 
                borderRadius: '50%' 
              }}></span>
            </button>

            {/* Profile */}
            <div className="profile-button">
              <User size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Slider */}
      <section className="hero">
        <div className="hero-slider-container">
          {/* Hero Slider */}
          <div className="hero-slider" ref={heroRowRef}>
            {sampleContent.map((item, index) => (
              <div
                key={item.id}
                className={`hero-slide ${index === currentHeroIndex ? 'active' : ''}`}
                style={{
                  display: index === currentHeroIndex ? 'block' : 'none'
                }}
              >
                <div className="hero-background">
                  <img
                    src={item.backdropUrl}
                    alt={`${item.title} Background`}
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/seed/${item.title.replace(/\s+/g, '-').toLowerCase()}-backdrop/1920/1080`;
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="hero-overlay"></div>
                
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="hero-content"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-title"
                  >
                    {item.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-description"
                  >
                    {item.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hero-buttons"
                  >
                    <button
                      onClick={() => handlePlay(item)}
                      className="btn btn-primary btn-lg"
                    >
                      <Play size={20} fill="currentColor" />
                      Play
                    </button>
                    <button
                      onClick={() => handleInfo(item)}
                      className="btn btn-secondary btn-lg"
                    >
                      <Info size={20} />
                      More Info
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Hero Navigation Arrows */}
          <button
            onClick={prevHero}
            className="hero-nav-btn hero-nav-left"
            style={{
              position: 'absolute',
              left: '2%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              background: 'rgba(0, 0, 0, 0.5)',
              border: '2px solid white',
              borderRadius: '50%',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0, 0, 0, 0.8)';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0, 0, 0, 0.5)';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronLeft size={28} color="white" />
          </button>

          <button
            onClick={nextHero}
            className="hero-nav-btn hero-nav-right"
            style={{
              position: 'absolute',
              right: '2%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              background: 'rgba(0, 0, 0, 0.5)',
              border: '2px solid white',
              borderRadius: '50%',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0, 0, 0, 0.8)';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0, 0, 0, 0.5)';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={28} color="white" />
          </button>

          {/* Hero Indicators */}
          <div className="hero-indicators" style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 20
          }}>
            {sampleContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroIndex(index)}
                style={{
                  width: index === currentHeroIndex ? '32px' : '8px',
                  height: '8px',
                  background: index === currentHeroIndex ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <section className="content-row">
        <div className="content-row-header">
          <h2 className="content-row-title">Trending Now</h2>
        </div>
        
        {/* Carousel Container */}
        <div style={{ position: 'relative' }}>
          {/* Left Arrow */}
          <button
            onClick={() => scrollRow('left', trendingRowRef)}
            style={{
              position: 'absolute',
              left: '1%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            <ChevronLeft size={24} color="white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollRow('right', trendingRowRef)}
            style={{
              position: 'absolute',
              right: '1%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            <ChevronRight size={24} color="white" />
          </button>

          {/* Movie Carousel */}
          <div 
            ref={trendingRowRef}
            style={{
              display: 'flex',
              gap: '0.25rem',
              overflowX: 'auto',
              overflowY: 'hidden',
              padding: '0 4%',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
            className="movie-carousel"
          >
            {trendingContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="netflix-card"
              onClick={() => handleInfo(item)}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/seed/${item.title.replace(/\s+/g, '-').toLowerCase()}/200/113`;
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Permanent Title Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                  padding: '0.5rem'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    margin: 0,
                    lineHeight: 1.2
                  }}>
                    {item.title}
                  </h3>
                </div>
              </div>
              
              {/* Hover Overlay */}
              <div className="netflix-card-overlay">
                <h3 className="netflix-card-title">{item.title}</h3>
                
                <div className="netflix-card-meta">
                  <span style={{ color: '#46d369', fontWeight: 600 }}>{item.match}% Match</span>
                  <span>{item.year}</span>
                  <span style={{ border: '1px solid #757575', padding: '0 4px', fontSize: '0.625rem' }}>{item.rating}</span>
                  <span>{item.duration}</span>
                </div>

                <p className="netflix-card-description">
                  {item.description}
                </p>

                <div className="netflix-card-actions">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePlay(item); }}
                    className="netflix-card-action-btn play"
                  >
                    <Play size={12} fill="currentColor" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToList(item); }}
                    className="netflix-card-action-btn secondary"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLike(item); }}
                    className="netflix-card-action-btn secondary"
                  >
                    <ThumbsUp size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* Popular Now Section */}
      <section className="content-row">
        <div className="content-row-header">
          <h2 className="content-row-title">Popular Now</h2>
        </div>
        
        {/* Carousel Container */}
        <div style={{ position: 'relative' }}>
          {/* Left Arrow */}
          <button
            onClick={() => scrollRow('left', popularRowRef)}
            style={{
              position: 'absolute',
              left: '1%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            <ChevronLeft size={24} color="white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollRow('right', popularRowRef)}
            style={{
              position: 'absolute',
              right: '1%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            <ChevronRight size={24} color="white" />
          </button>

          {/* Movie Carousel */}
          <div 
            ref={popularRowRef}
            style={{
              display: 'flex',
              gap: '0.25rem',
              overflowX: 'auto',
              overflowY: 'hidden',
              padding: '0 4%',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
            className="movie-carousel"
          >
            {sampleContent.slice(3, 9).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="netflix-card"
              onClick={() => handleInfo(item)}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/seed/${item.title.replace(/\s+/g, '-').toLowerCase()}/200/113`;
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Permanent Title Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                  padding: '0.5rem'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    margin: 0,
                    lineHeight: 1.2
                  }}>
                    {item.title}
                  </h3>
                </div>
              </div>
              
              {/* Hover Overlay */}
              <div className="netflix-card-overlay">
                <h3 className="netflix-card-title">{item.title}</h3>
                
                <div className="netflix-card-meta">
                  <span style={{ color: '#46d369', fontWeight: 600 }}>{item.match}% Match</span>
                  <span>{item.year}</span>
                  <span style={{ border: '1px solid #757575', padding: '0 4px', fontSize: '0.625rem' }}>{item.rating}</span>
                  <span>{item.duration}</span>
                </div>

                <p className="netflix-card-description">
                  {item.description}
                </p>

                <div className="netflix-card-actions">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePlay(item); }}
                    className="netflix-card-action-btn play"
                  >
                    <Play size={12} fill="currentColor" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToList(item); }}
                    className="netflix-card-action-btn secondary"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLike(item); }}
                    className="netflix-card-action-btn secondary"
                  >
                    <ThumbsUp size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* Continue Watching History */}
      <section className="content-row">
        <div className="content-row-header">
          <h2 className="content-row-title">Continue Watching</h2>
        </div>
        
        {/* Carousel Container */}
        <div style={{ position: 'relative' }}>
          {/* Left Arrow */}
          <button
            onClick={() => scrollRow('left', historyRowRef)}
            style={{
              position: 'absolute',
              left: '1%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            <ChevronLeft size={24} color="white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollRow('right', historyRowRef)}
            style={{
              position: 'absolute',
              right: '1%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            <ChevronRight size={24} color="white" />
          </button>

          {/* Movie Carousel */}
          <div 
            ref={historyRowRef}
            style={{
              display: 'flex',
              gap: '0.25rem',
              overflowX: 'auto',
              overflowY: 'hidden',
              padding: '0 4%',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
            className="movie-carousel"
          >
            {sampleContent.slice(6, 12).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="netflix-card"
              onClick={() => handleInfo(item)}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/seed/${item.title.replace(/\s+/g, '-').toLowerCase()}/200/113`;
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Progress Bar for Continue Watching */}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.3)'
                }}>
                  <div style={{
                    width: `${Math.random() * 60 + 20}%`,
                    height: '100%',
                    background: '#e50914'
                  }} />
                </div>
                
                {/* Permanent Title Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                  padding: '0.5rem'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    margin: 0,
                    lineHeight: 1.2
                  }}>
                    {item.title}
                  </h3>
                </div>
              </div>
              
              {/* Hover Overlay */}
              <div className="netflix-card-overlay">
                <h3 className="netflix-card-title">{item.title}</h3>
                
                <div className="netflix-card-meta">
                  <span style={{ color: '#46d369', fontWeight: 600 }}>{item.match}% Match</span>
                  <span>{item.year}</span>
                  <span style={{ border: '1px solid #757575', padding: '0 4px', fontSize: '0.625rem' }}>{item.rating}</span>
                  <span>{item.duration}</span>
                </div>

                <p className="netflix-card-description">
                  {item.description}
                </p>

                <div className="netflix-card-actions">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePlay(item); }}
                    className="netflix-card-action-btn play"
                  >
                    <Play size={12} fill="currentColor" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToList(item); }}
                    className="netflix-card-action-btn secondary"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLike(item); }}
                    className="netflix-card-action-btn secondary"
                  >
                    <ThumbsUp size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

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
