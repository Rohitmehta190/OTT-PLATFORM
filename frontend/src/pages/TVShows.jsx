import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tv, Play, Plus, ThumbsUp, Info, Filter, Grid, List, Star, Calendar } from 'lucide-react';
import NeonNavbar from '../components/Neon/NeonNavbar';
import NeonCard from '../components/Neon/NeonCard';

const TVShows = () => {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [tvShows, setTvShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);

  // TV Shows data
  const showsData = [
    {
      id: 1,
      title: "Neon Dreams",
      description: "A cyberpunk thriller set in a dystopian future where AI and humanity collide in an epic battle for survival.",
      posterUrl: "https://picsum.photos/seed/neon-dreams-tv/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-dreams-tv-bg/800/450",
      year: "2024",
      rating: "TV-MA",
      match: "98%",
      genre: "Sci-Fi",
      seasons: "2 Seasons",
      episodes: "20 Episodes",
      duration: "45 min",
      status: "Returning Series"
    },
    {
      id: 2,
      title: "Digital Revolution",
      description: "The story of how technology transformed our world and the pioneers who dared to dream of a digital future.",
      posterUrl: "https://picsum.photos/seed/digital-revolution-tv/300/450",
      backdropUrl: "https://picsum.photos/seed/digital-revolution-tv-bg/800/450",
      year: "2024",
      rating: "TV-14",
      match: "95%",
      genre: "Documentary",
      seasons: "1 Season",
      episodes: "8 Episodes",
      duration: "50 min",
      status: "New Season"
    },
    {
      id: 3,
      title: "Neon Nights",
      description: "A detective story set in the neon-lit streets of a futuristic metropolis where nothing is as it seems.",
      posterUrl: "https://picsum.photos/seed/neon-nights-tv/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-nights-tv-bg/800/450",
      year: "2024",
      rating: "TV-MA",
      match: "94%",
      genre: "Thriller",
      seasons: "3 Seasons",
      episodes: "30 Episodes",
      duration: "55 min",
      status: "Returning Series"
    },
    {
      id: 4,
      title: "Electric Dreams",
      description: "An anthology series exploring the boundaries between human consciousness and artificial intelligence.",
      posterUrl: "https://picsum.photos/seed/electric-dreams-tv/300/450",
      backdropUrl: "https://picsum.photos/seed/electric-dreams-tv-bg/800/450",
      year: "2024",
      rating: "TV-14",
      match: "91%",
      genre: "Sci-Fi",
      seasons: "2 Seasons",
      episodes: "16 Episodes",
      duration: "48 min",
      status: "Returning Series"
    },
    {
      id: 5,
      title: "Cyber Detectives",
      description: "In the year 2089, elite detectives solve crimes using advanced AI and cybernetic enhancements.",
      posterUrl: "https://picsum.photos/seed/cyber-detectives/300/450",
      backdropUrl: "https://picsum.photos/seed/cyber-detectives-bg/800/450",
      year: "2024",
      rating: "TV-MA",
      match: "96%",
      genre: "Crime",
      seasons: "4 Seasons",
      episodes: "40 Episodes",
      duration: "52 min",
      status: "Returning Series"
    },
    {
      id: 6,
      title: "Neon Academy",
      description: "Follow the lives of students at an elite academy where they learn to control neon powers.",
      posterUrl: "https://picsum.photos/seed/neon-academy/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-academy-bg/800/450",
      year: "2024",
      rating: "TV-14",
      match: "89%",
      genre: "Drama",
      seasons: "2 Seasons",
      episodes: "24 Episodes",
      duration: "42 min",
      status: "New Season"
    },
    {
      id: 7,
      title: "Digital Hearts",
      description: "A romantic drama exploring love in the age of artificial intelligence and virtual relationships.",
      posterUrl: "https://picsum.photos/seed/digital-hearts/300/450",
      backdropUrl: "https://picsum.photos/seed/digital-hearts-bg/800/450",
      year: "2024",
      rating: "TV-14",
      match: "87%",
      genre: "Romance",
      seasons: "1 Season",
      episodes: "10 Episodes",
      duration: "45 min",
      status: "New Series"
    },
    {
      id: 8,
      title: "Neon Warriors",
      description: "Elite fighters compete in neon-lit arenas using advanced technology and martial arts.",
      posterUrl: "https://picsum.photos/seed/neon-warriors/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-warriors-bg/800/450",
      year: "2024",
      rating: "TV-MA",
      match: "93%",
      genre: "Action",
      seasons: "3 Seasons",
      episodes: "36 Episodes",
      duration: "50 min",
      status: "Returning Series"
    },
    {
      id: 9,
      title: "Quantum Detectives",
      description: "Detectives solve crimes across parallel universes using quantum physics and advanced technology.",
      posterUrl: "https://picsum.photos/seed/quantum-detectives/300/450",
      backdropUrl: "https://picsum.photos/seed/quantum-detectives-bg/800/450",
      year: "2024",
      rating: "TV-14",
      match: "90%",
      genre: "Mystery",
      seasons: "2 Seasons",
      episodes: "20 Episodes",
      duration: "47 min",
      status: "Returning Series"
    },
    {
      id: 10,
      title: "Neon Comedy Club",
      description: "Stand-up comedy and sketch shows set in a futuristic neon comedy club.",
      posterUrl: "https://picsum.photos/seed/neon-comedy/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-comedy-bg/800/450",
      year: "2024",
      rating: "TV-14",
      match: "85%",
      genre: "Comedy",
      seasons: "1 Season",
      episodes: "12 Episodes",
      duration: "30 min",
      status: "New Series"
    }
  ];

  const genres = [
    { value: 'all', label: 'All Genres' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Action', label: 'Action' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Documentary', label: 'Documentary' },
    { value: 'Mystery', label: 'Mystery' }
  ];

  const sortOptions = [
    { value: 'trending', label: 'Trending Now' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'episodes', label: 'Most Episodes' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setTvShows(showsData);
      setFilteredShows(showsData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...tvShows];

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(show => show.genre === selectedGenre);
    }

    // Sort shows
    switch (sortBy) {
      case 'trending':
        filtered.sort((a, b) => parseInt(b.match) - parseInt(a.match));
        break;
      case 'newest':
        filtered.sort((a, b) => b.year.localeCompare(a.year));
        break;
      case 'rating':
        filtered.sort((a, b) => parseInt(b.match) - parseInt(a.match));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'episodes':
        filtered.sort((a, b) => parseInt(b.episodes) - parseInt(a.episodes));
        break;
      default:
        break;
    }

    setFilteredShows(filtered);
  }, [tvShows, selectedGenre, sortBy]);

  const handlePlay = (show) => {
    console.log('Playing show:', show.title);
  };

  const handleAddToList = (show) => {
    console.log('Adding to list:', show.title);
  };

  const handleLike = (show) => {
    console.log('Liking show:', show.title);
  };

  const handleInfo = (show) => {
    console.log('Show info for:', show.title);
  };

  if (loading) {
    return (
      <div className="neon-loading">
        <div className="neon-spinner"></div>
        <div className="neon-loading-text">Loading TV Shows...</div>
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
            <Tv className="w-12 h-12 text-cyan-400" style={{ filter: 'drop-shadow(0 0 30px var(--neon-primary))' }} />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TV SHOWS
            </h1>
          </div>
          <p className="text-xl text-cyan-300 max-w-2xl mx-auto">
            Explore our extensive collection of TV series from every genre imaginable
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Genre Filter */}
            <div className="relative">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="neon-search-input pr-10 appearance-none cursor-pointer"
                style={{ backgroundImage: 'none' }}
              >
                {genres.map(genre => (
                  <option key={genre.value} value={genre.value}>
                    {genre.label}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" />
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
          <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-1 border border-cyan-400/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid' 
                  ? 'bg-cyan-400 text-black' 
                  : 'text-cyan-400 hover:bg-cyan-400/20'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list' 
                  ? 'bg-cyan-400 text-black' 
                  : 'text-cyan-400 hover:bg-cyan-400/20'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-cyan-300">
          <span className="font-semibold">{filteredShows.length}</span> TV Shows Found
        </div>

        {/* Content Grid/List */}
        {viewMode === 'grid' ? (
          <div className="neon-grid neon-grid-cols-5">
            {filteredShows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NeonCard 
                  item={show} 
                  onPlay={handlePlay}
                  onAddToList={handleAddToList}
                  onLike={handleLike}
                  onInfo={handleInfo}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredShows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="neon-card flex gap-6 p-6"
              >
                <div className="w-48 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={show.posterUrl}
                    alt={show.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{show.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-cyan-300">
                        <span>{show.year}</span>
                        <span>•</span>
                        <span>{show.seasons}</span>
                        <span>•</span>
                        <span>{show.episodes}</span>
                        <span>•</span>
                        <span className="text-green-400">{show.match} Match</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePlay(show)}
                        className="neon-btn neon-btn-primary px-4 py-2 text-sm"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Play
                      </button>
                      <button
                        onClick={() => handleInfo(show)}
                        className="neon-btn neon-btn-secondary px-4 py-2 text-sm"
                      >
                        <Info className="w-3 h-3" />
                        Info
                      </button>
                    </div>
                  </div>
                  <p className="text-white/80 line-clamp-2 mb-3">{show.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="neon-badge neon-badge-primary">{show.genre}</span>
                    <span className="neon-badge neon-badge-secondary">{show.rating}</span>
                    <span className="text-cyan-400">{show.duration}</span>
                    <span className="text-yellow-400">{show.status}</span>
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
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-black font-bold text-xl">
              S
            </div>
            STREAMFLIX
          </div>
          <div className="neon-footer-copyright">
            © 2024 Streamflix. TV Shows Collection.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TVShows;
