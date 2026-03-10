import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, ThumbsUp, ThumbsDown, Plus, Volume2, Settings } from 'lucide-react';
import VideoPlayer from '../components/ui/VideoPlayer';
import NeonButton from '../components/ui/NeonButton';
import { useDemoStore } from '../store/demoStore';
import { formatDuration, formatDate } from '../utils/format';

function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    user, 
    currentContent, 
    fetchContentById, 
    rateContent, 
    updateViewingHistory 
  } = useDemoStore();
  
  const [showControls, setShowControls] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [relatedContent, setRelatedContent] = useState([]);

  useEffect(() => {
    if (id) {
      fetchContentById(id);
      // Fetch related content
      // fetchSimilarContent(id);
    }
  }, [id]);

  const handlePlay = () => {
    // Start playing logic
  };

  const handlePause = () => {
    // Pause logic
  };

  const handleProgress = (progress) => {
    // Update viewing history
    if (user && currentContent) {
      updateViewingHistory(
        currentContent.id,
        null,
        Math.floor(progress.playedSeconds),
        Math.floor(progress.loadedSeconds),
        progress.played >= 0.9
      );
    }
  };

  const handleEnded = () => {
    // Mark as completed
    if (user && currentContent) {
      updateViewingHistory(currentContent.id, null, 0, 0, true);
    }
  };

  const handleRate = (rating) => {
    if (user && currentContent) {
      setUserRating(rating);
      rateContent(currentContent.id, rating);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${currentContent?.title} on NeonStream!`;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  if (!currentContent) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Video Player Section */}
      <div className="relative">
        <VideoPlayer
          url={currentContent.video_url}
          poster={currentContent.backdrop_url}
          title={currentContent.title}
          onProgress={handleProgress}
          onEnded={handleEnded}
          controls={true}
        />

        {/* Custom Overlay Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Top Bar */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <NeonButton
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(-1)}
                      className="text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </NeonButton>
                    <h1 className="text-white font-semibold text-lg">{currentContent.title}</h1>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      className="p-2 text-white hover:text-neon-blue transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share Options Dropdown */}
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 right-4 bg-primary-800 rounded-lg p-2 shadow-xl z-50"
          >
            <button
              onClick={() => handleShare('twitter')}
              className="w-full text-left px-3 py-2 text-white hover:bg-primary-700 rounded"
            >
              Twitter
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="w-full text-left px-3 py-2 text-white hover:bg-primary-700 rounded"
            >
              Facebook
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="w-full text-left px-3 py-2 text-white hover:bg-primary-700 rounded"
            >
              WhatsApp
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="w-full text-left px-3 py-2 text-white hover:bg-primary-700 rounded"
            >
              Copy Link
            </button>
          </motion.div>
        )}
      </div>

      {/* Content Details Section */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4">{currentContent.title}</h1>
              
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
                {currentContent.release_year && (
                  <span>{currentContent.release_year}</span>
                )}
                {currentContent.rating && (
                  <span className="px-2 py-1 bg-primary-600 rounded text-sm">
                    {currentContent.rating}
                  </span>
                )}
                {currentContent.duration_minutes && (
                  <span>{formatDuration(currentContent.duration_minutes)}</span>
                )}
                {currentContent.language && (
                  <span>{currentContent.language.toUpperCase()}</span>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentContent.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">{currentContent.description}</p>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-4 mb-8">
                <NeonButton
                  variant="accent"
                  onClick={handlePlay}
                >
                  Play Now
                </NeonButton>
                
                {user && (
                  <NeonButton
                    variant="ghost"
                    onClick={() => {/* Add to watchlist */}}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Watchlist
                  </NeonButton>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">Rate:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRate(star)}
                        className="text-2xl transition-colors"
                        style={{
                          color: star <= userRating ? '#fbbf24' : '#4b5563'
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cast & Crew */}
              {currentContent.cast_members && currentContent.cast_members.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {currentContent.cast_members.slice(0, 6).map((person) => (
                      <div key={person.id} className="flex items-center gap-3">
                        <img
                          src={person.photo_url || '/placeholder-avatar.jpg'}
                          alt={person.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white font-medium">{person.name}</p>
                          <p className="text-gray-400 text-sm">Actor</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Ratings */}
              <div className="bg-primary-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Ratings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">User Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white font-semibold">
                        {currentContent.user_rating?.toFixed(1) || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">IMDb Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white font-semibold">
                        {currentContent.imdb_rating?.toFixed(1) || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="bg-primary-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Details</h3>
                <div className="space-y-3">
                  {currentContent.country && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Country</span>
                      <span className="text-white">{currentContent.country}</span>
                    </div>
                  )}
                  {currentContent.release_year && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Release Year</span>
                      <span className="text-white">{currentContent.release_year}</span>
                    </div>
                  )}
                  {currentContent.duration_minutes && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Duration</span>
                      <span className="text-white">{formatDuration(currentContent.duration_minutes)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Similar Content */}
              {relatedContent.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Similar Content</h3>
                  <div className="space-y-3">
                    {relatedContent.slice(0, 3).map((content) => (
                      <div
                        key={content.id}
                        className="flex gap-3 cursor-pointer hover:bg-primary-800 p-2 rounded-lg transition-colors"
                        onClick={() => navigate(`/watch/${content.id}`)}
                      >
                        <img
                          src={content.poster_url}
                          alt={content.title}
                          className="w-16 h-24 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-medium line-clamp-1">{content.title}</h4>
                          <p className="text-gray-400 text-sm line-clamp-2">{content.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;
