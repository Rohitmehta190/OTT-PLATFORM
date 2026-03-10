import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Info, Plus, ThumbsUp } from 'lucide-react';

const ContentCarousel = ({ 
  title, 
  items, 
  type = 'poster', 
  showArrows = true, 
  autoScroll = false,
  scrollSpeed = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);

  const itemsPerView = type === 'poster' ? 6 : 5;
  const maxIndex = Math.max(0, items.length - itemsPerView);

  useEffect(() => {
    if (autoScroll && !isHovered) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= maxIndex) return 0;
          return prev + 1;
        });
      }, scrollSpeed);
    } else {
      clearInterval(autoScrollRef.current);
    }

    return () => clearInterval(autoScrollRef.current);
  }, [autoScroll, isHovered, maxIndex, scrollSpeed]);

  const scroll = (direction) => {
    if (direction === 'left') {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    } else {
      setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
    }
  };

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
  };

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    // Navigate to detail page
  };

  const renderPosterCard = (item, index) => (
    <motion.div
      key={item.id}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item)}
      layoutId={`card-${item.id}`}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={item.posterUrl || `https://picsum.photos/seed/${item.id}/300/450`}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Overlay */}
        <AnimatePresence>
          {hoveredItem === item.id && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col justify-end p-4"
            >
              <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{item.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-400 text-xs font-semibold">{item.match || '98%'} Match</span>
                <span className="text-white/70 text-xs">{item.year || '2024'}</span>
                <span className="border border-white/60 px-1 py-0.5 text-xs text-white">{item.rating || 'PG-13'}</span>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Play className="w-4 h-4 text-black" fill="black" />
                </button>
                <button className="w-8 h-8 bg-gray-600/80 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
                  <Plus className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 bg-gray-600/80 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
                  <ThumbsUp className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Title */}
      <div className="mt-2">
        <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">
          {item.title}
        </h4>
      </div>
    </motion.div>
  );

  const renderBackdropCard = (item, index) => (
    <motion.div
      key={item.id}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => handleItemClick(item)}
      layoutId={`card-${item.id}`}
    >
      {/* Backdrop Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <img
          src={item.backdropUrl || `https://picsum.photos/seed/${item.id}/800/450`}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Overlay */}
        <AnimatePresence>
          {hoveredItem === item.id && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col justify-center items-center p-4"
            >
              <h3 className="text-white font-bold text-lg mb-2 text-center">{item.title}</h3>
              <p className="text-gray-300 text-sm text-center line-clamp-3 mb-4">{item.description}</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4" fill="black" />
                  Play
                </button>
                <button className="px-4 py-2 bg-gray-600/80 text-white rounded font-semibold hover:bg-gray-500 transition-colors flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  More Info
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Title */}
      <div className="mt-2">
        <h4 className="text-white text-sm font-medium line-clamp-1 group-hover:text-blue-400 transition-colors">
          {item.title}
        </h4>
      </div>
    </motion.div>
  );

  return (
    <div className="content-row">
      {/* Header */}
      <div className="content-row-header">
        <h2 className="content-row-title">{title}</h2>
        {showArrows && items.length > itemsPerView && (
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                currentIndex === 0 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={currentIndex === maxIndex}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                currentIndex === maxIndex 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Carousel Container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-hidden"
          style={{
            transform: `translateX(-${currentIndex * (type === 'poster' ? 200 : 300)}px)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0"
              style={{ width: type === 'poster' ? '200px' : '300px' }}
            >
              {type === 'poster' ? renderPosterCard(item, index) : renderBackdropCard(item, index)}
            </div>
          ))}
        </div>

        {/* Gradient Fades */}
        {currentIndex > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        )}
        {currentIndex < maxIndex && (
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        )}
      </div>

      {/* Progress Indicators */}
      {items.length > itemsPerView && (
        <div className="flex gap-2 mt-4 justify-center">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentCarousel;
