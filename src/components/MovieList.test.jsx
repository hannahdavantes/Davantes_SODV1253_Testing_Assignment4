import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MovieList from "./MovieList";

vi.mock("./MovieCard", () => ({
  default: ({ movie, onClick }) => (
    <div data-testid="movie-card" onClick={onClick}>
      {movie.title}
    </div>
  ),
}));

const mockMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    release_date: "1994-09-23",
    vote_average: 9.3,
  },
  {
    id: 2,
    title: "The Godfather",
    release_date: "1972-03-24",
    vote_average: 9.2,
  },
];

describe("MovieList", () => {
  it("Shows 'No movies found.' when the movie list is empty", () => {
    render(<MovieList movies={[]} onSelectMovie={vi.fn()} />);

    expect(screen.getByText("No movies found.")).toBeInTheDocument();
  });

  it("Does not show 'No movies found.' when movies exist", () => {
    render(<MovieList movies={mockMovies} onSelectMovie={vi.fn()} />);

    expect(screen.queryByText("No movies found.")).not.toBeInTheDocument();
  });

  it("Renders a MovieCard for each movie", () => {
    render(<MovieList movies={mockMovies} onSelectMovie={vi.fn()} />);

    expect(screen.getAllByTestId("movie-card")).toHaveLength(2);
  });

  it("Calls onSelectMovie with correct movie when clicked", () => {
    const onSelectMovie = vi.fn();

    render(<MovieList movies={mockMovies} onSelectMovie={onSelectMovie} />);

    fireEvent.click(screen.getByText("The Shawshank Redemption"));

    expect(onSelectMovie).toHaveBeenCalledTimes(1);
    expect(onSelectMovie).toHaveBeenCalledWith(mockMovies[0]);
  });
});
