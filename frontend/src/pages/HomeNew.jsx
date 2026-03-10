import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Star, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContentCard from '../components/ui/ContentCard';
import NeonButton from '../components/ui/NeonButton';
import { useDemoStore } from '../store/demoStore';
import { formatDuration } from '../utils/format';

function Home() {
  const navigate = useNavigate();
  const { 
    user, 
    featured, 
    trending, 
    continueWatching, 
    recommendations, 
    fetchFeatured, 
    fetchTrending, 
    fetchContinueWatching, 
    fetchRecommendations,
    loading 
  } = useDemoStore();

  const [activeSection, setActiveSection] = useState('featured');

  useEffect(() => {
    fetchFeatured(10);
    fetchTrending(10);
    if (user) {
      fetchContinueWatching();
      fetchRecommendations();
    }
  }, [user]);

  const sections = [
    { id: 'featured', title: 'Featured Content', data: featured },
    { id: 'trending', title: 'Trending Now', data: trending },
    { id: 'continue', title: 'Continue Watching', data: continueWatching, showProgress: true },
    { id: 'recommendations', title: 'Recommended for You', data: recommendations, requiresAuth: true },
  ];

  const handlePlay = (content) => {
    navigate(`/watch/${content.id}`);
  };

  const handleAddToWatchlist = (content) => {
    // Add to watchlist logic
    console.log('Added to watchlist:', content.title);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-6xl font-bold mb-6 neon-text-blue">
              Welcome to NeonStream
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Experience the future of entertainment with AI-powered recommendations, 
              immersive visuals, and a vast library of premium content.
            </p>
            <div className="flex gap-4">
              <NeonButton
                variant="accent"
                size="lg"
                onClick={() => navigate('/browse')}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Watching
              </NeonButton>
              <NeonButton
                variant="ghost"
                size="lg"
                onClick={() => navigate('/subscription')}
              >
                View Plans
              </NeonButton>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-neon-blue rotate-90" />
        </div>
      </section>

      {/* Content Sections */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Navigation */}
          <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: activeSection === section.id ? 1 : 0,
                y: activeSection === section.id ? 0 : 30
              }}
              transition={{ duration: 0.5 }}
              className={activeSection === section.id ? 'block' : 'hidden'}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">
                  {section.title}
                </h2>
                <NeonButton
                  variant="ghost"
                  onClick={() => navigate(`/browse?section=${section.id}`)}
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-2" />
                </NeonButton>
              </div>

              {section.requiresAuth && !user ? (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Sign in to see personalized recommendations
                  </h3>
                  <NeonButton onClick={() => navigate('/login')}>
                    Sign In
                  </NeonButton>
                </div>
              ) : section.data.length === 0 ? (
                <div className="text-center py-16">
                  <div className="loading-spinner mx-auto mb-4" />
                  <p className="text-gray-400">Loading content...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {section.data.map((content) => (
                    <ContentCard
                      key={content.id}
                      content={content}
                      onPlay={handlePlay}
                      onAddToWatchlist={handleAddToWatchlist}
                      showProgress={section.showProgress}
                      progress={content.progress || 0}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Why Choose NeonStream?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI-Powered</h3>
              <p className="text-gray-300">
                Smart recommendations powered by Google Gemini AI that learn your preferences
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Trending Content</h3>
              <p className="text-gray-300">
                Stay updated with the latest trending movies and shows in real-time
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Continue Watching</h3>
              <p className="text-gray-300">
                Pick up where you left off across all your devices seamlessly
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
