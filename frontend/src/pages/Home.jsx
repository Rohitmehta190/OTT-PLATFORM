import { useNavigate } from "react-router-dom";
import { movies } from "../data/movies";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>🎬 Popular Movies</h1>
      
      <div className="movies-grid">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>⭐ {movie.rating}</p>
            <p>{movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;