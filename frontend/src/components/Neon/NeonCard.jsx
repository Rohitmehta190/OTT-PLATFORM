import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, Info, Star, Clock, Calendar } from 'lucide-react';

const NeonCard = ({ item, type = 'poster', onPlay, onAddToList, onLike, onInfo }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    if (onPlay) onPlay(item);
  };

  const handleAddToList = () => {
    if (onAddToList) onAddToList(item);
  };

  const handleLike = () => {
    if (onLike) onLike(item);
  };

  const handleInfo = () => {
    if (onInfo) onInfo(item);
  };

  const renderPosterCard = () => (
    <div 
      className="neon-card cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInfo}
    >
      <div className="neon-card-image">
        <img
          src={item.posterUrl || `https://picsum.photos/seed/${item.id}/300/450`}
          alt={item.title}
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className={`neon-card-overlay ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full">
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
            
            {/* Metadata */}
            <div className="flex items-center gap-3 mb-3 text-sm">
              <span className="text-green-400 font-semibold">{item.match || '98%'} Match</span>
              <span className="text-white/80">{item.year || '2024'}</span>
              <span className="border border-cyan-400 px-2 py-1 text-xs text-cyan-400 rounded">
                {item.rating || 'TV-MA'}
              </span>
              {item.duration && (
                <span className="text-white/60 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.duration}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/80 text-sm line-clamp-2 mb-4">
              {item.description || 'Click to watch this amazing content...'}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay();
                }}
                className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-black hover:shadow-[0_0_20px_var(--neon-primary)] transition-all"
              >
                <Play className="w-4 h-4 fill-black" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToList();
                }}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:shadow-[0_0_20px_var(--neon-secondary)] transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-black hover:shadow-[0_0_20px_var(--neon-success)] transition-all"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
            </div>

            {/* Rating */}
            {item.rating && (
              <div className="flex items-center gap-1 mt-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 text-sm font-semibold">{item.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="neon-card-content">
        <h3 className="neon-card-title line-clamp-2">{item.title}</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-cyan-400">{item.year || '2024'}</span>
          <span className="text-white/60">•</span>
          <span className="text-white/80">{item.genre || 'Action'}</span>
        </div>
      </div>
    </div>
  );

  const renderBackdropCard = () => (
    <div 
      className="neon-card cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInfo}
    >
      <div className="neon-card-image">
        <img
          src={item.backdropUrl || `https://picsum.photos/seed/${item.id}/800/450`}
          alt={item.title}
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className={`neon-card-overlay ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full">
            <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
            
            {/* Metadata */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-green-400 font-semibold">{item.match || '98%'} Match</span>
              <span className="text-white/80">{item.year || '2024'}</span>
              <span className="border border-cyan-400 px-2 py-1 text-xs text-cyan-400 rounded">
                {item.rating || 'TV-MA'}
              </span>
              {item.duration && (
                <span className="text-white/60 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.duration}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/80 line-clamp-3 mb-4">
              {item.description || 'Click to watch this amazing content...'}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay();
                }}
                className="neon-btn neon-btn-primary flex items-center gap-2 px-6 py-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Play
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleInfo();
                }}
                className="neon-btn neon-btn-secondary flex items-center gap-2 px-6 py-2"
              >
                <Info className="w-4 h-4" />
                More Info
              </button>
            </div>

            {/* Rating */}
            {item.rating && (
              <div className="flex items-center gap-1 mt-3">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 font-semibold">{item.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="neon-card-content">
        <h3 className="neon-card-title">{item.title}</h3>
        <p className="neon-card-description line-clamp-2">
          {item.description || 'Click to watch this amazing content...'}
        </p>
        <div className="flex items-center gap-3 text-sm mt-2">
          <span className="text-cyan-400">{item.year || '2024'}</span>
          <span className="text-white/60">•</span>
          <span className="text-white/80">{item.genre || 'Action'}</span>
          <span className="text-white/60">•</span>
          <span className="text-green-400">{item.match || '98%'} Match</span>
        </div>
      </div>
    </div>
  );

  return type === 'backdrop' ? renderBackdropCard() : renderPosterCard();
};

export default NeonCard;
