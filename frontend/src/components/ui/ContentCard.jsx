import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, Plus, ChevronRight } from 'lucide-react';
import { formatDuration } from '../utils/format';

const ContentCard = ({ 
  content, 
  onPlay, 
  onAddToWatchlist, 
  isInWatchlist = false,
  showProgress = false,
  progress = 0,
  variant = 'default'
}) => {
  const cardVariants = {
    default: 'w-64 h-96',
    compact: 'w-48 h-72',
    banner: 'w-full h-64'
  };

  return (
    <motion.div
      className={`relative group cursor-pointer overflow-hidden rounded-xl ${cardVariants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={content.poster_url}
          alt={content.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/90 via-primary-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Progress Bar */}
      {showProgress && progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
          <div 
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Content Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-neon-blue transition-colors">
          {content.title}
        </h3>
        
        <div className="flex items-center gap-3 text-sm opacity-90">
          {content.rating && (
            <span className="px-2 py-1 bg-black/30 rounded text-xs">
              {content.rating}
            </span>
          )}
          
          {content.duration_minutes && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(content.duration_minutes)}
            </span>
          )}
          
          {content.user_rating && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {content.user_rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {content.genres?.slice(0, 2).map((genre) => (
            <span
              key={genre.id}
              className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-xs rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Actions */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-3">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(content);
            }}
            className="w-14 h-14 bg-neon-blue rounded-full flex items-center justify-center shadow-lg shadow-neon-blue/50 hover:shadow-xl hover:shadow-neon-blue/70 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="w-6 h-6 text-white ml-1" />
          </motion.button>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onAddToWatchlist(content);
            }}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isInWatchlist 
                ? 'bg-green-500 shadow-green-500/50 hover:shadow-green-500/70' 
                : 'bg-neon-purple shadow-neon-purple/50 hover:shadow-xl hover:shadow-neon-purple/70'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isInWatchlist ? (
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-sm" />
              </div>
            ) : (
              <Plus className="w-6 h-6 text-white" />
            )}
          </motion.button>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to details
            }}
            className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center shadow-lg shadow-primary-600/50 hover:shadow-xl hover:shadow-primary-600/70 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Featured Badge */}
      {content.is_featured && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-neon-pink to-neon-purple text-white text-xs font-bold rounded-full">
          FEATURED
        </div>
      )}

      {/* Trending Badge */}
      {content.is_trending && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-neon-orange to-red-500 text-white text-xs font-bold rounded-full animate-pulse">
          TRENDING
        </div>
      )}
    </motion.div>
  );
};

export default ContentCard;
