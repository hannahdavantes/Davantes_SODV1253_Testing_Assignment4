import { FaStar } from "react-icons/fa";
import Wrapper from "../assets/wrappers/MovieCard";

const MovieCard = ({ movie, onClick }) => {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";

  const hasRating = typeof movie.vote_average === "number";
  const rating = hasRating ? movie.vote_average.toFixed(1) : "—";

  return (
    <Wrapper onClick={onClick}>
      <div className="poster">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/no-poster.png";
            }}
          />
        ) : (
          <div className="no-poster">No Poster</div>
        )}
      </div>

      <div className="content">
        <h3 className="title" title={movie.title}>
          {movie.title}
        </h3>

        <div className="info">
          <span className="year">{year}</span>

          <span className="rating">
            <FaStar className="star" />
            <span className="score">{rating}</span>
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default MovieCard;
