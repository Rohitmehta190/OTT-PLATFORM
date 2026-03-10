import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SimpleProfessional = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('featured');

  // Sample content data
  const featuredContent = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
      poster: "https://picsum.photos/seed/stranger-things/300/450",
      backdrop: "https://picsum.photos/seed/stranger-things-bg/1920/1080",
      year: "2016",
      rating: "TV-14",
      match: "98%"
    },
    {
      id: 2,
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign.",
      poster: "https://picsum.photos/seed/the-crown/300/450",
      backdrop: "https://picsum.photos/seed/the-crown-bg/1920/1080",
      year: "2016",
      rating: "TV-MA",
      match: "92%"
    },
    {
      id: 3,
      title: "The Witcher",
      description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny.",
      poster: "https://picsum.photos/seed/witcher/300/450",
      backdrop: "https://picsum.photos/seed/witcher-bg/1920/1080",
      year: "2019",
      rating: "TV-MA",
      match: "89%"
    }
  ];

  const trendingContent = [
    {
      id: 4,
      title: "Inception",
      poster: "https://picsum.photos/seed/inception/300/450",
      year: "2010",
      rating: "PG-13"
    },
    {
      id: 5,
      title: "The Dark Knight",
      poster: "https://picsum.photos/seed/dark-knight/300/450",
      year: "2008",
      rating: "PG-13"
    },
    {
      id: 6,
      title: "Breaking Bad",
      poster: "https://picsum.photos/seed/breaking-bad/300/450",
      year: "2008",
      rating: "TV-MA"
    },
    {
      id: 7,
      title: "The Mandalorian",
      poster: "https://picsum.photos/seed/mandalorian/300/450",
      year: "2019",
      rating: "TV-14"
    },
    {
      id: 8,
      title: "Interstellar",
      poster: "https://picsum.photos/seed/interstellar/300/450",
      year: "2014",
      rating: "PG-13"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#141414',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px'
      }}>
        <div>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #333',
            borderTop: '3px solid #e50914',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          Loading amazing content...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
      {/* Professional Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'linear-gradient(to bottom, rgba(20, 20, 20, 0.9) 0%, rgba(20, 20, 20, 0.7) 70%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        padding: '16px 32px',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#e50914',
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#e50914',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              S
            </div>
            STREAMFLIX
          </div>

          {/* Navigation Links */}
          <div style={{
            display: 'flex',
            gap: '32px',
            listStyle: 'none'
          }}>
            {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((item) => (
              <button
                key={item}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '500',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px'
            }}>
              🔍
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px'
            }}>
              🔔
            </button>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#333',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              👤
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1
        }}>
          <img
            src={featuredContent[0].backdrop}
            alt="Hero"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(20, 20, 20, 0.8) 0%, rgba(20, 20, 20, 0.4) 50%, transparent 100%)'
          }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: '600px',
            padding: '64px'
          }}
        >
          <h1 style={{
            fontSize: '64px',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: 1.1,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            fontFamily: 'Arial, sans-serif'
          }}>
            {featuredContent[0].title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <span style={{ color: '#46d369', fontWeight: '600' }}>{featuredContent[0].match} Match</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{featuredContent[0].year}</span>
            <span style={{
              border: '1px solid rgba(255, 255, 255, 0.6)',
              padding: '2px 8px',
              fontSize: '12px',
              color: 'white'
            }}>{featuredContent[0].rating}</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>4 Seasons</span>
            <span style={{
              border: '1px solid rgba(255, 255, 255, 0.6)',
              padding: '2px 8px',
              fontSize: '12px',
              color: 'white'
            }}>HD</span>
          </div>

          <p style={{
            fontSize: '20px',
            marginBottom: '32px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
          }}>
            {featuredContent[0].description}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          >
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              fontSize: '18px',
              fontWeight: '600',
              background: 'white',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
            }}>
              ▶️ Play
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              fontSize: '18px',
              fontWeight: '600',
              background: 'rgba(109, 109, 110, 0.7)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(109, 109, 110, 0.7)';
            }}>
              ℹ️ More Info
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content Sections */}
      <div style={{ backgroundColor: '#141414', padding: '48px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          {/* Section Tabs */}
          <div style={{
            display: 'flex',
            gap: '24px',
            marginBottom: '32px',
            borderBottom: '1px solid #333',
            paddingBottom: '16px'
          }}>
            {['Trending Now', 'New Releases', 'My List', 'Action', 'Comedy'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === section ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '18px',
                  fontWeight: '600',
                  padding: '12px 0',
                  cursor: 'pointer',
                  borderBottom: activeSection === section ? '2px solid #e50914' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px'
            }}
          >
            {trendingContent.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                style={{
                  backgroundColor: '#181818',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ aspectRatio: '2/3', overflow: 'hidden' }}>
                  <img
                    src={item.poster}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  />
                </div>
                <div style={{ padding: '12px' }}>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '4px',
                    lineHeight: 1.3
                  }}>
                    {item.title}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    <span>{item.year}</span>
                    <span style={{
                      border: '1px solid rgba(255, 255, 255, 0.6)',
                      padding: '2px 6px',
                      fontSize: '10px'
                    }}>{item.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SimpleProfessional;
