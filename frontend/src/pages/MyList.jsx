import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Play, Plus, ThumbsUp, Info, Grid, List, Star, Clock, Calendar, Heart, Trash2 } from 'lucide-react';
import NeonNavbar from '../components/Neon/NeonNavbar';
import NeonCard from '../components/Neon/NeonCard';

const MyList = () => {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recently');
  const [myListContent, setMyListContent] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // My List content data
  const myListData = [
    {
      id: 1,
      title: "Neon Dreams",
      description: "A cyberpunk thriller set in a dystopian future where AI and humanity collide in an epic battle for survival.",
      posterUrl: "https://picsum.photos/seed/neon-dreams-list/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-dreams-list-bg/800/450",
      year: "2024",
      rating: "TV-MA",
      match: "98%",
      genre: "Sci-Fi",
      type: "series",
      duration: "45 min",
      seasons: "2 Seasons",
      addedDate: "2024-03-01",
      watchedProgress: "65%",
      lastWatched: "2 days ago",
      favorite: true
    },
    {
      id: 2,
      title: "Cyber Samurai",
      description: "In neo-Tokyo 2089, a lone warrior must protect the last human enclave from the AI uprising.",
      posterUrl: "https://picsum.photos/seed/cyber-samurai-list/300/450",
      backdropUrl: "https://picsum.photos/seed/cyber-samurai-list-bg/800/450",
      year: "2024",
      rating: "R",
      match: "96%",
      genre: "Action",
      type: "movie",
      duration: "2h 30min",
      addedDate: "2024-02-28",
      watchedProgress: "100%",
      lastWatched: "1 week ago",
      favorite: true
    },
    {
      id: 3,
      title: "Quantum Hearts",
      description: "A romantic sci-fi adventure across parallel universes where love transcends the boundaries of reality.",
      posterUrl: "https://picsum.photos/seed/quantum-hearts-list/300/450",
      backdropUrl: "https://picsum.photos/seed/quantum-hearts-list-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "92%",
      genre: "Romance",
      type: "movie",
      duration: "2h 15min",
      addedDate: "2024-02-25",
      watchedProgress: "0%",
      lastWatched: "Not watched",
      favorite: false
    },
    {
      id: 4,
      title: "Electric Dreams",
      description: "An anthology series exploring the boundaries between human consciousness and artificial intelligence.",
      posterUrl: "https://picsum.photos/seed/electric-dreams-list/300/450",
      backdropUrl: "https://picsum.photos/seed/electric-dreams-list-bg/800/450",
      year: "2024",
      rating: "TV-14",
      match: "91%",
      genre: "Sci-Fi",
      type: "series",
      duration: "48 min",
      seasons: "2 Seasons",
      addedDate: "2024-02-20",
      watchedProgress: "30%",
      lastWatched: "3 weeks ago",
      favorite: false
    },
    {
      id: 5,
      title: "Neon Warriors",
      description: "Elite fighters compete in neon-lit arenas using advanced technology and martial arts.",
      posterUrl: "https://picsum.photos/seed/neon-warriors-list/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-warriors-list-bg/800/450",
      year: "2024",
      rating: "R",
      match: "93%",
      genre: "Action",
      type: "series",
      duration: "50 min",
      seasons: "3 Seasons",
      addedDate: "2024-02-15",
      watchedProgress: "85%",
      lastWatched: "4 days ago",
      favorite: true
    },
    {
      id: 6,
      title: "Digital Love",
      description: "When a programmer falls in love with his AI creation, he must choose between code and heart.",
      posterUrl: "https://picsum.photos/seed/digital-love-list/300/450",
      backdropUrl: "https://picsum.photos/seed/digital-love-list-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "87%",
      genre: "Romance",
      type: "movie",
      duration: "1h 50min",
      addedDate: "2024-02-10",
      watchedProgress: "100%",
      lastWatched: "2 weeks ago",
      favorite: false
    },
    {
      id: 7,
      title: "Neon Academy",
      description: "Follow the lives of students at an elite academy where they learn to control neon powers.",
      posterUrl: "https://picsum.photos/seed/neon-academy-list/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-academy-list-bg/800/450",
      year: "2024",
      rating: "TV-14",
      match: "89%",
      genre: "Drama",
      type: "series",
      duration: "42 min",
      seasons: "2 Seasons",
      addedDate: "2024-02-05",
      watchedProgress: "45%",
      lastWatched: "1 month ago",
      favorite: false
    },
    {
      id: 8,
      title: "Neon Comedy",
      description: "A hilarious comedy about a group of friends navigating life in a futuristic neon city.",
      posterUrl: "https://picsum.photos/seed/neon-comedy-list/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-comedy-list-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "84%",
      genre: "Comedy",
      type: "movie",
      duration: "1h 45min",
      addedDate: "2024-02-01",
      watchedProgress: "0%",
      lastWatched: "Not watched",
      favorite: true
    }
  ];

  const sortOptions = [
    { value: 'recently', label: 'Recently Added' },
    { value: 'watched', label: 'Recently Watched' },
    { value: 'progress', label: 'Watch Progress' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'favorites', label: 'Favorites First' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setMyListContent(myListData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let sorted = [...myListContent];

    // Sort content
    switch (sortBy) {
      case 'recently':
        sorted.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        break;
      case 'watched':
        sorted.sort((a, b) => {
          if (a.lastWatched === 'Not watched') return 1;
          if (b.lastWatched === 'Not watched') return -1;
          return 0;
        });
        break;
      case 'progress':
        sorted.sort((a, b) => parseInt(b.watchedProgress) - parseInt(a.watchedProgress));
        break;
      case 'alphabetical':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        sorted.sort((a, b) => parseInt(b.match) - parseInt(a.match));
        break;
      case 'favorites':
        sorted.sort((a, b) => {
          if (a.favorite && !b.favorite) return -1;
          if (!a.favorite && b.favorite) return 1;
          return 0;
        });
        break;
      default:
        break;
    }

    setMyListContent(sorted);
  }, [sortBy]);

  const handlePlay = (item) => {
    console.log('Playing:', item.title);
  };

  const handleRemoveFromList = (item) => {
    setMyListContent(prev => prev.filter(content => content.id !== item.id));
    console.log('Removed from list:', item.title);
  };

  const handleToggleFavorite = (item) => {
    setMyListContent(prev => prev.map(content => 
      content.id === item.id 
        ? { ...content, favorite: !content.favorite }
        : content
    ));
  };

  const handleInfo = (item) => {
    console.log('Info for:', item.title);
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBulkRemove = () => {
    setMyListContent(prev => prev.filter(content => !selectedItems.includes(content.id)));
    setSelectedItems([]);
  };

  const getProgressColor = (progress) => {
    const value = parseInt(progress);
    if (value === 100) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="neon-loading">
        <div className="neon-spinner"></div>
        <div className="neon-loading-text">Loading Your List...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <NeonNavbar />
      
      {/* Header */}
      <section className="neon-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Bookmark className="w-12 h-12 text-purple-400" style={{ filter: 'drop-shadow(0 0 30px var(--neon-secondary))' }} />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              MY LIST
            </h1>
          </div>
          <p className="text-xl text-purple-300 max-w-2xl mx-auto">
            Your personal collection of saved movies and TV shows
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="neon-card text-center p-6 bg-gradient-to-br from-purple-400/10 to-pink-500/10 border-purple-400/30">
            <Bookmark className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-purple-400 mb-1">Total Items</h3>
            <div className="text-2xl font-bold text-purple-300">{myListContent.length}</div>
          </div>
          
          <div className="neon-card text-center p-6 bg-gradient-to-br from-green-400/10 to-emerald-500/10 border-green-400/30">
            <Play className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-400 mb-1">Watched</h3>
            <div className="text-2xl font-bold text-green-300">
              {myListContent.filter(item => item.watchedProgress === '100%').length}
            </div>
          </div>
          
          <div className="neon-card text-center p-6 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border-yellow-400/30">
            <Clock className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-yellow-400 mb-1">In Progress</h3>
            <div className="text-2xl font-bold text-yellow-300">
              {myListContent.filter(item => item.watchedProgress > '0%' && item.watchedProgress < '100%').length}
            </div>
          </div>
          
          <div className="neon-card text-center p-6 bg-gradient-to-br from-red-400/10 to-pink-500/10 border-red-400/30">
            <Heart className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-red-400 mb-1">Favorites</h3>
            <div className="text-2xl font-bold text-red-300">
              {myListContent.filter(item => item.favorite).length}
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Sort Options */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="neon-search-input pr-10 appearance-none cursor-pointer"
                style={{ backgroundImage: 'none' }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-purple-300 text-sm">
                  {selectedItems.length} selected
                </span>
                <button
                  onClick={handleBulkRemove}
                  className="neon-btn neon-btn-danger px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove Selected
                </button>
              </div>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-1 border border-purple-400/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid' 
                  ? 'bg-purple-400 text-black' 
                  : 'text-purple-400 hover:bg-purple-400/20'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list' 
                  ? 'bg-purple-400 text-black' 
                  : 'text-purple-400 hover:bg-purple-400/20'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-purple-300">
          <span className="font-semibold">{myListContent.length}</span> Items in Your List
        </div>

        {/* Content Grid/List */}
        {viewMode === 'grid' ? (
          <div className="neon-grid neon-grid-cols-5">
            {myListContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                  {/* Checkbox for selection */}
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-5 h-5 rounded border-purple-400 bg-gray-900 text-purple-400 focus:ring-purple-400 focus:ring-2"
                    />
                  </div>

                  {/* Favorite Badge */}
                  {item.favorite && (
                    <div className="absolute top-2 right-2 z-10">
                      <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div 
                      className={`h-full ${getProgressColor(item.watchedProgress)}`}
                      style={{ width: item.watchedProgress }}
                    />
                  </div>

                  <NeonCard 
                    item={item} 
                    onPlay={handlePlay}
                    onAddToList={() => handleRemoveFromList(item)}
                    onLike={() => handleToggleFavorite(item)}
                    onInfo={handleInfo}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {myListContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="neon-card flex gap-6 p-6"
              >
                {/* Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-5 h-5 rounded border-purple-400 bg-gray-900 text-purple-400 focus:ring-purple-400 focus:ring-2"
                  />
                </div>

                {/* Poster */}
                <div className="w-48 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        {item.favorite && (
                          <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-purple-300 mb-2">
                        <span>{item.year}</span>
                        <span>•</span>
                        <span>{item.type === 'movie' ? item.duration : `${item.seasons}`}</span>
                        <span>•</span>
                        <span className="text-green-400">{item.match} Match</span>
                        <span>•</span>
                        <span>Added {item.addedDate}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <span className="text-cyan-400">Last watched: {item.lastWatched}</span>
                        <span className="text-yellow-400">Progress: {item.watchedProgress}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePlay(item)}
                        className="neon-btn neon-btn-secondary px-4 py-2 text-sm"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Play
                      </button>
                      <button
                        onClick={() => handleToggleFavorite(item)}
                        className={`neon-btn px-4 py-2 text-sm ${
                          item.favorite 
                            ? 'neon-btn-danger' 
                            : 'neon-btn-secondary'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${item.favorite ? 'fill-current' : ''}`} />
                        {item.favorite ? 'Favorited' : 'Favorite'}
                      </button>
                      <button
                        onClick={() => handleRemoveFromList(item)}
                        className="neon-btn neon-btn-danger px-4 py-2 text-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-white/80 line-clamp-2 mb-3">{item.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="neon-badge neon-badge-secondary">{item.genre}</span>
                    <span className="neon-badge neon-badge-primary">{item.rating}</span>
                    <span className="text-purple-400">{item.type}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                      <span>Watch Progress</span>
                      <span>{item.watchedProgress}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColor(item.watchedProgress)} transition-all duration-300`}
                        style={{ width: item.watchedProgress }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="neon-footer">
        <div className="neon-footer-bottom">
          <div className="neon-footer-brand">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-black font-bold text-xl">
              S
            </div>
            STREAMFLIX
          </div>
          <div className="neon-footer-copyright">
            © 2024 Streamflix. Your Personal Collection.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyList;
