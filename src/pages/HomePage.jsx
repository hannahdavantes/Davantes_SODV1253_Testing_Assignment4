import { useCallback, useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/HomePage";
import MovieList from "../components/MovieList";
import SearchMovie from "../components/SearchMovie";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const HomePage = () => {
  //State that handles what kind of movies to fetch
  // Top is top rated movies
  // Search is based on the query
  // Genre is filtering out by genreie
  const [mode, setMode] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    //This cancels the old request when state changes fast
    const controller = new AbortController();

    let url = "";

    //Based on the mode state, this will handle which URL will be used to request data
    if (mode === "top") {
      url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`;
    } else if (mode === "search") {
      url =
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}` +
        `&query=${encodeURIComponent(searchTerm)}` +
        `&include_adult=false&page=${page}`;
    } else if (mode === "genre") {
      url =
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}` +
        `&with_genres=${selectedGenre}&include_adult=false&page=${page}`;
    }

    //Fetch the data from the API
    //If not successful, we throw error
    //If successful we get the json as results
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((json) => {
        let results = json.results ?? [];

        //Since TMDB doesn't provide an endpoint to search and filter at the same time,
        //We have to filter the movies
        //If searching title AND genre selected, filter results
        if (mode === "search" && selectedGenre) {
          results = results.filter((movie) =>
            movie.genre_ids?.includes(Number(selectedGenre)),
          );
        }

        setMovies(results);
        setTotalPages(Math.min(json.total_pages ?? 1, 500));
      })
      .catch((err) => {
        //Ignore abort error
        if (err.name === "AbortError") {
          return;
        }

        setError(err.message);
      })
      .finally(() => {
        //Only stop loading if request was not aborted
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    //Cleanup request
    return () => {
      controller.abort();
    };
  }, [mode, searchTerm, selectedGenre, page]);

  //When is 'search' button is clicked
  const handleSearch = useCallback(({ query, genre }) => {
    setPage(1);
    setSearchTerm(query);
    setSelectedGenre(genre);

    //If the user types in a title, it is search
    //If the user selected a genre, it is genre
    //If neither, shows toprated mvoies
    if (query && genre) {
      setMode("search");
    } else if (query) {
      setMode("search");
    } else if (genre) {
      setMode("genre");
    } else {
      setMode("top");
    }
  }, []);

  //Resets to default state
  const handleClear = useCallback(() => {
    setMode("top");
    setSearchTerm("");
    setSelectedGenre("");
    setPage(1);
  }, []);

  //For pagination
  //Makes sure that the pages is between 1 and the actual numbner of pages
  const handlePageChange = useCallback(
    (nextPage) => {
      const safe = Math.max(1, Math.min(nextPage, totalPages));
      setPage(safe);
    },
    [totalPages],
  );

  //This keeps the function stable for MovieList
  const handleSelectMovie = useCallback(
    (movie) => {
      navigate(`/movie/${movie.id}`);
    },
    [navigate],
  );

  return (
    <Wrapper>
      <h1 className="title-main">Movies</h1>

      <SearchMovie
        onSearch={handleSearch}
        onClear={handleClear}
        isLoading={isLoading}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!isLoading && !error && (
        <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </Wrapper>
  );
};

export default HomePage;
