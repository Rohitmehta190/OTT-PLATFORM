import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Plus, ThumbsUp, Search, Bell, User, Menu, X } from 'lucide-react';

const NetflixHomeFixed = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredContent, setFeaturedContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);

  // Sample content data
  const sampleContent = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
      posterUrl: "https://picsum.photos/seed/stranger-things/200/113",
      backdropUrl: "https://picsum.photos/seed/stranger-things-bg/1920/1080",
      year: "2016",
      rating: "TV-14",
      match: "98%",
      genre: "Sci-Fi",
      type: "series",
      duration: "45 min"
    },
    {
      id: 2,
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign.",
      posterUrl: "https://picsum.photos/seed/the-crown/200/113",
      backdropUrl: "https://picsum.photos/seed/the-crown-bg/1920/1080",
      year: "2016",
      rating: "TV-MA",
      match: "92%",
      genre: "Drama",
      type: "series",
      duration: "50 min"
    },
    {
      id: 3,
      title: "The Witcher",
      description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny.",
      posterUrl: "https://picsum.photos/seed/witcher/200/113",
      backdropUrl: "https://picsum.photos/seed/witcher-bg/1920/1080",
      year: "2019",
      rating: "TV-MA",
      match: "89%",
      genre: "Fantasy",
      type: "series",
      duration: "55 min"
    },
    {
      id: 4,
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology.",
      posterUrl: "https://picsum.photos/seed/inception/200/113",
      backdropUrl: "https://picsum.photos/seed/inception-bg/1920/1080",
      year: "2010",
      rating: "PG-13",
      match: "94%",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 28min"
    },
    {
      id: 5,
      title: "Breaking Bad",
      description: "A high school chemistry teacher turns to manufacturing methamphetamine.",
      posterUrl: "https://picsum.photos/seed/breaking-bad/200/113",
      backdropUrl: "https://picsum.photos/seed/breaking-bad-bg/1920/1080",
      year: "2008",
      rating: "TV-MA",
      match: "97%",
      genre: "Crime",
      type: "series",
      duration: "47 min"
    },
    {
      id: 6,
      title: "The Mandalorian",
      description: "The travels of a lone bounty hunter in the outer reaches of the galaxy.",
      posterUrl: "https://picsum.photos/seed/mandalorian/200/113",
      backdropUrl: "https://picsum.photos/seed/mandalorian-bg/1920/1080",
      year: "2019",
      rating: "TV-14",
      match: "91%",
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
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #333', 
            borderTop: '3px solid #e50914', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: 'white', fontSize: '1.125rem' }}>Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#141414', fontFamily: 'Inter, sans-serif' }}>
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
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? 'rgba(20, 20, 20, 0.95)' : 'linear-gradient(to bottom, rgba(20, 20, 20, 0.9) 0%, rgba(20, 20, 20, 0.7) 70%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        padding: '20px 4%',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            {/* Logo */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                fontSize: '1.875rem', 
                fontWeight: 700, 
                color: '#e50914', 
                cursor: 'pointer' 
              }}
              onClick={() => window.location.href = '/'}
            >
              <div style={{
                width: '32px',
                height: '32px',
                background: '#e50914',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>S</div>
              STREAMFLIX
            </div>

            {/* Navigation Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none' }}>
              {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((item) => (
                <button
                  key={item}
                  style={{
                    color: 'white',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.9375rem',
                    fontWeight: 400,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Search */}
            {isSearchOpen ? (
              <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search titles..."
                  style={{
                    width: '250px',
                    padding: '8px 12px',
                    background: 'rgba(51, 51, 51, 0.8)',
                    border: '1px solid #333',
                    borderRadius: '4px',
                    color: 'white',
                    fontSize: '0.875rem'
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  style={{ background: 'none', border: 'none', color: '#757575', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '8px' }}
              >
                <Search size={16} />
              </button>
            )}

            {/* Notifications */}
            <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '8px' }}>
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
            <div style={{
              width: '32px',
              height: '32px',
              background: '#333',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer'
            }}>
              <User size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '85vh',
        minHeight: '600px',
        overflow: 'hidden',
        marginTop: '0'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
          <img
            src={featuredContent[0]?.backdropUrl}
            alt="Hero Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(77deg, rgba(20, 20, 20, 0.8) 0%, rgba(20, 20, 20, 0.4) 50%, rgba(20, 20, 20, 0) 100%)'
        }}></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            left: '4%',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: '550px',
            zIndex: 1,
            padding: '0 4rem 0 0'
          }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              lineHeight: 1.1,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              color: 'white'
            }}
          >
            {featuredContent[0]?.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{
              fontSize: '1.25rem',
              marginBottom: '1.5rem',
              lineHeight: 1.4,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
              color: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            {featuredContent[0]?.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => handlePlay(featuredContent[0])}
              style={{
                background: 'white',
                color: 'black',
                border: 'none',
                padding: '0.875rem 2.5rem',
                borderRadius: '4px',
                fontSize: '1.125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.75)'}
              onMouseLeave={(e) => e.target.style.background = 'white'}
            >
              <Play size={20} fill="currentColor" />
              Play
            </button>
            <button
              onClick={() => handleInfo(featuredContent[0])}
              style={{
                background: 'rgba(109, 109, 110, 0.7)',
                color: 'white',
                border: '1px solid white',
                padding: '0.875rem 2.5rem',
                borderRadius: '4px',
                fontSize: '1.125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.4)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.7)'}
            >
              <Info size={20} />
              More Info
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Content Rows */}
      <section style={{ marginBottom: '2rem' }}>
        <div style={{ padding: '0 4%', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>Trending Now</h2>
        </div>
        <div className="content-row-scroll">
          {trendingContent.map((item, index) => (
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
              
              {/* Hover Overlay */}
              <div className="card-overlay">
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', color: 'white' }}>
                  {item.title}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.75rem', color: 'white' }}>
                  <span style={{ color: '#46d369', fontWeight: 600 }}>{item.match} Match</span>
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
      </section>

      {/* More Content Rows */}
      <section style={{ marginBottom: '2rem' }}>
        <div style={{ padding: '0 4%', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>New Releases</h2>
        </div>
        <div className="content-row-scroll">
          {trendingContent.slice(0, 5).map((item, index) => (
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
              
              {/* Hover Overlay */}
              <div className="card-overlay">
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', color: 'white' }}>
                  {item.title}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.75rem', color: 'white' }}>
                  <span style={{ color: '#46d369', fontWeight: 600 }}>{item.match} Match</span>
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
      </section>

      {/* Footer */}
      <footer style={{
        background: '#181818',
        borderTop: '1px solid #333',
        padding: '3rem 4% 2rem',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Company</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>About Us</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Careers</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Press</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Contact</a>
              </div>
            </div>
            
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>View</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Website</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Mobile App</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Smart TV</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Tablet</a>
              </div>
            </div>
            
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Legal</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Terms of Use</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Privacy Policy</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Cookie Policy</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Copyright</a>
              </div>
            </div>
            
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Social</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Twitter</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Instagram</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Facebook</a>
                <a href="#" style={{ color: '#757575', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>YouTube</a>
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #333', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 700, color: '#e50914' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#e50914',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>S</div>
              STREAMFLIX
            </div>
            <div style={{ color: '#757575', fontSize: '0.875rem' }}>
              © 2024 Streamflix. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NetflixHomeFixed;
