import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Info, Plus, Check, ThumbsUp, Search, Bell, User, X, ChevronLeft,
  ChevronRight, Star, Clock, Calendar, Film, Tv, TrendingUp, Heart,
  Volume2, VolumeX, Menu, Home, Flame, Sparkles, Award, Globe, Filter
} from 'lucide-react';
import './NeonStream.css';

// ─── Movie Data ──────────────────────────────────────────────────────────
const allMovies = [
  {
    id: 1, title: "Inception", year: 2010, rating: 8.8, duration: "2h 28min",
    genre: ["Sci-Fi", "Thriller"], maturity: "PG-13", match: 98,
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    type: "movie"
  },
  {
    id: 2, title: "Interstellar", year: 2014, rating: 8.7, duration: "2h 49min",
    genre: ["Sci-Fi", "Adventure", "Drama"], maturity: "PG-13", match: 96,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth becomes uninhabitable.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=1080&fit=crop",
    type: "movie"
  },
  {
    id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, duration: "2h 32min",
    genre: ["Action", "Crime", "Drama"], maturity: "PG-13", match: 97,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911BTUgMe1cEgzA.jpg",
    backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=1080&fit=crop",
    type: "movie"
  },
  {
    id: 4, title: "Breaking Bad", year: 2008, rating: 9.5, duration: "49 min",
    genre: ["Crime", "Drama", "Thriller"], maturity: "TV-MA", match: 99,
    description: "A high school chemistry teacher diagnosed with terminal lung cancer turns to manufacturing methamphetamine to secure his family's future.",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    director: "Vince Gilligan",
    poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1920&h=1080&fit=crop",
    type: "series"
  },
  {
    id: 5, title: "Stranger Things", year: 2016, rating: 8.7, duration: "51 min",
    genre: ["Sci-Fi", "Horror", "Drama"], maturity: "TV-14", match: 95,
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    director: "The Duffer Brothers",
    poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&h=1080&fit=crop",
    type: "series"
  },
  {
    id: 6, title: "The Shawshank Redemption", year: 1994, rating: 9.3, duration: "2h 22min",
    genre: ["Drama"], maturity: "R", match: 97,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    director: "Frank Darabont",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop",
    type: "movie"
  },
  {
    id: 7, title: "Pulp Fiction", year: 1994, rating: 8.9, duration: "2h 34min",
    genre: ["Crime", "Drama"], maturity: "R", match: 93,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    director: "Quentin Tarantino",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
    type: "movie"
  },
  {
    id: 8, title: "The Matrix", year: 1999, rating: 8.7, duration: "2h 16min",
    genre: ["Sci-Fi", "Action"], maturity: "R", match: 94,
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth about reality.",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    director: "Lana Wachowski, Lilly Wachowski",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop",
    type: "movie"
  },
  {
    id: 9, title: "Money Heist", year: 2017, rating: 8.3, duration: "45 min",
    genre: ["Action", "Crime", "Thriller"], maturity: "TV-MA", match: 91,
    description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history — stealing 2.4 billion euros from the Royal Mint.",
    cast: ["Úrsula Corberó", "Álvaro Morte", "Itziar Ituño"],
    director: "Álex Pina",
    poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    backdrop: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1920&h=1080&fit=crop",
    type: "series"
  },
  {
    id: 10, title: "The Godfather", year: 1972, rating: 9.2, duration: "2h 55min",
    genre: ["Crime", "Drama"], maturity: "R", match: 96,
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    director: "Francis Ford Coppola",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&h=1080&fit=crop",
    type: "movie"
  },
  {
    id: 11, title: "Game of Thrones", year: 2011, rating: 9.2, duration: "57 min",
    genre: ["Action", "Adventure", "Drama"], maturity: "TV-MA", match: 94,
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for a millennia.",
    cast: ["Emilia Clarke", "Peter Dinklage", "Kit Harington"],
    director: "David Benioff, D.B. Weiss",
    poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    backdrop: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=1920&h=1080&fit=crop",
    type: "series"
  },
  {
    id: 12, title: "Avengers: Endgame", year: 2019, rating: 8.4, duration: "3h 1min",
    genre: ["Action", "Adventure", "Sci-Fi"], maturity: "PG-13", match: 92,
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    director: "Anthony Russo, Joe Russo",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop",
    type: "movie"
  },
  {
    id: 13, title: "Narcos", year: 2015, rating: 8.8, duration: "49 min",
    genre: ["Crime", "Drama", "Thriller"], maturity: "TV-MA", match: 93,
    description: "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other druglords who plagued the country.",
    cast: ["Wagner Moura", "Boyd Holbrook", "Pedro Pascal"],
    director: "Chris Brancato",
    poster: "https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg",
    backdrop: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    type: "series"
  },
  {
    id: 14, title: "Fight Club", year: 1999, rating: 8.8, duration: "2h 19min",
    genre: ["Drama", "Thriller"], maturity: "R", match: 91,
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    director: "David Fincher",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QI4S2t0POvS.jpg",
    backdrop: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&h=1080&fit=crop",
    type: "movie"
  },
  {
    id: 15, title: "Wednesday", year: 2022, rating: 8.1, duration: "45 min",
    genre: ["Comedy", "Crime", "Horror"], maturity: "TV-14", match: 89,
    description: "Follows Wednesday Addams' years as a student, when she attempts to master her emerging psychic ability and solve the monster mystery.",
    cast: ["Jenna Ortega", "Gwendoline Christie", "Riki Lindhome"],
    director: "Tim Burton",
    poster: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop",
    type: "series"
  },
  {
    id: 16, title: "Oppenheimer", year: 2023, rating: 8.5, duration: "3h 0min",
    genre: ["Drama", "History"], maturity: "R", match: 95,
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop",
    type: "movie"
  },
  {
    id: 17, title: "The Witcher", year: 2019, rating: 8.2, duration: "60 min",
    genre: ["Action", "Adventure", "Drama"], maturity: "TV-MA", match: 90,
    description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
    director: "Lauren Schmidt Hissrich",
    poster: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop",
    type: "series"
  },
  {
    id: 18, title: "Dune", year: 2021, rating: 8.0, duration: "2h 35min",
    genre: ["Sci-Fi", "Adventure", "Drama"], maturity: "PG-13", match: 88,
    description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya"],
    director: "Denis Villeneuve",
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    backdrop: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&h=1080&fit=crop",
    type: "movie"
  }
];

const allGenres = ["All", "Sci-Fi", "Action", "Drama", "Crime", "Thriller", "Adventure", "Horror", "Comedy", "History"];

// ─── Notification Toast ──────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.9 }}
    className={`toast toast-${type}`}
  >
    <span>{message}</span>
    <button onClick={onClose} className="toast-close"><X size={14} /></button>
  </motion.div>
);

// ─── Loading Screen ──────────────────────────────────────────────────────
const LoadingScreen = () => (
  <motion.div
    className="loading-screen"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
  >
    <motion.div
      className="loading-logo"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="loading-ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <Sparkles size={40} className="loading-icon" />
    </motion.div>
    <motion.h2
      className="loading-text"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      NEONSTREAM
    </motion.h2>
    <motion.div
      className="loading-bar-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <motion.div
        className="loading-bar"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.div>
  </motion.div>
);

// ─── Movie Detail Modal ──────────────────────────────────────────────────
const MovieModal = ({ movie, onClose, onAddToList, onRemoveFromList, isInList }) => {
  if (!movie) return null;
  
  const similar = allMovies
    .filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g)))
    .slice(0, 6);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 60 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Hero */}
        <div className="modal-hero">
          <img src={movie.backdrop} alt={movie.title} className="modal-hero-img" />
          <div className="modal-hero-gradient" />
          <div className="modal-hero-content">
            <h1 className="modal-title">{movie.title}</h1>
            <div className="modal-actions">
              <button className="btn-neon btn-play" onClick={() => window.showNeonToast?.(`▶ Now Playing: ${movie.title}`, 'success')}>
                <Play size={20} fill="currentColor" /> Play
              </button>
              <button
                className={`btn-neon btn-icon ${isInList ? 'active' : ''}`}
                onClick={() => isInList ? onRemoveFromList(movie.id) : onAddToList(movie)}
              >
                {isInList ? <Check size={20} /> : <Plus size={20} />}
              </button>
              <button className="btn-neon btn-icon" onClick={() => window.showNeonToast?.(`👍 You liked ${movie.title}`, 'info')}>
                <ThumbsUp size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="modal-info">
          <div className="modal-info-main">
            <div className="modal-meta-row">
              <span className="match-badge">{movie.match}% Match</span>
              <span>{movie.year}</span>
              <span className="maturity-badge">{movie.maturity}</span>
              <span>{movie.duration}</span>
              <span className="type-badge">{movie.type === 'series' ? 'Series' : 'Movie'}</span>
            </div>
            <p className="modal-description">{movie.description}</p>
          </div>
          <div className="modal-info-side">
            <p><span className="label">Cast:</span> {movie.cast.join(', ')}</p>
            <p><span className="label">Genre:</span> {movie.genre.join(', ')}</p>
            <p><span className="label">Director:</span> {movie.director}</p>
            <p><span className="label">Rating:</span> <Star size={14} className="star-icon" /> {movie.rating}/10</p>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="modal-similar">
            <h3>More Like This</h3>
            <div className="similar-grid">
              {similar.map(m => (
                <div key={m.id} className="similar-card" onClick={() => {
                  onClose();
                  setTimeout(() => window.openMovieModal?.(m), 300);
                }}>
                  <img src={m.poster} alt={m.title} />
                  <div className="similar-info">
                    <h4>{m.title}</h4>
                    <div className="similar-meta">
                      <span className="match-sm">{m.match}%</span>
                      <span>{m.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── Content Row ─────────────────────────────────────────────────────────
const ContentRow = ({ title, icon: Icon, movies, onMovieClick, delay = 0 }) => {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeft(scrollLeft > 20);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir === 'left' ? -600 : 600, behavior: 'smooth' });
  };

  return (
    <motion.section
      className="content-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
    >
      <h2 className="section-heading">
        {Icon && <Icon size={22} className="section-icon" />}
        {title}
      </h2>
      <div className="carousel-wrapper">
        <AnimatePresence>
          {showLeft && (
            <motion.button
              className="carousel-arrow left"
              onClick={() => scroll('left')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChevronLeft size={28} />
            </motion.button>
          )}
        </AnimatePresence>
        <div className="carousel-track" ref={rowRef} onScroll={handleScroll}>
          {movies.map((movie, idx) => (
            <motion.div
              key={movie.id}
              className="movie-card"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ scale: 1.08, zIndex: 10 }}
              onClick={() => onMovieClick(movie)}
            >
              <div className="card-poster">
                <img src={movie.poster} alt={movie.title} loading="lazy" />
                <div className="card-overlay">
                  <div className="card-overlay-actions">
                    <button className="card-btn play-sm"><Play size={16} fill="currentColor" /></button>
                    <button className="card-btn"><Plus size={16} /></button>
                    <button className="card-btn"><ThumbsUp size={16} /></button>
                  </div>
                  <div className="card-overlay-info">
                    <span className="match-sm">{movie.match}%</span>
                    <span className="maturity-sm">{movie.maturity}</span>
                    <span>{movie.duration}</span>
                  </div>
                  <div className="card-overlay-genres">
                    {movie.genre.slice(0, 2).map(g => <span key={g}>{g}</span>)}
                  </div>
                </div>
              </div>
              <div className="card-info">
                <h4>{movie.title}</h4>
                <div className="card-meta">
                  <span className="card-rating"><Star size={12} /> {movie.rating}</span>
                  <span>{movie.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {showRight && (
            <motion.button
              className="carousel-arrow right"
              onClick={() => scroll('right')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChevronRight size={28} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

// ─── Main App ────────────────────────────────────────────────────────────
export default function NeonStreamApp() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const searchRef = useRef(null);

  const heroMovies = allMovies.filter(m => m.rating >= 8.5).slice(0, 5);

  // Loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hero auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroMovies.length]);

  // Toast system
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  useEffect(() => { window.showNeonToast = showToast; }, [showToast]);
  useEffect(() => { window.openMovieModal = setSelectedMovie; }, []);

  // Watchlist
  const addToList = useCallback((movie) => {
    setWatchlist(prev => {
      if (prev.find(m => m.id === movie.id)) return prev;
      showToast(`✅ Added "${movie.title}" to your list`, 'success');
      return [...prev, movie];
    });
  }, [showToast]);

  const removeFromList = useCallback((id) => {
    setWatchlist(prev => {
      const movie = prev.find(m => m.id === id);
      if (movie) showToast(`🗑 Removed "${movie.title}" from your list`, 'warning');
      return prev.filter(m => m.id !== id);
    });
  }, [showToast]);

  // Filter
  const filteredMovies = selectedGenre === 'All'
    ? allMovies
    : allMovies.filter(m => m.genre.includes(selectedGenre));

  const searchResults = searchQuery.trim()
    ? allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.cast.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  // Categories
  const trending = allMovies.filter(m => m.rating >= 8.5).sort((a, b) => b.rating - a.rating);
  const movies = allMovies.filter(m => m.type === 'movie');
  const series = allMovies.filter(m => m.type === 'series');
  const topRated = [...allMovies].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const scifi = allMovies.filter(m => m.genre.includes('Sci-Fi'));
  const crime = allMovies.filter(m => m.genre.includes('Crime'));
  const action = allMovies.filter(m => m.genre.includes('Action'));

  const currentHero = heroMovies[heroIndex];

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <div className="neon-app">
        {/* ── Navbar ────────────────────────────────── */}
        <motion.nav
          className={`neon-nav ${scrolled ? 'scrolled' : ''}`}
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
        >
          <div className="nav-inner">
            <div className="nav-left">
              <div className="nav-brand" onClick={() => setActivePage('home')}>
                <Sparkles size={24} className="brand-icon" />
                <span className="brand-text">NEONSTREAM</span>
              </div>
              <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                {[
                  { key: 'home', label: 'Home', icon: Home },
                  { key: 'movies', label: 'Movies', icon: Film },
                  { key: 'series', label: 'TV Shows', icon: Tv },
                  { key: 'mylist', label: 'My List', icon: Heart },
                ].map(item => (
                  <li key={item.key}>
                    <button
                      className={`nav-link ${activePage === item.key ? 'active' : ''}`}
                      onClick={() => { setActivePage(item.key); setMobileMenuOpen(false); }}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav-right">
              <div className={`search-box ${searchOpen ? 'open' : ''}`}>
                <button className="search-toggle" onClick={() => { setSearchOpen(!searchOpen); if (!searchOpen) setTimeout(() => searchRef.current?.focus(), 100); }}>
                  <Search size={20} />
                </button>
                {searchOpen && (
                  <motion.div
                    className="search-input-wrapper"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 260, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                  >
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search titles, genres, actors..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                    <button className="search-close" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                      <X size={16} />
                    </button>
                  </motion.div>
                )}
              </div>
              <button className="nav-icon-btn" onClick={() => showToast('🔔 No new notifications', 'info')}>
                <Bell size={20} />
              </button>
              <button className="nav-icon-btn profile-btn" onClick={() => setActivePage('mylist')}>
                <User size={20} />
              </button>
              <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </motion.nav>

        {/* ── Search Results Overlay ───────────────── */}
        <AnimatePresence>
          {searchOpen && searchQuery.trim() && (
            <motion.div
              className="search-results-overlay"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="search-results-inner">
                <h3><Search size={18} /> Results for "{searchQuery}"</h3>
                {searchResults.length === 0 ? (
                  <p className="no-results">No results found. Try a different search.</p>
                ) : (
                  <div className="search-results-grid">
                    {searchResults.map(m => (
                      <motion.div
                        key={m.id}
                        className="search-result-card"
                        whileHover={{ scale: 1.03 }}
                        onClick={() => { setSelectedMovie(m); setSearchOpen(false); setSearchQuery(''); }}
                      >
                        <img src={m.poster} alt={m.title} />
                        <div>
                          <h4>{m.title}</h4>
                          <p>{m.year} • {m.genre.join(', ')} • <Star size={12} /> {m.rating}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Hero Section ─────────────────────────── */}
        {activePage === 'home' && (
          <section className="hero-section">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHero.id}
                className="hero-slide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="hero-bg">
                  <img src={currentHero.backdrop} alt={currentHero.title} />
                </div>
                <div className="hero-gradient" />
                <div className="hero-content">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="hero-info"
                  >
                    <div className="hero-badge">
                      <TrendingUp size={16} />
                      #1 Trending Today
                    </div>
                    <h1 className="hero-title">{currentHero.title}</h1>
                    <div className="hero-meta">
                      <span className="hero-match">{currentHero.match}% Match</span>
                      <span>{currentHero.year}</span>
                      <span className="hero-maturity">{currentHero.maturity}</span>
                      <span>{currentHero.duration}</span>
                      <span className="hero-rating"><Star size={14} /> {currentHero.rating}</span>
                    </div>
                    <p className="hero-desc">{currentHero.description}</p>
                    <div className="hero-btns">
                      <motion.button
                        className="btn-hero btn-hero-play"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => showToast(`▶ Now Playing: ${currentHero.title}`, 'success')}
                      >
                        <Play size={22} fill="currentColor" /> Play
                      </motion.button>
                      <motion.button
                        className="btn-hero btn-hero-info"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMovie(currentHero)}
                      >
                        <Info size={22} /> More Info
                      </motion.button>
                      <motion.button
                        className="btn-hero btn-hero-icon"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToList(currentHero)}
                      >
                        <Plus size={22} />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                {/* Hero Nav Dots */}
                <div className="hero-dots">
                  {heroMovies.map((_, i) => (
                    <button
                      key={i}
                      className={`hero-dot ${i === heroIndex ? 'active' : ''}`}
                      onClick={() => setHeroIndex(i)}
                    />
                  ))}
                </div>

                {/* Hero Arrows */}
                <button className="hero-arrow left" onClick={() => setHeroIndex(prev => (prev - 1 + heroMovies.length) % heroMovies.length)}>
                  <ChevronLeft size={32} />
                </button>
                <button className="hero-arrow right" onClick={() => setHeroIndex(prev => (prev + 1) % heroMovies.length)}>
                  <ChevronRight size={32} />
                </button>
              </motion.div>
            </AnimatePresence>
          </section>
        )}

        {/* ── Page Content ─────────────────────────── */}
        <div className="page-content">
          {/* Page Header for non-home pages */}
          {activePage !== 'home' && (
            <motion.div
              className="page-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="page-title">
                {activePage === 'movies' && <><Film size={28} /> Movies</>}
                {activePage === 'series' && <><Tv size={28} /> TV Shows</>}
                {activePage === 'mylist' && <><Heart size={28} /> My List</>}
              </h1>
            </motion.div>
          )}

          {/* Genre Filter (Movies & Series pages) */}
          {(activePage === 'movies' || activePage === 'series') && (
            <motion.div
              className="genre-filter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Filter size={16} />
              {allGenres.map(g => (
                <button
                  key={g}
                  className={`genre-chip ${selectedGenre === g ? 'active' : ''}`}
                  onClick={() => setSelectedGenre(g)}
                >
                  {g}
                </button>
              ))}
            </motion.div>
          )}

          {/* Home Page */}
          {activePage === 'home' && (
            <>
              <ContentRow title="Trending Now" icon={TrendingUp} movies={trending} onMovieClick={setSelectedMovie} />
              <ContentRow title="Popular Movies" icon={Film} movies={movies} onMovieClick={setSelectedMovie} delay={0.1} />
              <ContentRow title="Binge-Worthy Series" icon={Tv} movies={series} onMovieClick={setSelectedMovie} delay={0.15} />
              <ContentRow title="Top Rated" icon={Award} movies={topRated} onMovieClick={setSelectedMovie} delay={0.2} />
              <ContentRow title="Sci-Fi & Fantasy" icon={Globe} movies={scifi} onMovieClick={setSelectedMovie} delay={0.25} />
              <ContentRow title="Crime & Thriller" icon={Flame} movies={crime} onMovieClick={setSelectedMovie} delay={0.3} />
              <ContentRow title="Action & Adventure" icon={Sparkles} movies={action} onMovieClick={setSelectedMovie} delay={0.35} />
            </>
          )}

          {/* Movies Page */}
          {activePage === 'movies' && (
            <motion.div className="grid-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="movies-grid-full">
                {(selectedGenre === 'All' ? movies : movies.filter(m => m.genre.includes(selectedGenre))).map((movie, idx) => (
                  <motion.div
                    key={movie.id}
                    className="grid-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <img src={movie.poster} alt={movie.title} />
                    <div className="grid-card-overlay">
                      <Play size={32} fill="white" />
                    </div>
                    <div className="grid-card-info">
                      <h4>{movie.title}</h4>
                      <div className="grid-card-meta">
                        <span><Star size={12} /> {movie.rating}</span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Series Page */}
          {activePage === 'series' && (
            <motion.div className="grid-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="movies-grid-full">
                {(selectedGenre === 'All' ? series : series.filter(m => m.genre.includes(selectedGenre))).map((movie, idx) => (
                  <motion.div
                    key={movie.id}
                    className="grid-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <img src={movie.poster} alt={movie.title} />
                    <div className="grid-card-overlay">
                      <Play size={32} fill="white" />
                    </div>
                    <div className="grid-card-info">
                      <h4>{movie.title}</h4>
                      <div className="grid-card-meta">
                        <span><Star size={12} /> {movie.rating}</span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* My List Page */}
          {activePage === 'mylist' && (
            <motion.div className="grid-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {watchlist.length === 0 ? (
                <div className="empty-list">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <Heart size={64} className="empty-icon" />
                  </motion.div>
                  <h2>Your list is empty</h2>
                  <p>Add movies and shows to your list to keep track of what you want to watch.</p>
                  <button className="btn-hero btn-hero-play" onClick={() => setActivePage('home')}>
                    Browse Content
                  </button>
                </div>
              ) : (
                <div className="movies-grid-full">
                  {watchlist.map((movie, idx) => (
                    <motion.div
                      key={movie.id}
                      className="grid-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -8 }}
                      layout
                    >
                      <img src={movie.poster} alt={movie.title} onClick={() => setSelectedMovie(movie)} />
                      <div className="grid-card-overlay" onClick={() => setSelectedMovie(movie)}>
                        <Play size={32} fill="white" />
                      </div>
                      <button
                        className="remove-btn"
                        onClick={(e) => { e.stopPropagation(); removeFromList(movie.id); }}
                      >
                        <X size={16} />
                      </button>
                      <div className="grid-card-info">
                        <h4>{movie.title}</h4>
                        <div className="grid-card-meta">
                          <span><Star size={12} /> {movie.rating}</span>
                          <span>{movie.year}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* ── Footer ──────────────────────────────── */}
        <footer className="neon-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <Sparkles size={20} />
              <span>NEONSTREAM</span>
            </div>
            <div className="footer-links">
              <a href="#">Help Center</a>
              <a href="#">Terms of Use</a>
              <a href="#">Privacy</a>
              <a href="#">Cookie Preferences</a>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
            </div>
            <p className="footer-copy">© 2024 NeonStream. All rights reserved. Built with ❤️</p>
          </div>
        </footer>

        {/* ── Modal ───────────────────────────────── */}
        <AnimatePresence>
          {selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
              onAddToList={addToList}
              onRemoveFromList={removeFromList}
              isInList={watchlist.some(m => m.id === selectedMovie.id)}
            />
          )}
        </AnimatePresence>

        {/* ── Toasts ──────────────────────────────── */}
        <div className="toast-container">
          <AnimatePresence>
            {toasts.map(t => (
              <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
