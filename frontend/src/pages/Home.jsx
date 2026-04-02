import { movies } from "../data/movies";
import MovieRow from "../components/MovieRow";
import { motion } from "framer-motion"; // added import statement for framer-motion

function Home() {
  const trending = movies.filter(m => m.rating > 8);
  const newReleases = movies.filter(m => m.year >= 2023);
  const topRated = movies.filter(m => m.rating >= 8.5);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="home"
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hero-section"
      >
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hero-title"
          >
            Welcome to StreamFlix
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-subtitle"
          >
            Discover amazing movies and TV shows
          </motion.p>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="content-sections">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MovieRow title="🔥 Trending Now" movies={trending} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MovieRow title="🎬 New Releases" movies={newReleases} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <MovieRow title="⭐ Top Rated" movies={topRated} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <MovieRow title="📽 All Movies" movies={movies} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;