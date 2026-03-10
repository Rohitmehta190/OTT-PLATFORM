import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, Info } from 'lucide-react';

const NetflixCard = ({ item, onPlay, onAddToList, onLike, onInfo }) => {
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

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInfo}
    >
      {/* Card Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-md">
        <img
          src={item.posterUrl || `https://picsum.photos/seed/${item.id}/400/225`}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Content Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
            
            {/* Metadata */}
            <div className="flex items-center gap-3 mb-3 text-sm">
              <span className="text-green-400 font-semibold">{item.match || '98%'} Match</span>
              <span className="text-white/80">{item.year || '2024'}</span>
              <span className="border border-gray-400 px-2 py-1 text-xs text-white rounded">
                {item.rating || 'TV-MA'}
              </span>
              {item.duration && (
                <span className="text-white/60">{item.duration}</span>
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
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Play className="w-4 h-4 text-black fill-black" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToList();
                }}
                className="w-10 h-10 bg-gray-700/80 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className="w-10 h-10 bg-gray-700/80 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all transform hover:scale-110"
          >
            <Play className="w-6 h-6 text-white fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetflixCard;
