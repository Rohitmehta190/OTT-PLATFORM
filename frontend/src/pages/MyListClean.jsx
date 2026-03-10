import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, ThumbsUp, Info, Filter, Grid, List, Heart, ArrowLeft, Trash2, Check } from 'lucide-react';

const MyListClean = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('date-added');
  const [myList, setMyList] = useState([]);
  const [filteredMyList, setFilteredMyList] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());

  // My List data
  const myListData = [
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
      dateAdded: "2024-01-15",
      watched: true,
      progress: 75
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
      dateAdded: "2024-02-20",
      watched: false,
      progress: 0
    },
    {
      id: 3,
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
      dateAdded: "2024-03-10",
      watched: true,
      progress: 100
    },
    {
      id: 4,
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
      dateAdded: "2024-01-25",
      watched: false,
      progress: 30
    },
    {
      id: 5,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterUrl: "https://picsum.photos/seed/dark-knight/200/113",
      backdropUrl: "https://picsum.photos/seed/dark-knight-bg/1920/1080",
      year: "2008",
      rating: "PG-13",
      match: "96",
      genre: "Action",
      type: "movie",
      duration: "2h 32min",
      dateAdded: "2024-04-05",
      watched: true,
      progress: 100
    },
    {
      id: 6,
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
      dateAdded: "2024-05-12",
      watched: false,
      progress: 15
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
      dateAdded: "2024-06-01",
      watched: true,
      progress: 100
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
      dateAdded: "2024-07-15",
      watched: false,
      progress: 45
    },
    {
      id: 9,
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
      dateAdded: "2024-08-20",
      watched: false,
      progress: 0
    },
    {
      id: 10,
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
      dateAdded: "2024-09-10",
      watched: true,
      progress: 60
    }
  ];

  const genres = [
    { value: 'all', label: 'All Genres' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Action', label: 'Action' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Horror', label: 'Horror' }
  ];

  const sortOptions = [
    { value: 'date-added', label: 'Date Added' },
    { value: 'title', label: 'Title' },
    { value: 'rating', label: 'Rating' },
    { value: 'year', label: 'Year' },
    { value: 'progress', label: 'Progress' }
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
      setMyList(myListData);
      setFilteredMyList(myListData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...myList];

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(item => item.genre === selectedGenre);
    }

    // Sort items
    switch (sortBy) {
      case 'date-added':
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        filtered.sort((a, b) => parseInt(b.match) - parseInt(a.match));
        break;
      case 'year':
        filtered.sort((a, b) => b.year.localeCompare(a.year));
        break;
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      default:
        break;
    }

    setFilteredMyList(filtered);
  }, [myList, selectedGenre, sortBy]);

  const handlePlay = (item) => {
    console.log('Playing:', item.title);
    window.location.href = `/watch/${item.id}`;
  };

  const handleRemoveFromList = (item) => {
    console.log('Removing from list:', item.title);
    setMyList(prev => prev.filter(i => i.id !== item.id));
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

  const handleSelectItem = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === filteredMyList.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredMyList.map(item => item.id)));
    }
  };

  const handleBulkRemove = () => {
    const itemsToRemove = Array.from(selectedItems);
    setMyList(prev => prev.filter(item => !selectedItems.has(item.id)));
    setSelectedItems(new Set());
    console.log('Removed items:', itemsToRemove);
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
          <p style={{ color: 'white', fontSize: '1.125rem' }}>Loading My List...</p>
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
        
        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: #e50914;
          transition: width 0.3s ease;
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
                      fontWeight: item === 'My List' ? 600 : 400,
                      textDecoration: item === 'My List' ? 'underline' : 'none'
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
                    placeholder="Search My List..."
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
              <Heart size={16} />
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
            <Heart style={{ width: '48px', height: '48px', color: '#e50914', fill: '#e50914' }} />
            <h1 style={{ fontSize: '3.5rem', fontWeight: 700, color: '#ffffff' }}>
              MY LIST
            </h1>
          </div>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', margin: '0 auto' }}>
            Your personal collection of movies and TV shows saved for later
          </p>
        </motion.div>

        {/* Bulk Actions */}
        {filteredMyList.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', padding: '1rem', background: '#181818', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="checkbox"
                checked={selectedItems.size === filteredMyList.length && filteredMyList.length > 0}
                onChange={handleSelectAll}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ color: 'white', fontSize: '0.875rem' }}>
                {selectedItems.size > 0 ? `${selectedItems.size} selected` : 'Select all'}
              </span>
              {selectedItems.size > 0 && (
                <button
                  onClick={handleBulkRemove}
                  style={{
                    background: '#e50914',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f40612'}
                  onMouseLeave={(e) => e.target.style.background = '#e50914'}
                >
                  <Trash2 size={14} />
                  Remove Selected
                </button>
              )}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
              {filteredMyList.length} items
            </div>
          </div>
        )}

        {/* Filters and Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            {/* Genre Filter */}
            <div style={{ position: 'relative' }}>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
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
                {genres.map(genre => (
                  <option key={genre.value} value={genre.value}>
                    {genre.label}
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

        {/* Content Grid/List */}
        {filteredMyList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <Heart style={{ width: '64px', height: '64px', color: '#757575', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Your list is empty</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '2rem' }}>
              Start adding movies and TV shows to your list to see them here
            </p>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                background: '#e50914',
                color: 'white',
                border: 'none',
                padding: '0.875rem 2rem',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f40612'}
              onMouseLeave={(e) => e.target.style.background = '#e50914'}
            >
              Browse Content
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="content-row-scroll">
            {filteredMyList.map((item, index) => (
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
                
                {/* Checkbox */}
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  left: '0.5rem',
                  background: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '2px',
                  padding: '0.25rem',
                  zIndex: 10
                }}>
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                  />
                </div>

                {/* Progress Indicator */}
                {item.progress > 0 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'rgba(0, 0, 0, 0.7)',
                    padding: '0.25rem',
                    zIndex: 10
                  }}>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Watched Badge */}
                {item.watched && (
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: '#46d369',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '2px',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <Check size={10} />
                    WATCHED
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
                      onClick={(e) => { e.stopPropagation(); handleRemoveFromList(item); }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid white',
                        background: 'rgba(229, 9, 20, 0.7)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(229, 9, 20, 0.9)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(229, 9, 20, 0.7)'}
                    >
                      <Trash2 size={12} />
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
            {filteredMyList.map((item, index) => (
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
                  
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: 'absolute',
                      top: '0.25rem',
                      left: '0.25rem',
                      width: '14px',
                      height: '14px',
                      cursor: 'pointer',
                      background: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: '2px',
                      padding: '0.25rem'
                    }}
                  />
                  
                  {/* Watched Badge */}
                  {item.watched && (
                    <div style={{
                      position: 'absolute',
                      top: '0.25rem',
                      right: '0.25rem',
                      background: '#46d369',
                      color: 'white',
                      padding: '0.125rem 0.25rem',
                      borderRadius: '2px',
                      fontSize: '0.5rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.125rem'
                    }}>
                      <Check size={8} />
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
                        <span>Added {item.dateAdded}</span>
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
                        onClick={(e) => { e.stopPropagation(); handleRemoveFromList(item); }}
                        style={{
                          background: 'rgba(229, 9, 20, 0.7)',
                          color: 'white',
                          border: '1px solid #e50914',
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
                        onMouseEnter={(e) => e.target.style.background = 'rgba(229, 9, 20, 0.9)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(229, 9, 20, 0.7)'}
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.4, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </p>
                  
                  {/* Progress Bar */}
                  {item.progress > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.25rem' }}>
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                    <span style={{ background: '#e50914', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '2px', fontSize: '0.75rem' }}>{item.genre}</span>
                    <span style={{ border: '1px solid #757575', padding: '0.25rem 0.5rem', borderRadius: '2px', fontSize: '0.75rem' }}>{item.rating}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{item.type}</span>
                    {item.watched && (
                      <span style={{ color: '#46d369', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Check size={12} />
                        Watched
                      </span>
                    )}
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
            © 2024 Streamflix. My List Collection.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyListClean;
