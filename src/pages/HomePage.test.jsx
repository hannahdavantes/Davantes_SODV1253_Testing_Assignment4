import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomePage from "./HomePage";

const mockNavigate = vi.fn();

//Mock the useNavigate
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

//Mock the child components in order to just focus testing on the HomePage
vi.mock("../assets/wrappers/HomePage", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock("../components/SearchMovie", () => ({
  default: ({ onSearch, onClear }) => (
    <div>
      <button onClick={() => onSearch({ query: "batman", genre: "" })}>
        Search Movie
      </button>
      <button onClick={onClear}>Clear Movie</button>
    </div>
  ),
}));

vi.mock("../components/MovieList", () => ({
  default: ({ movies, onSelectMovie }) => (
    <div>
      <p>MovieList</p>
      {movies.map((movie) => (
        <button key={movie.id} onClick={() => onSelectMovie(movie)}>
          {movie.title}
        </button>
      ))}
    </div>
  ),
}));

vi.mock("../components/Pagination", () => ({
  default: ({ onPageChange }) => (
    <div>
      <button onClick={() => onPageChange(2)}>Next Page</button>
    </div>
  ),
}));

describe("HomePage", () => {
  //Ensures that previous data is cleared
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it("Renders movies after successful fetch", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ id: 1, title: "Movie One", genre_ids: [28] }],
        total_pages: 10,
      }),
    });

    render(<HomePage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Movie One")).toBeInTheDocument();
    });
  });

  it("Shows error when fetch fails", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch movies"),
      ).toBeInTheDocument();
    });
  });

  it("Searches movies when SearchMovie calls onSearch", async () => {
    globalThis.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 1, title: "Top Movie", genre_ids: [12] }],
          total_pages: 5,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 2, title: "Batman", genre_ids: [28] }],
          total_pages: 5,
        }),
      });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Top Movie")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Search Movie"));

    await waitFor(() => {
      expect(screen.getByText("Batman")).toBeInTheDocument();
    });
  });

  it("clears search and goes back to top movies", async () => {
    globalThis.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 1, title: "Top Movie", genre_ids: [12] }],
          total_pages: 5,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 2, title: "Batman", genre_ids: [28] }],
          total_pages: 5,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 3, title: "Top Movie Again", genre_ids: [35] }],
          total_pages: 5,
        }),
      });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Top Movie")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Search Movie"));

    await waitFor(() => {
      expect(screen.getByText("Batman")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Clear Movie"));

    await waitFor(() => {
      expect(screen.getByText("Top Movie Again")).toBeInTheDocument();
    });
  });

  it("Navigates to movie details when movie is clicked", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ id: 10, title: "Avatar", genre_ids: [14] }],
        total_pages: 5,
      }),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Avatar")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Avatar"));

    expect(mockNavigate).toHaveBeenCalledWith("/movie/10");
  });
});
