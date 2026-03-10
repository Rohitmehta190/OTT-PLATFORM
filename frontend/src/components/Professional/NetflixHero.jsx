import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

const NetflixHero = ({ content, autoPlay = true }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  // Sample hero content (in production, this would come from props/API)
  const heroContent = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      type: "Series",
      maturity: "TV-14",
      year: "2016",
      duration: "4 Seasons",
      rating: "8.7",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      backdrop: "https://images.unsplash.com/photo-1594908900066-3f47337549d0?w=1920&h=1080&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png"
    },
    {
      id: 2,
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
      type: "Series",
      maturity: "TV-MA",
      year: "2016",
      duration: "6 Seasons",
      rating: "8.6",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      backdrop: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/5a/The_Crown_logo.png"
    },
    {
      id: 3,
      title: "The Witcher",
      description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
      type: "Series",
      maturity: "TV-MA",
      year: "2019",
      duration: "3 Seasons",
      rating: "8.2",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/en/6/6c/The_Witcher_logo.png"
    }
  ];

  const currentHero = heroContent[currentSlide];

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(err => console.log("Autoplay prevented:", err));
    }
  }, [currentSlide, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroContent.length) % heroContent.length);
  };

  const handleVideoEnd = () => {
    nextSlide();
  };

  return (
    <div className="hero relative h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="hero-background">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={currentHero.videoUrl}
          muted={isMuted}
          loop={!isPlaying}
          autoPlay={autoPlay}
          onEnded={handleVideoEnd}
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Hero Content */}
      <div className="hero-content">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Logo */}
          <motion.img
            src={currentHero.logo}
            alt={currentHero.title}
            className="h-16 md:h-24 mb-6 object-contain"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-400 font-semibold">98% Match</span>
            <span className="text-white/70">{currentHero.year}</span>
            <span className="border border-white/60 px-1 py-0.5 text-xs text-white">{currentHero.maturity}</span>
            <span className="text-white/70">{currentHero.duration}</span>
            <span className="border border-white/60 px-1 py-0.5 text-xs text-white">HD</span>
          </div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mb-6 line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {currentHero.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              onClick={handlePlay}
              className="btn btn-primary btn-lg flex items-center gap-2 bg-white text-black hover:bg-gray-200"
            >
              <Play className="w-5 h-5" fill="black" />
              Play
            </button>
            <button className="btn btn-secondary btn-lg flex items-center gap-2 bg-gray-600/80 text-white hover:bg-gray-500">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </motion.div>

          {/* Genres */}
          <motion.div
            className="flex gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <span className="text-white/70 text-sm">Genres:</span>
            <span className="text-white/90 text-sm">Drama</span>
            <span className="text-white/90 text-sm">Sci-Fi</span>
            <span className="text-white/90 text-sm">Thriller</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        <button
          onClick={handleMuteToggle}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        
        {/* Age Rating Badge */}
        <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
          {currentHero.maturity}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Maturity Rating Popup */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-24 left-8 bg-black/90 backdrop-blur-md p-4 rounded-lg max-w-xs"
          >
            <h4 className="text-white font-semibold mb-2">Age Rating: {currentHero.maturity}</h4>
            <p className="text-gray-300 text-sm">
              This content is suitable for viewers aged {currentHero.maturity === 'TV-14' ? '14' : '17'} and above.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NetflixHero;
