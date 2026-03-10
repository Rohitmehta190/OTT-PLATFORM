import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward, 
  Settings, 
  ThumbsUp, 
  ThumbsDown, 
  Plus, 
  Share2, 
  ArrowLeft, 
  Info, 
  Clock, 
  Calendar, 
  Star,
  Download,
  Subtitles,
  PictureInPicture
} from 'lucide-react';
import NeonNavbar from '../components/Neon/NeonNavbar';

const WatchPage = () => {
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
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState('1080p');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sample content data - in production this would come from API
  const contentData = {
    1: {
      id: 1,
      title: "Neon Dreams",
      description: "A cyberpunk thriller set in a dystopian future where AI and humanity collide in an epic battle for survival. In the year 2089, the world is divided between those who embrace artificial intelligence and those who fear it. When a rogue AI threatens to destroy humanity, a group of unlikely heroes must band together to save the world.",
      posterUrl: "https://picsum.photos/seed/neon-dreams-watch/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-dreams-watch-bg/1920/1080",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      year: "2024",
      rating: "TV-MA",
      genre: "Sci-Fi",
      type: "series",
      duration: "45 min",
      seasons: "2 Seasons",
      episodes: "20 Episodes",
      currentEpisode: "S1E1",
      director: "Nova Stellar",
      cast: "Luna Chen, Max Rivers, Sarah Johnson",
      language: "English",
      subtitles: ["English", "Spanish", "French", "German", "Japanese"],
      audioTracks: ["English", "Spanish", "French"],
      releaseDate: "2024-03-01",
      maturityRating: "18+",
      match: "98%",
      userRating: 4.8,
      views: "2.5M",
      nextEpisode: {
        title: "Digital Awakening",
        episode: "S1E2",
        duration: "45 min"
      }
    }
  };

  const [content, setContent] = useState(null);

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

  const handleSpeedChange = (speed) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSettings(false);
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    setShowSettings(false);
    // In production, this would switch video source
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleAddToList = () => {
    setInMyList(!inMyList);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: content.description,
        url: window.location.href
      });
    }
  };

  if (loading) {
    return (
      <div className="neon-loading">
        <div className="neon-spinner"></div>
        <div className="neon-loading-text">Loading Content...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Content Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="neon-btn neon-btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Video Container */}
      <div 
        id="video-container"
        className="relative w-full bg-black"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Player */}
        <video
          ref={videoRef}
          src={content.videoUrl}
          className="w-full h-auto max-h-screen object-contain"
          onClick={handlePlayPause}
        />

        {/* Video Controls Overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none"
            >
              {/* Top Controls */}
              <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-auto">
                <button
                  onClick={() => navigate(-1)}
                  className="neon-btn neon-btn-secondary p-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-4">
                  <span className="text-white font-semibold">{content.title}</span>
                  <span className="text-cyan-400">{content.currentEpisode}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="neon-btn neon-btn-secondary p-2">
                    <PictureInPicture className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleFullscreenToggle}
                    className="neon-btn neon-btn-secondary p-2"
                  >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Center Play Button */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                  <button
                    onClick={handlePlayPause}
                    className="w-20 h-20 bg-cyan-400/20 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-400/30 transition-all"
                    style={{ boxShadow: '0 0 40px var(--neon-primary)' }}
                  >
                    <Play className="w-10 h-10 fill-current" />
                  </button>
                </div>
              )}

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
                {/* Progress Bar */}
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, var(--neon-primary) 0%, var(--neon-primary) ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-white mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause */}
                    <button
                      onClick={handlePlayPause}
                      className="neon-btn neon-btn-secondary p-2"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    {/* Skip Back/Forward */}
                    <button className="neon-btn neon-btn-secondary p-2">
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button className="neon-btn neon-btn-secondary p-2">
                      <SkipForward className="w-5 h-5" />
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleMuteToggle}
                        className="neon-btn neon-btn-secondary p-2"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Time */}
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Subtitles */}
                    <button
                      onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                      className={`neon-btn p-2 ${
                        subtitlesEnabled ? 'neon-btn-primary' : 'neon-btn-secondary'
                      }`}
                    >
                      <Subtitles className="w-5 h-5" />
                    </button>

                    {/* Settings */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="neon-btn neon-btn-secondary p-2"
                      >
                        <Settings className="w-5 h-5" />
                      </button>

                      {/* Settings Dropdown */}
                      {showSettings && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 bottom-full mb-2 w-48 bg-gray-900 border border-cyan-400/30 rounded-lg p-2"
                        >
                          {/* Playback Speed */}
                          <div className="mb-2">
                            <p className="text-xs text-cyan-400 mb-1">Playback Speed</p>
                            <div className="flex flex-col gap-1">
                              {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                                <button
                                  key={speed}
                                  onClick={() => handleSpeedChange(speed)}
                                  className={`text-left px-2 py-1 rounded text-sm ${
                                    playbackSpeed === speed 
                                      ? 'bg-cyan-400 text-black' 
                                      : 'text-white hover:bg-gray-800'
                                  }`}
                                >
                                  {speed}x
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Quality */}
                          <div>
                            <p className="text-xs text-cyan-400 mb-1">Quality</p>
                            <div className="flex flex-col gap-1">
                              {['360p', '480p', '720p', '1080p', '4K'].map(q => (
                                <button
                                  key={q}
                                  onClick={() => handleQualityChange(q)}
                                  className={`text-left px-2 py-1 rounded text-sm ${
                                    quality === q 
                                      ? 'bg-cyan-400 text-black' 
                                      : 'text-white hover:bg-gray-800'
                                  }`}
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Details */}
      <div className="neon-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {content.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="neon-badge neon-badge-primary">{content.year}</span>
                  <span className="neon-badge neon-badge-secondary">{content.rating}</span>
                  <span className="neon-badge neon-badge-accent">{content.genre}</span>
                  <span className="text-cyan-400">{content.duration}</span>
                  <span className="text-green-400">{content.match} Match</span>
                </div>

                <p className="text-lg text-white/80 mb-6 leading-relaxed">
                  {content.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <button
                    onClick={handlePlayPause}
                    className="neon-btn neon-btn-primary flex items-center gap-2 px-6 py-3"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  
                  <button
                    onClick={handleAddToList}
                    className={`neon-btn flex items-center gap-2 px-6 py-3 ${
                      inMyList ? 'neon-btn-danger' : 'neon-btn-secondary'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                    {inMyList ? 'Remove from List' : 'Add to List'}
                  </button>

                  <button
                    onClick={handleLike}
                    className={`neon-btn flex items-center gap-2 px-6 py-3 ${
                      isLiked ? 'neon-btn-primary' : 'neon-btn-secondary'
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    Like
                  </button>

                  <button
                    onClick={handleDislike}
                    className={`neon-btn flex items-center gap-2 px-6 py-3 ${
                      isDisliked ? 'neon-btn-danger' : 'neon-btn-secondary'
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5" />
                    Dislike
                  </button>

                  <button
                    onClick={handleShare}
                    className="neon-btn neon-btn-secondary flex items-center gap-2 px-6 py-3"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>

                  <button className="neon-btn neon-btn-secondary flex items-center gap-2 px-6 py-3">
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-3">Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60">Director:</span>
                        <span className="text-white">{content.director}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Cast:</span>
                        <span className="text-white">{content.cast}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Language:</span>
                        <span className="text-white">{content.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Release Date:</span>
                        <span className="text-white">{content.releaseDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-3">Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60">User Rating:</span>
                        <span className="text-yellow-400 flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current" />
                          {content.userRating}/5.0
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Views:</span>
                        <span className="text-white">{content.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Maturity:</span>
                        <span className="text-white">{content.maturityRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Episodes:</span>
                        <span className="text-white">{content.episodes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Next Episode */}
                {content.nextEpisode && (
                  <div className="neon-card p-6 mb-6">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">Next Episode</h3>
                    <div className="flex items-center gap-4">
                      <img
                        src={content.posterUrl}
                        alt={content.nextEpisode.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{content.nextEpisode.title}</h4>
                        <p className="text-cyan-300 text-sm mb-2">{content.nextEpisode.episode}</p>
                        <p className="text-white/60 text-sm">{content.nextEpisode.duration}</p>
                      </div>
                    </div>
                    <button className="neon-btn neon-btn-primary w-full mt-4">
                      Play Next Episode
                    </button>
                  </div>
                )}

                {/* Episodes */}
                <div className="neon-card p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Episodes</h3>
                  <div className="space-y-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <Play className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm">Episode {i + 1}</h4>
                          <p className="text-cyan-300 text-xs">S1E{i + 1} • {content.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="neon-footer">
        <div className="neon-footer-bottom">
          <div className="neon-footer-brand">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-black font-bold text-xl">
              S
            </div>
            STREAMFLIX
          </div>
          <div className="neon-footer-copyright">
            © 2024 Streamflix. Watch Page.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WatchPage;
