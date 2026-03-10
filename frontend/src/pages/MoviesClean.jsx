import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, ThumbsUp, Info, Filter, Grid, List, Film, ArrowLeft } from 'lucide-react';

const MoviesClean = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Movies data
  const moviesData = [
    {
      id: 1,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterUrl: "https://picsum.photos/seed/inception/200/113",
      backdropUrl: "https://picsum.photos/seed/inception-bg/1920/1080",
      year: "2010",
      rating: "PG-13",
      match: "94",
      genre: "Sci-Fi",
      duration: "2h 28min",
      director: "Christopher Nolan",
      cast: "Leonardo DiCaprio, Marion Cotillard, Tom Hardy"
    },
    {
      id: 2,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterUrl: "https://picsum.photos/seed/dark-knight/200/113",
      backdropUrl: "https://picsum.photos/seed/dark-knight-bg/1920/1080",
      year: "2008",
      rating: "PG-13",
      match: "96",
      genre: "Action",
      duration: "2h 32min",
      director: "Christopher Nolan",
      cast: "Christian Bale, Heath Ledger, Aaron Eckhart"
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      posterUrl: "https://picsum.photos/seed/interstellar/200/113",
      backdropUrl: "https://picsum.photos/seed/interstellar-bg/1920/1080",
      year: "2014",
      rating: "PG-13",
      match: "88",
      genre: "Sci-Fi",
      duration: "2h 49min",
      director: "Christopher Nolan",
      cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain"
    },
    {
      id: 4,
      title: "The Matrix",
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      posterUrl: "https://picsum.photos/seed/matrix/200/113",
      backdropUrl: "https://picsum.photos/seed/matrix-bg/1920/1080",
      year: "1999",
      rating: "R",
      match: "87",
      genre: "Sci-Fi",
      duration: "2h 16min",
      director: "The Wachowskis",
      cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss"
    },
    {
      id: 5,
      title: "Pulp Fiction",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      posterUrl: "https://picsum.photos/seed/pulp-fiction/200/113",
      backdropUrl: "https://picsum.photos/seed/pulp-fiction-bg/1920/1080",
      year: "1994",
      rating: "R",
      match: "91",
      genre: "Crime",
      duration: "2h 34min",
      director: "Quentin Tarantino",
      cast: "John Travolta, Uma Thurman, Samuel L. Jackson"
    },
    {
      id: 6,
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      posterUrl: "https://picsum.photos/seed/shawshank/200/113",
      backdropUrl: "https://picsum.photos/seed/shawshank-bg/1920/1080",
      year: "1994",
      rating: "R",
      match: "95",
      genre: "Drama",
      duration: "2h 22min",
      director: "Frank Darabont",
      cast: "Tim Robbins, Morgan Freeman, Bob Gunton"
    },
    {
      id: 7,
      title: "Forrest Gump",
      description: "The presidencies of Kennedy and Johnson, the Vietnam War, and the Watergate scandal unfold from the perspective of an Alabama man with an IQ of 75.",
      posterUrl: "https://picsum.photos/seed/forrest-gump/200/113",
      backdropUrl: "https://picsum.photos/seed/forrest-gump-bg/1920/1080",
      year: "1994",
      rating: "PG-13",
      match: "89",
      genre: "Drama",
      duration: "2h 22min",
      director: "Robert Zemeckis",
      cast: "Tom Hanks, Robin Wright, Gary Sinise"
    },
    {
      id: 8,
      title: "The Godfather",
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      posterUrl: "https://picsum.photos/seed/godfather/200/113",
      backdropUrl: "https://picsum.photos/seed/godfather-bg/1920/1080",
      year: "1972",
      rating: "R",
      match: "93",
      genre: "Crime",
      duration: "2h 55min",
      director: "Francis Ford Coppola",
      cast: "Marlon Brando, Al Pacino, James Caan"
    },
    {
      id: 9,
      title: "Fight Club",
      description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
      posterUrl: "https://picsum.photos/seed/fight-club/200/113",
      backdropUrl: "https://picsum.photos/seed/fight-club-bg/1920/1080",
      year: "1999",
      rating: "R",
      match: "90",
      genre: "Drama",
      duration: "2h 19min",
      director: "David Fincher",
      cast: "Brad Pitt, Edward Norton, Helena Bonham Carter"
    },
    {
      id: 10,
      title: "Goodfellas",
      description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
      posterUrl: "https://picsum.photos/seed/goodfellas/200/113",
      backdropUrl: "https://picsum.photos/seed/goodfellas-bg/1920/1080",
      year: "1990",
      rating: "R",
      match: "92",
      genre: "Crime",
      duration: "2h 26min",
      director: "Martin Scorsese",
      cast: "Robert De Niro, Ray Liotta, Joe Pesci"
    }
  ];

  const genres = [
    { value: 'all', label: 'All Genres' },
    { value: 'Action', label: 'Action' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Animation', label: 'Animation' }
  ];

  const sortOptions = [
    { value: 'trending', label: 'Trending Now' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'duration', label: 'Longest First' }
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
      setMovies(moviesData);
      setFilteredMovies(moviesData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...movies];

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Sort movies
    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => parseInt(b.match) - parseInt(a.match));
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
      case 'duration':
        filtered.sort((a, b) => b.duration.localeCompare(a.duration));
        break;
      default:
        break;
    }

    setFilteredMovies(filtered);
  }, [movies, selectedGenre, sortBy]);

  const handlePlay = (movie) => {
    console.log('Playing movie:', movie.title);
    window.location.href = `/watch/${movie.id}`;
  };

  const handleAddToList = (movie) => {
    console.log('Adding to list:', movie.title);
  };

  const handleLike = (movie) => {
    console.log('Liking movie:', movie.title);
  };

  const handleInfo = (movie) => {
    console.log('Movie info for:', movie.title);
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
          <p style={{ color: 'white', fontSize: '1.125rem' }}>Loading Movies...</p>
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
                      fontWeight: item.name === 'Movies' ? 600 : 400,
                      textDecoration: item.name === 'Movies' ? 'underline' : 'none'
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
              <Film size={16} />
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
            <Film style={{ width: '48px', height: '48px', color: '#e50914' }} />
            <h1 style={{ fontSize: '3.5rem', fontWeight: 700, color: '#ffffff' }}>
              MOVIES
            </h1>
          </div>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', margin: '0 auto' }}>
            Explore our extensive collection of movies from every genre imaginable
          </p>
        </motion.div>

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

        {/* Results Count */}
        <div style={{ marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
          <span style={{ fontWeight: 600 }}>{filteredMovies.length}</span> Movies Found
        </div>

        {/* Content Grid/List */}
        {viewMode === 'grid' ? (
          <div className="content-row-scroll">
            {filteredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
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
                onClick={() => handleInfo(movie)}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Hover Overlay */}
                <div className="card-overlay">
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', color: 'white' }}>
                    {movie.title}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.75rem', color: 'white' }}>
                    <span style={{ color: '#46d369', fontWeight: 600 }}>{movie.match}% Match</span>
                    <span>{movie.year}</span>
                    <span style={{ border: '1px solid #757575', padding: '0 4px', fontSize: '0.625rem' }}>{movie.rating}</span>
                    <span>{movie.duration}</span>
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
                    {movie.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePlay(movie); }}
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
                      onClick={(e) => { e.stopPropagation(); handleAddToList(movie); }}
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
                      onClick={(e) => { e.stopPropagation(); handleLike(movie); }}
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
            {filteredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
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
                onClick={() => handleInfo(movie)}
              >
                <div style={{ width: '120px', height: '68px', flexShrink: 0, overflow: 'hidden', borderRadius: '4px' }}>
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>{movie.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <span style={{ color: '#46d369', fontWeight: 600 }}>{movie.match}% Match</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handlePlay(movie); }}
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
                        onClick={(e) => { e.stopPropagation(); handleInfo(movie); }}
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
                    {movie.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                    <span style={{ background: '#e50914', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '2px', fontSize: '0.75rem' }}>{movie.genre}</span>
                    <span style={{ border: '1px solid #757575', padding: '0.25rem 0.5rem', borderRadius: '2px', fontSize: '0.75rem' }}>{movie.rating}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Director: {movie.director}</span>
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
            © 2024 Streamflix. Movies Collection.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MoviesClean;
