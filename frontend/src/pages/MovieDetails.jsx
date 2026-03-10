import { useParams } from "react-router-dom";
import { movies } from "../data/movies";

function MovieDetails() {

  const { id } = useParams();

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <h2 style={{padding:"40px"}}>Movie not found</h2>;
  }

  return (
    <div className="details">

      <img src={movie.image} alt={movie.title} />

      <div>
        <h1>{movie.title}</h1>
        <p>⭐ Rating: {movie.rating}</p>
        <p>Language: {movie.language}</p>
        <p>Genre: {movie.genre}</p>
      </div>

    </div>
  );
}

export default MovieDetails;