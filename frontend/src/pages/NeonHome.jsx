import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Info, TrendingUp, Clock, Award, Users, Star } from 'lucide-react';
import NeonNavbar from '../components/Neon/NeonNavbar';
import NeonCard from '../components/Neon/NeonCard';

const NeonHome = () => {
  const [loading, setLoading] = useState(true);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);

  // Sample content data
  const sampleContent = [
    {
      id: 1,
      title: "Neon Dreams",
      description: "A cyberpunk thriller set in a dystopian future where AI and humanity collide in an epic battle for survival.",
      posterUrl: "https://picsum.photos/seed/neon-dreams/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-dreams-bg/1920/1080",
      year: "2024",
      rating: "TV-MA",
      match: "98%",
      genre: "Sci-Fi",
      type: "series",
      duration: "45 min",
      seasons: "2 Seasons"
    },
    {
      id: 2,
      title: "Digital Revolution",
      description: "The story of how technology transformed our world and the pioneers who dared to dream of a digital future.",
      posterUrl: "https://picsum.photos/seed/digital-revolution/300/450",
      backdropUrl: "https://picsum.photos/seed/digital-revolution-bg/1920/1080",
      year: "2024",
      rating: "TV-14",
      match: "95%",
      genre: "Documentary",
      type: "series",
      duration: "50 min",
      seasons: "1 Season"
    },
    {
      id: 3,
      title: "Quantum Hearts",
      description: "A romantic sci-fi adventure across parallel universes where love transcends the boundaries of reality.",
      posterUrl: "https://picsum.photos/seed/quantum-hearts/300/450",
      backdropUrl: "https://picsum.photos/seed/quantum-hearts-bg/1920/1080",
      year: "2024",
      rating: "PG-13",
      match: "92%",
      genre: "Romance",
      type: "movie",
      duration: "2h 15min"
    },
    {
      id: 4,
      title: "Cyber Samurai",
      description: "In neo-Tokyo 2089, a lone warrior must protect the last human enclave from the AI uprising.",
      posterUrl: "https://picsum.photos/seed/cyber-samurai/300/450",
      backdropUrl: "https://picsum.photos/seed/cyber-samurai-bg/1920/1080",
      year: "2024",
      rating: "R",
      match: "96%",
      genre: "Action",
      type: "movie",
      duration: "2h 30min"
    },
    {
      id: 5,
      title: "Neon Nights",
      description: "A detective story set in the neon-lit streets of a futuristic metropolis where nothing is as it seems.",
      posterUrl: "https://picsum.photos/seed/neon-nights/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-nights-bg/1920/1080",
      year: "2024",
      rating: "TV-MA",
      match: "94%",
      genre: "Thriller",
      type: "series",
      duration: "55 min",
      seasons: "3 Seasons"
    },
    {
      id: 6,
      title: "Electric Dreams",
      description: "An anthology series exploring the boundaries between human consciousness and artificial intelligence.",
      posterUrl: "https://picsum.photos/seed/electric-dreams/300/450",
      backdropUrl: "https://picsum.photos/seed/electric-dreams-bg/1920/1080",
      year: "2024",
      rating: "TV-14",
      match: "91%",
      genre: "Sci-Fi",
      type: "series",
      duration: "48 min",
      seasons: "2 Seasons"
    },
    {
      id: 7,
      title: "Neon Genesis",
      description: "The origin story of how neon technology changed the world forever, from discovery to revolution.",
      posterUrl: "https://picsum.photos/seed/neon-genesis/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-genesis-bg/1920/1080",
      year: "2024",
      rating: "PG",
      match: "89%",
      genre: "History",
      type: "documentary",
      duration: "1h 45min"
    },
    {
      id: 8,
      title: "Digital Love",
      description: "When a programmer falls in love with his AI creation, he must choose between code and heart.",
      posterUrl: "https://picsum.photos/seed/digital-love/300/450",
      backdropUrl: "https://picsum.photos/seed/digital-love-bg/1920/1080",
      year: "2024",
      rating: "PG-13",
      match: "87%",
      genre: "Romance",
      type: "movie",
      duration: "1h 50min"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFeaturedContent(sampleContent.slice(0, 3));
      setTrendingContent(sampleContent.slice(0, 6));
      setNewReleases(sampleContent.slice(2, 8));
      setContinueWatching(sampleContent.slice(0, 4));
      setLoading(false);
    }, 1500);
  }, []);

  const handlePlay = (item) => {
    console.log('Playing:', item.title);
    // Navigate to watch page
  };

  const handleAddToList = (item) => {
    console.log('Adding to list:', item.title);
  };

  const handleLike = (item) => {
    console.log('Liking:', item.title);
  };

  const handleInfo = (item) => {
    console.log('Show info for:', item.title);
  };

  if (loading) {
    return (
      <div className="neon-loading">
        <div className="neon-spinner"></div>
        <div className="neon-loading-text">Loading Neon Universe...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <NeonNavbar />
      
      {/* Hero Section */}
      <section className="neon-hero">
        <div className="neon-hero-background">
          <img
            src={featuredContent[0]?.backdropUrl}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="neon-hero-overlay"></div>
        
        <motion.div 
          className="neon-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="neon-hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            STREAMFLIX
          </motion.h1>
          
          <motion.p 
            className="neon-hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Experience the Future of Entertainment
          </motion.p>
          
          <motion.div 
            className="neon-hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <button 
              className="neon-btn neon-btn-primary"
              onClick={() => handlePlay(featuredContent[0])}
            >
              <Play className="w-5 h-5 fill-current" />
              Start Watching
            </button>
            <button className="neon-btn neon-btn-secondary">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-400 mb-2" style={{ textShadow: '0 0 30px var(--neon-primary)' }}>
                25,000+
              </div>
              <div className="text-white/80 font-semibold">Movies & Shows</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-400 mb-2" style={{ textShadow: '0 0 30px var(--neon-secondary)' }}>
                4K HDR
              </div>
              <div className="text-white/80 font-semibold">Ultra Quality</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2" style={{ textShadow: '0 0 30px var(--neon-accent)' }}>
                200+
              </div>
              <div className="text-white/80 font-semibold">Countries</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Continue Watching */}
      {continueWatching.length > 0 && (
        <section className="neon-section">
          <h2 className="neon-section-title">Continue Watching</h2>
          <div className="neon-grid neon-grid-cols-4">
            {continueWatching.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NeonCard 
                  item={item} 
                  type="backdrop"
                  onPlay={handlePlay}
                  onAddToList={handleAddToList}
                  onLike={handleLike}
                  onInfo={handleInfo}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Trending Now */}
      <section className="neon-section">
        <h2 className="neon-section-title flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-cyan-400" style={{ filter: 'drop-shadow(0 0 20px var(--neon-primary))' }} />
          Trending Now
        </h2>
        <div className="neon-grid neon-grid-cols-6">
          {trendingContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NeonCard 
                item={item} 
                onPlay={handlePlay}
                onAddToList={handleAddToList}
                onLike={handleLike}
                onInfo={handleInfo}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="neon-section">
        <h2 className="neon-section-title flex items-center gap-3">
          <Star className="w-8 h-8 text-yellow-400" style={{ filter: 'drop-shadow(0 0 20px var(--neon-accent))' }} />
          New Releases
        </h2>
        <div className="neon-grid neon-grid-cols-4">
          {newReleases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NeonCard 
                item={item} 
                type="backdrop"
                onPlay={handlePlay}
                onAddToList={handleAddToList}
                onLike={handleLike}
                onInfo={handleInfo}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="neon-section">
        <h2 className="neon-section-title">Featured Categories</h2>
        <div className="neon-grid neon-grid-cols-3">
          {[
            { name: 'Sci-Fi Thrillers', icon: '🚀', color: 'cyan' },
            { name: 'Action Movies', icon: '💥', color: 'red' },
            { name: 'Romantic Stories', icon: '💕', color: 'pink' },
            { name: 'Documentaries', icon: '📽️', color: 'blue' },
            { name: 'Comedy Shows', icon: '😂', color: 'yellow' },
            { name: 'Horror Nights', icon: '👻', color: 'purple' }
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="neon-card cursor-pointer"
              style={{
                background: `linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)`,
                border: `1px solid ${category.color === 'cyan' ? 'var(--neon-primary)' : 
                          category.color === 'red' ? 'var(--neon-danger)' :
                          category.color === 'pink' ? 'var(--neon-secondary)' :
                          category.color === 'blue' ? 'var(--neon-info)' :
                          category.color === 'yellow' ? 'var(--neon-accent)' : 'var(--neon-purple)'}`
              }}
            >
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white/70 text-sm">Explore the best {category.name.toLowerCase()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="neon-footer">
        <div className="neon-footer-content">
          <div className="neon-footer-section">
            <h3>Company</h3>
            <div className="neon-footer-links">
              <a href="#" className="neon-footer-link">About Us</a>
              <a href="#" className="neon-footer-link">Careers</a>
              <a href="#" className="neon-footer-link">Press</a>
              <a href="#" className="neon-footer-link">Contact</a>
            </div>
          </div>
          
          <div className="neon-footer-section">
            <h3>View</h3>
            <div className="neon-footer-links">
              <a href="#" className="neon-footer-link">Website</a>
              <a href="#" className="neon-footer-link">Mobile App</a>
              <a href="#" className="neon-footer-link">Smart TV</a>
              <a href="#" className="neon-footer-link">Tablet</a>
            </div>
          </div>
          
          <div className="neon-footer-section">
            <h3>Legal</h3>
            <div className="neon-footer-links">
              <a href="#" className="neon-footer-link">Terms of Use</a>
              <a href="#" className="neon-footer-link">Privacy Policy</a>
              <a href="#" className="neon-footer-link">Cookie Policy</a>
            </div>
          </div>
          
          <div className="neon-footer-section">
            <h3>Connect</h3>
            <div className="neon-footer-links">
              <a href="#" className="neon-footer-link">Twitter</a>
              <a href="#" className="neon-footer-link">Instagram</a>
              <a href="#" className="neon-footer-link">Facebook</a>
              <a href="#" className="neon-footer-link">YouTube</a>
            </div>
          </div>
        </div>
        
        <div className="neon-footer-bottom">
          <div className="neon-footer-brand">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-black font-bold text-xl">
              S
            </div>
            STREAMFLIX
          </div>
          <div className="neon-footer-copyright">
            © 2024 Streamflix. All rights reserved. Neon Professional Platform.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NeonHome;
