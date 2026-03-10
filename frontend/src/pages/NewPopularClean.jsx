import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, ThumbsUp, Info, Filter, Grid, List, TrendingUp, ArrowLeft, Calendar, Star } from 'lucide-react';

const NewPopularClean = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);

  // New & Popular content data
  const contentData = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      posterUrl: "https://picsum.photos/seed/stranger-things/200/113",
      backdropUrl: "https://picsum.photos/seed/stranger-things-bg/1920/1080",
      year: "2016",
      rating: "TV-14",
      match: "98",
      genre: "Sci-Fi",
      type: "series",
      seasons: "4 Seasons",
      episodes: "42 Episodes",
      duration: "45 min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-05-27",
      popularity: 9.8
    },
    {
      id: 2,
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
      posterUrl: "https://picsum.photos/seed/the-crown/200/113",
      backdropUrl: "https://picsum.photos/seed/the-crown-bg/1920/1080",
      year: "2016",
      rating: "TV-MA",
      match: "92",
      genre: "Drama",
      type: "series",
      seasons: "6 Seasons",
      episodes: "60 Episodes",
      duration: "50 min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-06-16",
      popularity: 9.2
    },
    {
      id: 3,
      title: "The Witcher",
      description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
      posterUrl: "https://picsum.photos/seed/witcher/200/113",
      backdropUrl: "https://picsum.photos/seed/witcher-bg/1920/1080",
      year: "2019",
      rating: "TV-MA",
      match: "89",
      genre: "Fantasy",
      type: "series",
      seasons: "3 Seasons",
      episodes: "24 Episodes",
      duration: "55 min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-07-05",
      popularity: 8.9
    },
    {
      id: 4,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterUrl: "https://picsum.photos/seed/inception/200/113",
      backdropUrl: "https://picsum.photos/seed/inception-bg/1920/1080",
      year: "2010",
      rating: "PG-13",
      match: "94",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 28min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-06-01",
      popularity: 9.4
    },
    {
      id: 5,
      title: "Breaking Bad",
      description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
      posterUrl: "https://picsum.photos/seed/breaking-bad/200/113",
      backdropUrl: "https://picsum.photos/seed/breaking-bad-bg/1920/1080",
      year: "2008",
      rating: "TV-MA",
      match: "97",
      genre: "Crime",
      type: "series",
      seasons: "5 Seasons",
      episodes: "62 Episodes",
      duration: "47 min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-05-15",
      popularity: 9.7
    },
    {
      id: 6,
      title: "The Mandalorian",
      description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
      posterUrl: "https://picsum.photos/seed/mandalorian/200/113",
      backdropUrl: "https://picsum.photos/seed/mandalorian-bg/1920/1080",
      year: "2019",
      rating: "TV-14",
      match: "91",
      genre: "Sci-Fi",
      type: "series",
      seasons: "3 Seasons",
      episodes: "24 Episodes",
      duration: "40 min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-03-18",
      popularity: 9.1
    },
    {
      id: 7,
      title: "The Queen's Gambit",
      description: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA.",
      posterUrl: "https://picsum.photos/seed/queens-gambit/200/113",
      backdropUrl: "https://picsum.photos/seed/queens-gambit-bg/1920/1080",
      year: "2020",
      rating: "TV-MA",
      match: "93",
      genre: "Drama",
      type: "series",
      seasons: "1 Season",
      episodes: "7 Episodes",
      duration: "55 min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-04-23",
      popularity: 9.3
    },
    {
      id: 8,
      title: "Money Heist",
      description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint.",
      posterUrl: "https://picsum.photos/seed/money-heist/200/113",
      backdropUrl: "https://picsum.photos/seed/money-heist-bg/1920/1080",
      year: "2017",
      rating: "TV-MA",
      match: "95",
      genre: "Crime",
      type: "series",
      seasons: "5 Seasons",
      episodes: "41 Episodes",
      duration: "45 min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-02-14",
      popularity: 9.5
    },
    {
      id: 9,
      title: "Dark",
      description: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
      posterUrl: "https://picsum.photos/seed/dark/200/113",
      backdropUrl: "https://picsum.photos/seed/dark-bg/1920/1080",
      year: "2017",
      rating: "TV-MA",
      match: "88",
      genre: "Mystery",
      type: "series",
      seasons: "3 Seasons",
      episodes: "26 Episodes",
      duration: "50 min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-01-10",
      popularity: 8.8
    },
    {
      id: 10,
      title: "Narcos",
      description: "The story of Pablo Escobar, one of the most notorious drug lords in history, and the DEA agents hunting him.",
      posterUrl: "https://picsum.photos/seed/narcos/200/113",
      backdropUrl: "https://picsum.photos/seed/narcos-bg/1920/1080",
      year: "2015",
      rating: "TV-MA",
      match: "94",
      genre: "Crime",
      type: "series",
      seasons: "3 Seasons",
      episodes: "30 Episodes",
      duration: "45 min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-03-01",
      popularity: 9.4
    },
    {
      id: 11,
      title: "The Office",
      description: "A mockumentary sitcom that depicts the everyday work lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.",
      posterUrl: "https://picsum.photos/seed/the-office/200/113",
      backdropUrl: "https://picsum.photos/seed/the-office-bg/1920/1080",
      year: "2005",
      rating: "TV-14",
      match: "90",
      genre: "Comedy",
      type: "series",
      seasons: "9 Seasons",
      episodes: "201 Episodes",
      duration: "22 min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-04-01",
      popularity: 9.0
    },
    {
      id: 12,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      posterUrl: "https://picsum.photos/seed/interstellar/200/113",
      backdropUrl: "https://picsum.photos/seed/interstellar-bg/1920/1080",
      year: "2014",
      rating: "PG-13",
      match: "88",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 49min",
      isNew: false,
      isTrending: true,
      releaseDate: "2024-05-20",
      popularity: 8.8
    }
  ];

  const categories = [
    { value: 'all', label: 'All Content' },
    { value: 'new', label: 'New Releases' },
    { value: 'trending', label: 'Trending Now' },
    { value: 'series', label: 'TV Series' },
    { value: 'movies', label: 'Movies' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' }
  ];

  const sortOptions = [
    { value: 'trending', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'release-date', label: 'Release Date' }
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
      setContent(contentData);
      setFilteredContent(contentData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...content];

    // Filter by category
    switch (selectedCategory) {
      case 'new':
        filtered = filtered.filter(item => item.isNew);
        break;
      case 'trending':
        filtered = filtered.filter(item => item.isTrending);
        break;
      case 'series':
        filtered = filtered.filter(item => item.type === 'series');
        break;
      case 'movies':
        filtered = filtered.filter(item => item.type === 'movie');
        break;
      case 'this-week':
        // Simulate filtering for this week's content
        filtered = filtered.slice(0, 6);
        break;
      case 'this-month':
        // Simulate filtering for this month's content
        filtered = filtered.slice(0, 10);
        break;
      default:
        break;
    }

    // Sort content
    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'newest':
        filtered.sort((a, b) => b.year.localeCompare(a.year));
        break;
      case 'rating':
        filtered.sort((a, b) => parseInt(b.match) - parseInt(a.match));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'release-date':
        filtered.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
        break;
      default:
        break;
    }

    setFilteredContent(filtered);
  }, [content, selectedCategory, sortBy]);

  const handlePlay = (item) => {
    console.log('Playing:', item.title);
    window.location.href = `/watch/${item.id}`;
  };

  const handleAddToList = (item) => {
    console.log('Adding to list:', item.title);
  };

  const handleLike = (item) => {
    console.log('Liking:', item.title);
  };

  const handleInfo = (item) => {
    console.log('Info for:', item.title);
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
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #333', 
            borderTop: '3px solid #e50914', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: 'white', fontSize: '1.125rem' }}>Loading New & Popular...</p>
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
              {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((item) => (
                <li key={item}>
                  <button 
                    className="nav-link"
                    style={{ 
                      fontWeight: item === 'New & Popular' ? 600 : 400,
                      textDecoration: item === 'New & Popular' ? 'underline' : 'none'
                    }}
                  >
                    {item}
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
                    <ArrowLeft size={16} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="icon-button"
                >
                  <Filter size={16} />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="icon-button">
              <Info size={16} />
            </button>

            {/* Profile */}
            <div className="profile-button">
              <TrendingUp size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section style={{ padding: '6rem 4% 2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <TrendingUp style={{ width: '48px', height: '48px', color: '#e50914' }} />
            <h1 style={{ fontSize: '3.5rem', fontWeight: 700, color: '#ffffff' }}>
              NEW & POPULAR
            </h1>
          </div>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', margin: '0 auto' }}>
            Discover the latest releases and trending content everyone's watching
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            {/* Category Filter */}
            <div style={{ position: 'relative' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  background: 'rgba(51, 51, 51, 0.8)',
                  border: '1px solid #333333',
                  borderRadius: '4px',
                  color: 'white',
                  padding: '0.5rem 2.5rem 0.5rem 1rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  appearance: 'none'
                }}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <Filter style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#757575', pointerEvents: 'none' }} />
            </div>

            {/* Sort Options */}
            <div style={{ position: 'relative' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'rgba(51, 51, 51, 0.8)',
                  border: '1px solid #333333',
                  borderRadius: '4px',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  appearance: 'none'
                }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#333333', borderRadius: '4px', padding: '0.25rem' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.5rem',
                borderRadius: '2px',
                border: 'none',
                background: viewMode === 'grid' ? '#e50914' : 'transparent',
                color: viewMode === 'grid' ? 'white' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '0.5rem',
                borderRadius: '2px',
                border: 'none',
                background: viewMode === 'list' ? '#e50914' : 'transparent',
                color: viewMode === 'list' ? 'white' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
          <span style={{ fontWeight: 600 }}>{filteredContent.length}</span> Items Found
        </div>

        {/* Content Grid/List */}
        {viewMode === 'grid' ? (
          <div className="content-row-scroll">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover"
                style={{
                  flex: '0 0 auto',
                  width: '200px',
                  height: '113px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundColor: '#181818'
                }}
                onClick={() => handleInfo(item)}
              >
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* New/Popular Badge */}
                {(item.isNew || item.isTrending) && (
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    left: '0.5rem',
                    background: item.isNew ? '#e50914' : '#46d369',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '2px',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    zIndex: 10
                  }}>
                    {item.isNew ? 'NEW' : 'TRENDING'}
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="card-overlay">
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', color: 'white' }}>
                    {item.title}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.75rem', color: 'white' }}>
                    <span style={{ color: '#46d369', fontWeight: 600 }}>{item.match}% Match</span>
                    <span>{item.year}</span>
                    <span style={{ border: '1px solid #757575', padding: '0 4px', fontSize: '0.625rem' }}>{item.rating}</span>
                    <span>{item.duration}</span>
                  </div>

                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: 'white', 
                    lineHeight: 1.3, 
                    marginBottom: '0.75rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePlay(item); }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'white',
                        color: 'black',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.75)'}
                      onMouseLeave={(e) => e.target.style.background = 'white'}
                    >
                      <Play size={12} fill="currentColor" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToList(item); }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid white',
                        background: 'rgba(109, 109, 110, 0.7)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.4)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.7)'}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleLike(item); }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid white',
                        background: 'rgba(109, 109, 110, 0.7)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.4)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.7)'}
                    >
                      <ThumbsUp size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '1.5rem',
                  background: '#181818',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#252525'}
                onMouseLeave={(e) => e.target.style.background = '#181818'}
                onClick={() => handleInfo(item)}
              >
                <div style={{ width: '120px', height: '68px', flexShrink: 0, overflow: 'hidden', borderRadius: '4px', position: 'relative' }}>
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* New/Popular Badge */}
                  {(item.isNew || item.isTrending) && (
                    <div style={{
                      position: 'absolute',
                      top: '0.25rem',
                      left: '0.25rem',
                      background: item.isNew ? '#e50914' : '#46d369',
                      color: 'white',
                      padding: '0.125rem 0.25rem',
                      borderRadius: '2px',
                      fontSize: '0.5rem',
                      fontWeight: 600
                    }}>
                      {item.isNew ? 'NEW' : 'TRENDING'}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
                        {item.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                        <span>{item.year}</span>
                        <span>•</span>
                        <span>{item.duration}</span>
                        <span>•</span>
                        <span style={{ color: '#46d369', fontWeight: 600 }}>{item.match}% Match</span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Star size={12} style={{ color: '#f1c40f' }} />
                          {item.popularity}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handlePlay(item); }}
                        style={{
                          background: 'white',
                          color: 'black',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.75)'}
                        onMouseLeave={(e) => e.target.style.background = 'white'}
                      >
                        <Play size={14} fill="currentColor" />
                        Play
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleInfo(item); }}
                        style={{
                          background: 'rgba(109, 109, 110, 0.7)',
                          color: 'white',
                          border: '1px solid white',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.4)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.7)'}
                      >
                        <Info size={14} />
                        Info
                      </button>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.4, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                    <span style={{ background: '#e50914', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '2px', fontSize: '0.75rem' }}>{item.genre}</span>
                    <span style={{ border: '1px solid #757575', padding: '0.25rem 0.5rem', borderRadius: '2px', fontSize: '0.75rem' }}>{item.rating}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      <Calendar size={12} />
                      {item.releaseDate}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{item.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
            © 2024 Streamflix. New & Popular Content.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewPopularClean;
