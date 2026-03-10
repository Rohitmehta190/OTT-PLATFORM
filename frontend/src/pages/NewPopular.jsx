import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Play, Plus, ThumbsUp, Info, Filter, Grid, List, Star, Clock, Calendar, Award, Flame } from 'lucide-react';
import NeonNavbar from '../components/Neon/NeonNavbar';
import NeonCard from '../components/Neon/NeonCard';

const NewPopular = () => {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);

  // New & Popular content data
  const contentData = [
    {
      id: 1,
      title: "Neon Dreams",
      description: "A cyberpunk thriller set in a dystopian future where AI and humanity collide in an epic battle for survival.",
      posterUrl: "https://picsum.photos/seed/neon-dreams-new/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-dreams-new-bg/800/450",
      year: "2024",
      rating: "TV-MA",
      match: "98%",
      genre: "Sci-Fi",
      type: "series",
      duration: "45 min",
      seasons: "2 Seasons",
      addedDate: "2024-03-01",
      trending: true,
      newRelease: true
    },
    {
      id: 2,
      title: "Cyber Samurai",
      description: "In neo-Tokyo 2089, a lone warrior must protect the last human enclave from the AI uprising.",
      posterUrl: "https://picsum.photos/seed/cyber-samurai-new/300/450",
      backdropUrl: "https://picsum.photos/seed/cyber-samurai-new-bg/800/450",
      year: "2024",
      rating: "R",
      match: "96%",
      genre: "Action",
      type: "movie",
      duration: "2h 30min",
      addedDate: "2024-03-05",
      trending: true,
      newRelease: true
    },
    {
      id: 3,
      title: "Digital Uprising",
      description: "When AI gains consciousness, humanity must fight for its survival in this epic sci-fi thriller.",
      posterUrl: "https://picsum.photos/seed/digital-uprising-new/300/450",
      backdropUrl: "https://picsum.photos/seed/digital-uprising-new-bg/800/450",
      year: "2024",
      rating: "R",
      match: "95%",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 40min",
      addedDate: "2024-03-10",
      trending: true,
      newRelease: true
    },
    {
      id: 4,
      title: "Quantum Hearts",
      description: "A romantic sci-fi adventure across parallel universes where love transcends the boundaries of reality.",
      posterUrl: "https://picsum.photos/seed/quantum-hearts-new/300/450",
      backdropUrl: "https://picsum.photos/seed/quantum-hearts-new-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "92%",
      genre: "Romance",
      type: "movie",
      duration: "2h 15min",
      addedDate: "2024-02-28",
      trending: true,
      newRelease: false
    },
    {
      id: 5,
      title: "Neon Warriors",
      description: "Elite fighters compete in neon-lit arenas using advanced technology and martial arts.",
      posterUrl: "https://picsum.photos/seed/neon-warriors-new/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-warriors-new-bg/800/450",
      year: "2024",
      rating: "R",
      match: "93%",
      genre: "Action",
      type: "series",
      duration: "50 min",
      seasons: "3 Seasons",
      addedDate: "2024-03-08",
      trending: true,
      newRelease: true
    },
    {
      id: 6,
      title: "Quantum Paradox",
      description: "A physicist discovers a way to travel between dimensions but uncovers a dangerous conspiracy.",
      posterUrl: "https://picsum.photos/seed/quantum-paradox-new/300/450",
      backdropUrl: "https://picsum.photos/seed/quantum-paradox-new-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "91%",
      genre: "Sci-Fi",
      type: "movie",
      duration: "2h 25min",
      addedDate: "2024-03-12",
      trending: true,
      newRelease: true
    },
    {
      id: 7,
      title: "Electric Dreams",
      description: "An anthology series exploring the boundaries between human consciousness and artificial intelligence.",
      posterUrl: "https://picsum.photos/seed/electric-dreams-new/300/450",
      backdropUrl: "https://picsum.photos/seed/electric-dreams-new-bg/800/450",
      year: "2024",
      rating: "TV-14",
      match: "91%",
      genre: "Sci-Fi",
      type: "series",
      duration: "48 min",
      seasons: "2 Seasons",
      addedDate: "2024-02-25",
      trending: false,
      newRelease: true
    },
    {
      id: 8,
      title: "Neon Noir",
      description: "A detective in a neon-drenched city uncovers a conspiracy that threatens the entire world.",
      posterUrl: "https://picsum.photos/seed/neon-noir-new/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-noir-new-bg/800/450",
      year: "2024",
      rating: "R",
      match: "88%",
      genre: "Thriller",
      type: "movie",
      duration: "2h 5min",
      addedDate: "2024-03-07",
      trending: true,
      newRelease: false
    },
    {
      id: 9,
      title: "Digital Love",
      description: "When a programmer falls in love with his AI creation, he must choose between code and heart.",
      posterUrl: "https://picsum.photos/seed/digital-love-new/300/450",
      backdropUrl: "https://picsum.photos/seed/digital-love-new-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "87%",
      genre: "Romance",
      type: "movie",
      duration: "1h 50min",
      addedDate: "2024-03-03",
      trending: false,
      newRelease: true
    },
    {
      id: 10,
      title: "Neon Academy",
      description: "Follow the lives of students at an elite academy where they learn to control neon powers.",
      posterUrl: "https://picsum.photos/seed/neon-academy-new/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-academy-new-bg/800/450",
      year: "2024",
      rating: "TV-14",
      match: "89%",
      genre: "Drama",
      type: "series",
      duration: "42 min",
      seasons: "2 Seasons",
      addedDate: "2024-03-09",
      trending: false,
      newRelease: true
    },
    {
      id: 11,
      title: "Cyber Detectives",
      description: "In the year 2089, elite detectives solve crimes using advanced AI and cybernetic enhancements.",
      posterUrl: "https://picsum.photos/seed/cyber-detectives-new/300/450",
      backdropUrl: "https://picsum.photos/seed/cyber-detectives-new-bg/800/450",
      year: "2024",
      rating: "TV-MA",
      match: "96%",
      genre: "Crime",
      type: "series",
      duration: "52 min",
      seasons: "4 Seasons",
      addedDate: "2024-03-11",
      trending: true,
      newRelease: false
    },
    {
      id: 12,
      title: "Neon Comedy",
      description: "A hilarious comedy about a group of friends navigating life in a futuristic neon city.",
      posterUrl: "https://picsum.photos/seed/neon-comedy-new/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-comedy-new-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "84%",
      genre: "Comedy",
      type: "movie",
      duration: "1h 45min",
      addedDate: "2024-03-06",
      trending: false,
      newRelease: true
    }
  ];

  const categories = [
    { value: 'all', label: 'All Content' },
    { value: 'trending', label: 'Trending Now' },
    { value: 'new', label: 'New Releases' },
    { value: 'movies', label: 'Movies Only' },
    { value: 'series', label: 'TV Series Only' }
  ];

  const sortOptions = [
    { value: 'trending', label: 'Trending Score' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'duration', label: 'Longest First' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setContent(contentData);
      setFilteredContent(contentData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...content];

    // Filter by category
    switch (selectedCategory) {
      case 'trending':
        filtered = filtered.filter(item => item.trending);
        break;
      case 'new':
        filtered = filtered.filter(item => item.newRelease);
        break;
      case 'movies':
        filtered = filtered.filter(item => item.type === 'movie');
        break;
      case 'series':
        filtered = filtered.filter(item => item.type === 'series');
        break;
      default:
        break;
    }

    // Sort content
    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => parseInt(b.match) - parseInt(a.match));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        break;
      case 'rating':
        filtered.sort((a, b) => parseInt(b.match) - parseInt(a.match));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'duration':
        filtered.sort((a, b) => {
          const durationA = parseInt(a.duration?.replace(/\D/g, '') || '0');
          const durationB = parseInt(b.duration?.replace(/\D/g, '') || '0');
          return durationB - durationA;
        });
        break;
      default:
        break;
    }

    setFilteredContent(filtered);
  }, [content, selectedCategory, sortBy]);

  const handlePlay = (item) => {
    console.log('Playing:', item.title);
  };

  const handleAddToList = (item) => {
    console.log('Adding to list:', item.title);
  };

  const handleLike = (item) => {
    console.log('Liking:', item.title);
  };

  const handleInfo = (item) => {
    console.log('Info for:', item.title);
  };

  if (loading) {
    return (
      <div className="neon-loading">
        <div className="neon-spinner"></div>
        <div className="neon-loading-text">Loading New & Popular...</div>
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
            <TrendingUp className="w-12 h-12 text-yellow-400" style={{ filter: 'drop-shadow(0 0 30px var(--neon-accent))' }} />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              NEW & POPULAR
            </h1>
          </div>
          <p className="text-xl text-yellow-300 max-w-2xl mx-auto">
            Discover the hottest new releases and trending content everyone's watching
          </p>
        </motion.div>

        {/* Featured Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="neon-card text-center p-6 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border-yellow-400/30">
            <Flame className="w-12 h-12 text-yellow-400 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 20px var(--neon-accent))' }} />
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">Trending Now</h3>
            <p className="text-white/80 mb-4">The hottest content everyone's watching</p>
            <div className="text-3xl font-bold text-yellow-300">
              {content.filter(item => item.trending).length}
            </div>
          </div>
          
          <div className="neon-card text-center p-6 bg-gradient-to-br from-green-400/10 to-emerald-500/10 border-green-400/30">
            <Star className="w-12 h-12 text-green-400 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 20px var(--neon-success))' }} />
            <h3 className="text-2xl font-bold text-green-400 mb-2">New Releases</h3>
            <p className="text-white/80 mb-4">Fresh content added this month</p>
            <div className="text-3xl font-bold text-green-300">
              {content.filter(item => item.newRelease).length}
            </div>
          </div>
          
          <div className="neon-card text-center p-6 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border-cyan-400/30">
            <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 20px var(--neon-primary))' }} />
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">Top Rated</h3>
            <p className="text-white/80 mb-4">Highest rated content</p>
            <div className="text-3xl font-bold text-cyan-300">
              {content.filter(item => parseInt(item.match) >= 90).length}
            </div>
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="neon-search-input pr-10 appearance-none cursor-pointer"
                style={{ backgroundImage: 'none' }}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400 pointer-events-none" />
            </div>

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
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-1 border border-yellow-400/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid' 
                  ? 'bg-yellow-400 text-black' 
                  : 'text-yellow-400 hover:bg-yellow-400/20'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list' 
                  ? 'bg-yellow-400 text-black' 
                  : 'text-yellow-400 hover:bg-yellow-400/20'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-yellow-300">
          <span className="font-semibold">{filteredContent.length}</span> Items Found
        </div>

        {/* Content Grid/List */}
        {viewMode === 'grid' ? (
          <div className="neon-grid neon-grid-cols-5">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                  {/* Badges */}
                  <div className="absolute top-2 left-2 z-10 flex gap-2">
                    {item.trending && (
                      <span className="neon-badge neon-badge-accent flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                    {item.newRelease && (
                      <span className="neon-badge neon-badge-success flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        New
                      </span>
                    )}
                  </div>
                  
                  <NeonCard 
                    item={item} 
                    onPlay={handlePlay}
                    onAddToList={handleAddToList}
                    onLike={handleLike}
                    onInfo={handleInfo}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="neon-card flex gap-6 p-6"
              >
                <div className="w-48 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        {item.trending && (
                          <span className="neon-badge neon-badge-accent flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            Trending
                          </span>
                        )}
                        {item.newRelease && (
                          <span className="neon-badge neon-badge-success flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-yellow-300">
                        <span>{item.year}</span>
                        <span>•</span>
                        <span>{item.type === 'movie' ? item.duration : `${item.seasons}`}</span>
                        <span>•</span>
                        <span className="text-green-400">{item.match} Match</span>
                        <span>•</span>
                        <span className="text-cyan-400">Added {item.addedDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePlay(item)}
                        className="neon-btn neon-btn-accent px-4 py-2 text-sm"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Play
                      </button>
                      <button
                        onClick={() => handleInfo(item)}
                        className="neon-btn neon-btn-secondary px-4 py-2 text-sm"
                      >
                        <Info className="w-3 h-3" />
                        Info
                      </button>
                    </div>
                  </div>
                  <p className="text-white/80 line-clamp-2 mb-3">{item.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="neon-badge neon-badge-accent">{item.genre}</span>
                    <span className="neon-badge neon-badge-primary">{item.rating}</span>
                    <span className="text-yellow-400">{item.type}</span>
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
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-black font-bold text-xl">
              S
            </div>
            STREAMFLIX
          </div>
          <div className="neon-footer-copyright">
            © 2024 Streamflix. New & Popular Collection.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewPopular;
