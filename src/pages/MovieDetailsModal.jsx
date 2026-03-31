import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/MovieDetailsModal";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const portalRoot = document.getElementById("modal-portal");

const IMG_POSTER = "https://image.tmdb.org/t/p/w500";
const IMG_PROFILE = "https://image.tmdb.org/t/p/w185";

const MovieDetailsModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const close = () => {
    navigate("/");
  };

  useEffect(() => {
    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`).then(
        (res) => {
          if (!res.ok) throw new Error("Failed to fetch movie details");
          return res.json();
        },
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cast");
        return res.json();
      }),
    ])
      .then(([movieJson, creditsJson]) => {
        setMovie(movieJson);
        setCast((creditsJson.cast ?? []).slice(0, 16));
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  const year = movie?.release_date ? movie.release_date.slice(0, 4) : "—";
  const posterUrl = movie?.poster_path
    ? `${IMG_POSTER}${movie.poster_path}`
    : null;

  return createPortal(
    <Wrapper onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="top-row">
          <button type="button" className="btn btn-secondary" onClick={close}>
            Close
          </button>
        </div>

        {isLoading ? (
          <p className="msg">Loading...</p>
        ) : error ? (
          <p className="msg">Error: {error}</p>
        ) : movie ? (
          <div className="content">
            <div className="main">
              <div className="poster">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={`${movie.title} poster`}
                    loading="lazy"
                  />
                ) : (
                  <div className="poster-fallback">No Poster</div>
                )}
              </div>

              <div className="details">
                <div className="header">
                  <h2 className="title">
                    {movie.title} <span className="year">({year})</span>
                  </h2>
                  <p className="rating">
                    ⭐ {movie.vote_average?.toFixed(1) ?? "—"}
                  </p>
                </div>

                <p className="overview">
                  {movie.overview || "No plot summary available."}
                </p>

                <div className="info">
                  {movie.runtime && (
                    <p>
                      <span>Runtime:</span> {movie.runtime} min
                    </p>
                  )}
                  {movie.genres?.length > 0 && (
                    <p>
                      <span>Genres:</span>{" "}
                      {movie.genres.map((g) => g.name).join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <h3 className="section-title">Cast</h3>

            {cast.length > 0 ? (
              <div className="cast-grid">
                {cast.map((p) => {
                  const profileUrl = p.profile_path
                    ? `${IMG_PROFILE}${p.profile_path}`
                    : null;

                  return (
                    <div key={p.id} className="cast-card">
                      <div className="cast-photo">
                        {profileUrl ? (
                          <img src={profileUrl} alt={p.name} loading="lazy" />
                        ) : (
                          <div className="cast-fallback">No Photo</div>
                        )}
                      </div>

                      <div className="cast-info">
                        <p className="cast-name" title={p.name}>
                          {p.name}
                        </p>
                        <p className="cast-role" title={p.character}>
                          {p.character || "—"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="msg">No cast found.</p>
            )}
          </div>
        ) : (
          <p className="msg">No movie found.</p>
        )}
      </div>
    </Wrapper>,
    portalRoot,
  );
};

export default MovieDetailsModal;
