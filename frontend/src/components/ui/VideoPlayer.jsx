import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  SkipBack, 
  SkipForward,
  Settings,
  Subtitles,
  PictureInPicture
} from 'lucide-react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ 
  url, 
  poster, 
  title, 
  onProgress, 
  onEnded, 
  autoplay = false,
  controls = true,
  subtitles = []
}) => {
  const [playing, setPlaying] = useState(autoplay);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [seeking, setSeeking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (playing) {
          setShowControls(false);
        }
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      };
    }
  }, [playing]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current?.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (progress) => {
    if (!seeking) {
      setPlayed(progress.played);
      setCurrentTime(progress.playedSeconds);
      onProgress?.(progress);
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleEnded = () => {
    setPlaying(false);
    onEnded?.();
  };

  const handleSkip = (seconds) => {
    const newTime = currentTime + seconds;
    playerRef.current?.seekTo(newTime);
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const qualities = ['auto', '1080p', '720p', '480p', '360p'];

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-black rounded-xl overflow-hidden group"
    >
      {/* Video Player */}
      <div className="relative aspect-video">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          onSeek={seconds => setCurrentTime(seconds)}
          config={{
            file: {
              attributes: {
                poster: poster,
              },
            },
          }}
        />

        {/* Overlay Controls */}
        <AnimatePresence>
          {showControls && controls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"
            >
              {/* Top Controls */}
              <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">{title}</h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-white hover:text-neon-blue transition-colors">
                    <PictureInPicture className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-white hover:text-neon-blue transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-white hover:text-neon-blue transition-colors">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  onClick={handlePlayPause}
                  className="w-20 h-20 bg-neon-blue/80 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-neon-blue transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {playing ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </motion.button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Progress Bar */}
                <div className="mb-4">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={played}
                    onChange={handleSeekChange}
                    onMouseDown={handleSeekMouseDown}
                    onMouseUp={handleSeekMouseUp}
                    className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #00d4ff 0%, #00d4ff ${played * 100}%, rgba(255,255,255,0.3) ${played * 100}%, rgba(255,255,255,0.3) 100%)`
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
                    {/* Skip Back */}
                    <button
                      onClick={() => handleSkip(-10)}
                      className="p-2 text-white hover:text-neon-blue transition-colors"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    {/* Play/Pause */}
                    <button
                      onClick={handlePlayPause}
                      className="p-2 text-white hover:text-neon-blue transition-colors"
                    >
                      {playing ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>

                    {/* Skip Forward */}
                    <button
                      onClick={() => handleSkip(10)}
                      className="p-2 text-white hover:text-neon-blue transition-colors"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleMute}
                        className="p-2 text-white hover:text-neon-blue transition-colors"
                      >
                        {muted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step="any"
                        value={muted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-black/30 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Subtitles */}
                    <button className="p-2 text-white hover:text-neon-blue transition-colors">
                      <Subtitles className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Settings */}
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">{playbackRate}x</span>
                    <button className="p-2 text-white hover:text-neon-blue transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: #00d4ff;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #00d4ff;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
