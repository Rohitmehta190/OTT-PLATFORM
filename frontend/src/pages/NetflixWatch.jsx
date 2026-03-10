import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  ThumbsUp, 
  ThumbsDown, 
  Plus, 
  Share2, 
  ArrowLeft, 
  Info,
  SkipBack,
  SkipForward
} from 'lucide-react';

const NetflixWatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);

  // Sample content data
  const contentData = {
    1: {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      posterUrl: "https://picsum.photos/seed/stranger-things/400/225",
      backdropUrl: "https://picsum.photos/seed/stranger-things-bg/1920/1080",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      year: "2016",
      rating: "TV-14",
      genre: "Sci-Fi",
      type: "series",
      duration: "45 min",
      seasons: "4 Seasons",
      currentEpisode: "S1E1",
      director: "The Duffer Brothers",
      cast: "Millie Bobby Brown, Finn Wolfhard, David Harbour",
      language: "English",
      releaseDate: "2016-07-15",
      userRating: 4.8,
      views: "2.5M",
      nextEpisode: {
        title: "The Weirdo on Maple Street",
        episode: "S1E2",
        duration: "45 min"
      }
    }
  };

  useEffect(() => {
    // Simulate loading content
    setTimeout(() => {
      const foundContent = contentData[id];
      if (foundContent) {
        setContent(foundContent);
        setLoading(false);
      } else {
        navigate('/');
      }
    }, 1000);
  }, [id, navigate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [content]);

  useEffect(() => {
    let controlsTimeout;
    if (showControls) {
      controlsTimeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(controlsTimeout);
  }, [showControls]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = e.target.value;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (e.target.value / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleFullscreenToggle = () => {
    const container = document.getElementById('video-container');
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          <p style={{ color: 'white', fontSize: '1.125rem' }}>Loading video...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#141414', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Content Not Found</h2>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#e50914',
              color: 'white',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Go Home
          </button>
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
        
        .video-controls-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.7) 100%);
          pointer-events: none;
        }
        
        .video-controls-overlay.active {
          pointer-events: auto;
        }
        
        .progress-bar {
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.3);
          outline: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        
        .video-controls-overlay.active .progress-bar {
          opacity: 1;
        }
        
        .progress-bar::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: #e50914;
          cursor: pointer;
          border-radius: 50%;
        }
        
        .volume-slider {
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.3);
          outline: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        
        .video-controls-overlay.active .volume-slider {
          opacity: 1;
        }
        
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
        }
      `}</style>

      {/* Video Container */}
      <div 
        id="video-container"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#000000',
          cursor: 'pointer'
        }}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Player */}
        <video
          ref={videoRef}
          src={content.videoUrl}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '80vh',
            objectFit: 'contain',
            display: 'block'
          }}
          onClick={handlePlayPause}
        />

        {/* Video Controls Overlay */}
        <div className={`video-controls-overlay ${showControls ? 'active' : ''}`}>
          {/* Top Controls */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)'
          }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: 'rgba(109, 109, 110, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.9)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.7)'}
            >
              <ArrowLeft style={{ width: '20px', height: '20px' }} />
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '1.125rem' }}>{content.title}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{content.currentEpisode}</span>
            </div>

            <button
              onClick={handleFullscreenToggle}
              style={{
                background: 'rgba(109, 109, 110, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.9)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(109, 109, 110, 0.7)'}
            >
              {isFullscreen ? <Minimize style={{ width: '20px', height: '20px' }} /> : <Maximize style={{ width: '20px', height: '20px' }} />}
            </button>
          </div>

          {/* Center Play Button */}
          {!isPlaying && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'rgba(229, 9, 20, 0.8)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                pointerEvents: 'auto',
                transition: 'all 0.3s ease'
              }}
              onClick={handlePlayPause}
              onMouseEnter={(e) => e.target.style.background = 'rgba(229, 9, 20, 1)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(229, 9, 20, 0.8)'}
              >
                <Play style={{ width: '32px', height: '32px', fill: 'white' }} />
              </div>
            </div>
          )}

          {/* Bottom Controls */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)'
          }}>
            {/* Progress Bar */}
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                className="progress-bar"
                style={{
                  width: '100%',
                  height: '4px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  background: `linear-gradient(to right, #e50914 0%, #e50914 ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.3) ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.3) 100%)`
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Play/Pause */}
                <button
                  onClick={handlePlayPause}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  {isPlaying ? <Pause style={{ width: '20px', height: '20px' }} /> : <Play style={{ width: '20px', height: '20px', fill: 'white' }} />}
                </button>

                {/* Skip Back/Forward */}
                <button style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}>
                  <SkipBack style={{ width: '20px', height: '20px' }} />
                </button>
                <button style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}>
                  <SkipForward style={{ width: '20px', height: '20px' }} />
                </button>

                {/* Volume */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={handleMuteToggle}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                  >
                    {isMuted ? <VolumeX style={{ width: '20px', height: '20px' }} /> : <Volume2 style={{ width: '20px', height: '20px' }} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                    style={{
                      width: '80px',
                      height: '4px',
                      borderRadius: '2px',
                      cursor: 'pointer'
                    }}
                  />
                </div>

                {/* Time */}
                <span style={{ color: 'white', fontSize: '0.875rem' }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}>
                  <Settings style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Details */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
              {content.title}
            </h1>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{content.year}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>•</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{content.rating}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>•</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{content.duration}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>•</span>
              <span style={{ color: '#46d369' }}>{content.match}% Match</span>
            </div>

            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '2rem', lineHeight: 1.6 }}>
              {content.description}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <button
                onClick={handlePlayPause}
                style={{
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  padding: '0.875rem 2rem',
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
                onMouseLeave={(e) => e.target.style.background = '#ffffff'}
              >
                <Play style={{ width: '20px', height: '20px', fill: 'currentColor' }} />
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              
              <button style={{
                background: 'rgba(109, 109, 110, 0.7)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.875rem 2rem',
                borderRadius: '4px',
                fontSize: '1.125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}>
                <Plus style={{ width: '20px', height: '20px' }} />
                Add to List
              </button>

              <button style={{
                background: 'rgba(109, 109, 110, 0.7)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.875rem 2rem',
                borderRadius: '4px',
                fontSize: '1.125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}>
                <ThumbsUp style={{ width: '20px', height: '20px' }} />
                Like
              </button>

              <button style={{
                background: 'rgba(109, 109, 110, 0.7)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.875rem 2rem',
                borderRadius: '4px',
                fontSize: '1.125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}>
                <Share2 style={{ width: '20px', height: '20px' }} />
                Share
              </button>
            </div>

            {/* Additional Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Director:</span>
                    <span style={{ color: 'white' }}>{content.director}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Cast:</span>
                    <span style={{ color: 'white' }}>{content.cast}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Language:</span>
                    <span style={{ color: 'white' }}>{content.language}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Release Date:</span>
                    <span style={{ color: 'white' }}>{content.releaseDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Stats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>User Rating:</span>
                    <span style={{ color: '#f1c40f' }}>{content.userRating}/5.0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Views:</span>
                    <span style={{ color: 'white' }}>{content.views}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Episodes:</span>
                    <span style={{ color: 'white' }}>{content.seasons}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixWatch;
