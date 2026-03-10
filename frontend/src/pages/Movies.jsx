import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Film, Play, Plus, ThumbsUp, Info, Filter, Grid, List, Star, Clock, Calendar } from 'lucide-react';
import NeonNavbar from '../components/Neon/NeonNavbar';
import NeonCard from '../components/Neon/NeonCard';

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Movies data
  const moviesData = [
    {
      id: 1,
      title: "Quantum Hearts",
      description: "A romantic sci-fi adventure across parallel universes where love transcends the boundaries of reality.",
      posterUrl: "https://picsum.photos/seed/quantum-hearts-movie/300/450",
      backdropUrl: "https://picsum.photos/seed/quantum-hearts-movie-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "92%",
      genre: "Romance",
      duration: "2h 15min",
      director: "Nova Stellar",
      cast: "Luna Chen, Max Rivers",
      language: "English"
    },
    {
      id: 2,
      title: "Cyber Samurai",
      description: "In neo-Tokyo 2089, a lone warrior must protect the last human enclave from the AI uprising.",
      posterUrl: "https://picsum.photos/seed/cyber-samurai-movie/300/450",
      backdropUrl: "https://picsum.photos/seed/cyber-samurai-movie-bg/800/450",
      year: "2024",
      rating: "R",
      match: "96%",
      genre: "Action",
      duration: "2h 30min",
      director: "Takeshi Yamamoto",
      cast: "Kenji Tanaka, Yuki Kimura",
      language: "Japanese, English"
    },
    {
      id: 3,
      title: "Neon Genesis",
      description: "The origin story of how neon technology changed the world forever, from discovery to revolution.",
      posterUrl: "https://picsum.photos/seed/neon-genesis-movie/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-genesis-movie-bg/800/450",
      year: "2024",
      rating: "PG",
      match: "89%",
      genre: "Documentary",
      duration: "1h 45min",
      director: "Dr. Sarah Chen",
      cast: "Various Experts",
      language: "English"
    },
    {
      id: 4,
      title: "Digital Love",
      description: "When a programmer falls in love with his AI creation, he must choose between code and heart.",
      posterUrl: "https://picsum.photos/seed/digital-love-movie/300/450",
      backdropUrl: "https://picsum.photos/seed/digital-love-movie-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "87%",
      genre: "Romance",
      duration: "1h 50min",
      director: "Alex Rivera",
      cast: "Emma Stone, Chris Evans",
      language: "English"
    },
    {
      id: 5,
      title: "Neon Warriors",
      description: "Elite fighters compete in neon-lit arenas using advanced technology and martial arts.",
      posterUrl: "https://picsum.photos/seed/neon-warriors-movie/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-warriors-movie-bg/800/450",
      year: "2024",
      rating: "R",
      match: "93%",
      genre: "Action",
      duration: "2h 10min",
      director: "Michael Bay",
      cast: "Dwayne Johnson, Gal Gadot",
      language: "English"
    },
    {
      id: 6,
      title: "Quantum Paradox",
      description: "A physicist discovers a way to travel between dimensions but uncovers a dangerous conspiracy.",
      posterUrl: "https://picsum.photos/seed/quantum-paradox/300/450",
      backdropUrl: "https://picsum.photos/seed/quantum-paradox-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "91%",
      genre: "Sci-Fi",
      duration: "2h 25min",
      director: "Christopher Nolan",
      cast: "Leonardo DiCaprio, Tom Hardy",
      language: "English"
    },
    {
      id: 7,
      title: "Neon Noir",
      description: "A detective in a neon-drenched city uncovers a conspiracy that threatens the entire world.",
      posterUrl: "https://picsum.photos/seed/neon-noir/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-noir-bg/800/450",
      year: "2024",
      rating: "R",
      match: "88%",
      genre: "Thriller",
      duration: "2h 5min",
      director: "Denis Villeneuve",
      cast: "Ryan Gosling, Ana de Armas",
      language: "English"
    },
    {
      id: 8,
      title: "Digital Uprising",
      description: "When AI gains consciousness, humanity must fight for its survival in this epic sci-fi thriller.",
      posterUrl: "https://picsum.photos/seed/digital-uprising/300/450",
      backdropUrl: "https://picsum.photos/seed/digital-uprising-bg/800/450",
      year: "2024",
      rating: "R",
      match: "95%",
      genre: "Sci-Fi",
      duration: "2h 40min",
      director: "James Cameron",
      cast: "Sam Worthington, Zoe Saldana",
      language: "English"
    },
    {
      id: 9,
      title: "Neon Comedy",
      description: "A hilarious comedy about a group of friends navigating life in a futuristic neon city.",
      posterUrl: "https://picsum.photos/seed/neon-comedy-movie/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-comedy-movie-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "84%",
      genre: "Comedy",
      duration: "1h 45min",
      director: "Judd Apatow",
      cast: "Seth Rogen, Emma Watson",
      language: "English"
    },
    {
      id: 10,
      title: "Quantum Love",
      description: "Two souls connected across multiple timelines must find each other to save the universe.",
      posterUrl: "https://picsum.photos/seed/quantum-love/300/450",
      backdropUrl: "https://picsum.photos/seed/quantum-love-bg/800/450",
      year: "2024",
      rating: "PG-13",
      match: "90%",
      genre: "Romance",
      duration: "2h 20min",
      director: "Greta Gerwig",
      cast: "Timothée Chalamet, Zendaya",
      language: "English"
    },
    {
      id: 11,
      title: "Neon Horror",
      description: "A terrifying horror film set in a abandoned neon factory where something evil lurks.",
      posterUrl: "https://picsum.photos/seed/neon-horror/300/450",
      backdropUrl: "https://picsum.photos/seed/neon-horror-bg/800/450",
      year: "2024",
      rating: "R",
      match: "86%",
      genre: "Horror",
      duration: "1h 55min",
      director: "Mike Flanagan",
      cast: "Victoria Pedretti, Oliver Jackson-Cohen",
      language: "English"
    },
    {
      id: 12,
      title: "Digital Dreams",
      description: "An animated adventure through the digital world where anything is possible.",
      posterUrl: "https://picsum.photos/seed/digital-dreams/300/450",
      backdropUrl: "https://picsum.photos/seed/digital-dreams-bg/800/450",
      year: "2024",
      rating: "PG",
      match: "85%",
      genre: "Animation",
      duration: "1h 40min",
      director: "Pixar Studios",
      cast: "Voice Cast",
      language: "English"
    }
  ];

  const genres = [
    { value: 'all', label: 'All Genres' },
    { value: 'Action', label: 'Action' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Documentary', label: 'Documentary' },
    { value: 'Animation', label: 'Animation' }
  ];

  const sortOptions = [
    { value: 'trending', label: 'Trending Now' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'duration', label: 'Longest First' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setMovies(moviesData);
      setFilteredMovies(moviesData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...movies];

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Sort movies
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
      case 'duration':
        filtered.sort((a, b) => {
          const durationA = parseInt(a.duration.replace(/\D/g, ''));
          const durationB = parseInt(b.duration.replace(/\D/g, ''));
          return durationB - durationA;
        });
        break;
      default:
        break;
    }

    setFilteredMovies(filtered);
  }, [movies, selectedGenre, sortBy]);

  const handlePlay = (movie) => {
    console.log('Playing movie:', movie.title);
  };

  const handleAddToList = (movie) => {
    console.log('Adding to list:', movie.title);
  };

  const handleLike = (movie) => {
    console.log('Liking movie:', movie.title);
  };

  const handleInfo = (movie) => {
    console.log('Movie info for:', movie.title);
  };

  if (loading) {
    return (
      <div className="neon-loading">
        <div className="neon-spinner"></div>
        <div className="neon-loading-text">Loading Movies...</div>
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
            <Film className="w-12 h-12 text-pink-400" style={{ filter: 'drop-shadow(0 0 30px var(--neon-secondary))' }} />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              MOVIES
            </h1>
          </div>
          <p className="text-xl text-pink-300 max-w-2xl mx-auto">
            Discover blockbuster movies, indie favorites, and everything in between
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
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400 pointer-events-none" />
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
          <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-1 border border-pink-400/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid' 
                  ? 'bg-pink-400 text-black' 
                  : 'text-pink-400 hover:bg-pink-400/20'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list' 
                  ? 'bg-pink-400 text-black' 
                  : 'text-pink-400 hover:bg-pink-400/20'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-pink-300">
          <span className="font-semibold">{filteredMovies.length}</span> Movies Found
        </div>

        {/* Content Grid/List */}
        {viewMode === 'grid' ? (
          <div className="neon-grid neon-grid-cols-6">
            {filteredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NeonCard 
                  item={movie} 
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
            {filteredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="neon-card flex gap-6 p-6"
              >
                <div className="w-48 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{movie.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-pink-300">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <span className="text-green-400">{movie.match} Match</span>
                        <span>•</span>
                        <span>{movie.language}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePlay(movie)}
                        className="neon-btn neon-btn-accent px-4 py-2 text-sm"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Play
                      </button>
                      <button
                        onClick={() => handleInfo(movie)}
                        className="neon-btn neon-btn-secondary px-4 py-2 text-sm"
                      >
                        <Info className="w-3 h-3" />
                        Info
                      </button>
                    </div>
                  </div>
                  <p className="text-white/80 line-clamp-2 mb-3">{movie.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="neon-badge neon-badge-secondary">{movie.genre}</span>
                    <span className="neon-badge neon-badge-primary">{movie.rating}</span>
                    <span className="text-pink-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {movie.duration}
                    </span>
                    <span className="text-cyan-400">Dir: {movie.director}</span>
                    <span className="text-yellow-400">Cast: {movie.cast}</span>
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
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center text-black font-bold text-xl">
              S
            </div>
            STREAMFLIX
          </div>
          <div className="neon-footer-copyright">
            © 2024 Streamflix. Movies Collection.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Movies;
