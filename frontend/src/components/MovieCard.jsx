import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
      whileHover={{ 
        y: -10,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(229, 9, 20, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <div className="movie-image-container">
        <motion.img 
          src={movie.image} 
          alt={movie.title}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="movie-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="play-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ▶
          </motion.button>
        </motion.div>
      </div>
      
      <motion.div 
        className="movie-info"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="movie-title">{movie.title}</h4>
        <div className="movie-meta">
          <span className="rating">⭐ {movie.rating}</span>
          <span className="year">{movie.year}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MovieCard;