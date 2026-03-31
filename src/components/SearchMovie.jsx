import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/SearchMovie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SearchMovie = ({ onSearch, onClear, isLoading }) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  //This use effect gets the genres from the api and we use this to load the genres into dropdown option when searching movie
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch genres");
        }

        const data = await res.json();
        setGenres(data.genres ?? []);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenres([]);
      }
    };

    fetchGenres();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Remove extra spaces
    const trimmed = query.trim();

    //If user clicks the search button and they didn't enter any search query and just the default genre,
    //This will avoid the api request
    if (!trimmed && !genre) {
      onClear?.();
      return;
    }

    //We call the search function that was passed from the Home Page
    onSearch({
      query: trimmed,
      genre,
    });
  };

  //This resets the states
  const clearSearch = () => {
    setQuery("");
    setGenre("");
    onClear?.();
  };

  return (
    <Wrapper>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies by title..."
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          SEARCH
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={clearSearch}
          disabled={isLoading}
        >
          CLEAR
        </button>
      </form>
    </Wrapper>
  );
};

export default SearchMovie;
