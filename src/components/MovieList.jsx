import { memo } from "react";
import Wrapper from "../assets/wrappers/MovieList";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onSelectMovie }) => {
  if (!movies || movies.length === 0) {
    return <p className="no-results">No movies found.</p>;
  }

  return (
    <Wrapper>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onSelectMovie(movie)}
        />
      ))}
    </Wrapper>
  );
};

//This avoids rerender if props did not change
export default memo(MovieList);
