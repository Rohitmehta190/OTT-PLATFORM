import React, { useState, useEffect } from 'react';

const FinalProfessional = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trending');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Content data
  const categories = {
    trending: [
      { id: 1, title: "Stranger Things", poster: "https://picsum.photos/seed/stranger/300/450", year: "2016", rating: "TV-14", match: "98%" },
      { id: 2, title: "The Crown", poster: "https://picsum.photos/seed/crown/300/450", year: "2016", rating: "TV-MA", match: "92%" },
      { id: 3, title: "The Witcher", poster: "https://picsum.photos/seed/witcher/300/450", year: "2019", rating: "TV-MA", match: "89%" },
      { id: 4, title: "Breaking Bad", poster: "https://picsum.photos/seed/breaking/300/450", year: "2008", rating: "TV-MA", match: "97%" },
      { id: 5, title: "The Mandalorian", poster: "https://picsum.photos/seed/mando/300/450", year: "2019", rating: "TV-14", match: "91%" }
    ],
    newReleases: [
      { id: 6, title: "Inception", poster: "https://picsum.photos/seed/inception/300/450", year: "2010", rating: "PG-13", match: "94%" },
      { id: 7, title: "Interstellar", poster: "https://picsum.photos/seed/interstellar/300/450", year: "2014", rating: "PG-13", match: "88%" },
      { id: 8, title: "The Dark Knight", poster: "https://picsum.photos/seed/darkknight/300/450", year: "2008", rating: "PG-13", match: "96%" },
      { id: 9, title: "The Matrix", poster: "https://picsum.photos/seed/matrix/300/450", year: "1999", rating: "R", match: "87%" },
      { id: 10, title: "Pulp Fiction", poster: "https://picsum.photos/seed/pulp/300/450", year: "1994", rating: "R", match: "93%" }
    ],
    mylist: [
      { id: 11, title: "The Queen's Gambit", poster: "https://picsum.photos/seed/queens/300/450", year: "2020", rating: "TV-MA", match: "93%" },
      { id: 12, title: "Ozark", poster: "https://picsum.photos/seed/ozark/300/450", year: "2017", rating: "TV-MA", match: "85%" },
      { id: 13, title: "Money Heist", poster: "https://picsum.photos/seed/money/300/450", year: "2017", rating: "TV-MA", match: "90%" }
    ],
    movies: [
      { id: 14, title: "The Godfather", poster: "https://picsum.photos/seed/godfather/300/450", year: "1972", rating: "R", match: "97%" },
      { id: 15, title: "The Shawshank Redemption", poster: "https://picsum.photos/seed/shawshank/300/450", year: "1994", rating: "R", match: "95%" },
      { id: 16, title: "Fight Club", poster: "https://picsum.photos/seed/fightclub/300/450", year: "1999", rating: "R", match: "88%" }
    ],
    series: [
      { id: 17, title: "Friends", poster: "https://picsum.photos/seed/friends/300/450", year: "1994", rating: "TV-14", match: "94%" },
      { id: 18, title: "The Office", poster: "https://picsum.photos/seed/office/300/450", year: "2005", rating: "TV-14", match: "91%" },
      { id: 19, title: "Game of Thrones", poster: "https://picsum.photos/seed/got/300/450", year: "2011", rating: "TV-MA", match: "96%" }
    ]
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#141414',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '6px solid #333',
            borderTop: '6px solid #e50914',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 30px'
          }} />
          <h2 style={{ 
            color: 'white', 
            fontSize: '28px', 
            fontWeight: 'bold',
            marginBottom: '15px',
            background: 'linear-gradient(45deg, #e50914, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            STREAMFLIX
          </h2>
          <p style={{ color: '#999', fontSize: '18px' }}>Loading premium content...</p>
        </div>
      </div>
    );
  }

  const ContentCard = ({ item, index }) => (
    <div
      key={item.id}
      style={{
        backgroundColor: '#181818',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translateY(0)',
        border: '1px solid transparent'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 25px 50px rgba(229, 9, 20, 0.4)';
        e.currentTarget.style.borderColor = '#e50914';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'transparent';
      }}
      onClick={() => console.log('Playing:', item.title)}
    >
      <div style={{ 
        aspectRatio: '2/3', 
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#2d2d2d'
      }}>
        <img
          src={item.poster}
          alt={item.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#46d369',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {item.match}
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: 'white',
          marginBottom: '8px',
          lineHeight: 1.3
        }}>
          {item.title}
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <span>{item.year}</span>
          <span style={{
            border: '1px solid rgba(255, 255, 255, 0.4)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '11px'
          }}>{item.rating}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'linear-gradient(to bottom, rgba(20, 20, 20, 0.95) 0%, rgba(20, 20, 20, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '20px 40px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: '#e50914',
            fontSize: '32px',
            fontWeight: '900',
            fontFamily: 'Arial Black, sans-serif',
            textShadow: '0 2px 10px rgba(229, 9, 20, 0.3)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #e50914 0%, #b20710 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '28px',
              fontWeight: 'bold',
              boxShadow: '0 6px 20px rgba(229, 9, 20, 0.4)'
            }}>
              S
            </div>
            STREAMFLIX
          </div>

          {/* Center Navigation */}
          <div style={{
            display: 'flex',
            gap: '8px',
            listStyle: 'none'
          }}>
            {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((item) => (
              <button
                key={item}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '500',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              {searchOpen ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, people, genres"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      fontSize: '14px',
                      width: '300px',
                      outline: 'none',
                      placeholder: { color: 'rgba(255, 255, 255, 0.5)' }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255, 255, 255, 0.7)',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    fontSize: '18px'
                  }}
                >
                  🔍
                </button>
              )}
            </div>

            <button style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              fontSize: '18px',
              position: 'relative'
            }}>
              🔔
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                background: '#e50914',
                borderRadius: '50%'
              }} />
            </button>

            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #333 0%, #555 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '20px',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#e50914';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'transparent';
            }}
            >
              👤
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '85vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #141414 0%, #1a1a1a 40%, #2d1b1b 100%)'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '12%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(70, 209, 105, 0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite reverse'
        }} />

        <div style={{
          textAlign: 'center',
          zIndex: 1,
          padding: '40px',
          maxWidth: '900px'
        }}>
          <h1 style={{
            fontSize: '78px',
            fontWeight: '900',
            marginBottom: '25px',
            lineHeight: 1.1,
            color: 'white',
            textShadow: '0 4px 25px rgba(0, 0, 0, 0.4)',
            fontFamily: 'Arial Black, sans-serif',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'glow 3s ease-in-out infinite alternate'
          }}>
            STREAMFLIX
          </h1>
          
          <p style={{
            fontSize: '22px',
            marginBottom: '35px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.3)',
            maxWidth: '600px'
          }}>
            Professional Streaming Platform with Netflix-Quality UI & Advanced Features
          </p>

          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '18px 36px',
              fontSize: '20px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
              color: '#000000',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 30px rgba(255, 255, 255, 0.35)',
              transform: 'translateY(0)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-6px)';
              e.target.style.boxShadow = '0 15px 40px rgba(255, 255, 255, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.35)';
            }}
            onClick={() => console.log('Start Watching')}
            >
              <span style={{ fontSize: '24px' }}>▶</span>
              Start Watching
            </button>
            
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '18px 36px',
              fontSize: '20px',
              fontWeight: '700',
              background: 'rgba(109, 109, 110, 0.8)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(109, 109, 110, 0.8)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onClick={() => console.log('More Info')}
            >
              <span style={{ fontSize: '20px' }}>ℹ</span>
              More Info
            </button>
          </div>

          <div style={{
            marginTop: '50px',
            display: 'flex',
            gap: '50px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '52px',
                fontWeight: 'bold',
                color: '#46d369',
                marginBottom: '10px',
                textShadow: '0 2px 10px rgba(70, 209, 105, 0.3)'
              }}>
                15,000+
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px' }}>
                Movies & Shows
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '52px',
                fontWeight: 'bold',
                color: '#e50914',
                marginBottom: '10px',
                textShadow: '0 2px 10px rgba(229, 9, 20, 0.3)'
              }}>
                4K ULTRA
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px' }}>
                HD Quality
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '52px',
                fontWeight: 'bold',
                color: '#0071eb',
                marginBottom: '10px',
                textShadow: '0 2px 10px rgba(0, 113, 235, 0.3)'
              }}>
                190+
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px' }}>
                Countries
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div style={{
        backgroundColor: '#141414',
        padding: '60px 40px 40px'
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '4px',
            marginBottom: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '6px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}>
            {Object.keys(categories).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab 
                    ? 'linear-gradient(135deg, #e50914 0%, #b20710 100%)' 
                    : 'transparent',
                  color: 'white',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: '600',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textTransform: 'capitalize'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {tab === 'mylist' ? 'My List' : tab === 'newReleases' ? 'New Releases' : tab}
              </button>
            ))}
          </div>
          
          {/* Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {categories[activeTab].map((item, index) => (
              <ContentCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(to bottom, #141414 0%, #0a0a0a 100%)',
        borderTop: '1px solid #333',
        padding: '60px 40px 40px',
        marginTop: '80px'
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            <div>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Company</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['About Us', 'Careers', 'Press', 'Contact'].map(item => (
                  <a key={item} href="#" style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >{item}</a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>View</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Website', 'Mobile App', 'Smart TV', 'Tablet'].map(item => (
                  <a key={item} href="#" style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >{item}</a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Legal</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Terms of Use', 'Privacy Policy', 'Cookie Policy'].map(item => (
                  <a key={item} href="#" style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >{item}</a>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid #333',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #e50914 0%, #b20710 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                S
              </div>
              <span style={{
                color: '#e50914',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>STREAMFLIX</span>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>
              © 2024 Streamflix. Professional streaming platform demo.
            </p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes glow {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.2); }
        }
      `}</style>
    </div>
  );
};

export default FinalProfessional;
