import React, { useState, useEffect } from 'react';

const DebugProfessional = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🚀 DebugProfessional component mounting...');
    
    try {
      // Simulate loading
      console.log('⏳ Starting content load...');
      setTimeout(() => {
        console.log('✅ Content loaded successfully');
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('❌ Error loading content:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#141414',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ color: '#e50914', marginBottom: '20px' }}>❌ Error Loading Platform</h1>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#e50914',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#141414',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #333',
            borderTop: '4px solid #e50914',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🎬 Loading Streamflix</h2>
          <p style={{ color: '#999', fontSize: '16px' }}>Preparing amazing content for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
      {/* Debug Info */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(229, 9, 20, 0.9)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9999,
        backdropFilter: 'blur(10px)'
      }}>
        🎯 Streamflix Debug Mode
      </div>

      {/* Professional Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'linear-gradient(to bottom, rgba(20, 20, 20, 0.95) 0%, rgba(20, 20, 20, 0.8) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '16px 32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
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
            gap: '12px',
            textDecoration: 'none',
            color: '#e50914',
            fontSize: '28px',
            fontWeight: 'bold',
            fontFamily: 'Arial Black, sans-serif'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #e50914 0%, #b20710 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(229, 9, 20, 0.4)'
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
                  padding: '12px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
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
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              fontSize: '20px'
            }}>
              🔍
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              fontSize: '20px',
              position: 'relative'
            }}>
              🔔
              <span style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
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
              fontSize: '20px'
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
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background: 'linear-gradient(45deg, #141414 0%, #1a1a1a 50%, #2d2d2d 100%)'
        }}>
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(229, 9, 20, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '30%',
            right: '15%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(70, 209, 105, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse'
          }} />
        </div>

        <div style={{
          textAlign: 'center',
          zIndex: 1,
          padding: '40px',
          maxWidth: '800px'
        }}>
          <h1 style={{
            fontSize: '72px',
            fontWeight: '900',
            marginBottom: '30px',
            lineHeight: 1.1,
            color: 'white',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            fontFamily: 'Arial Black, sans-serif',
            background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            STREAMFLIX
          </h1>
          
          <p style={{
            fontSize: '24px',
            marginBottom: '40px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            Professional Streaming Platform with Netflix-Quality UI
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
              padding: '16px 32px',
              fontSize: '20px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 12px 35px rgba(255, 255, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3)';
            }}
            >
              ▶️ Start Watching
            </button>
            
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              fontSize: '20px',
              fontWeight: '700',
              background: 'rgba(109, 109, 110, 0.7)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(109, 109, 110, 0.7)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            >
              ℹ️ More Info
            </button>
          </div>

          <div style={{
            marginTop: '60px',
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#46d369',
                marginBottom: '8px'
              }}>
                10,000+
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                Movies & Shows
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#e50914',
                marginBottom: '8px'
              }}>
                4K
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                Ultra HD Quality
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#0071eb',
                marginBottom: '8px'
              }}>
                150+
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                Countries
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Content Section */}
      <div style={{
        backgroundColor: '#141414',
        padding: '80px 32px 32px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            🎬 Trending Now
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {['Stranger Things', 'The Crown', 'The Witcher', 'Inception', 'Breaking Bad', 'The Mandalorian'].map((title, index) => (
              <div
                key={title}
                style={{
                  backgroundColor: '#181818',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = '#e50914';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#2d2d2d' }}>
                  <img
                    src={`https://picsum.photos/seed/${title.replace(/\s+/g, '')}/400/225`}
                    alt={title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease'
                    }}
                  />
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '8px',
                    lineHeight: 1.3
                  }}>
                    {title}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    <span>2024</span>
                    <span style={{
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>HD</span>
                    <span style={{ color: '#46d369', fontWeight: '600' }}>98% Match</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default DebugProfessional;
