import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "./MovieCard";

//Since I wrapped the component with a styled componetnt
//The mock method replaces the Wrapper class with just as simple DIV element
vi.mock("../assets/wrappers/MovieCard", () => ({
  default: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

describe("MovieCard", () => {
  //Movie object (similar to TMDB respnse)
  const mockMovie = {
    title: "Inception",
    release_date: "2010-07-16",
    vote_average: 8.8,
    poster_path: "/inception.jpg",
  };

  it("Renders the details about the movies correctly", () => {
    //Renders the movie card component
    render(<MovieCard movie={mockMovie} onClick={vi.fn()} />);

    //This should be rendered
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("8.8")).toBeInTheDocument();

    const img = screen.getByAltText("Inception poster");
    expect(img).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/inception.jpg",
    );
  });

  it("onClick event works", () => {
    const handleClick = vi.fn();

    render(<MovieCard movie={mockMovie} onClick={handleClick} />);

    //Simulates the onClick event
    fireEvent.click(screen.getByText("Inception"));

    expect(handleClick).toHaveBeenCalled();
  });

  it("Shows a dash when release date is missing", () => {
    const movie = { ...mockMovie, release_date: "" };

    render(<MovieCard movie={movie} onClick={vi.fn()} />);

    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("Shows a dash when a vote_average is missing", () => {
    const movie = { ...mockMovie, vote_average: null };

    render(<MovieCard movie={movie} onClick={vi.fn()} />);

    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("Rounds the average to 1 decimal", () => {
    const movie = { ...mockMovie, vote_average: 8.76 };

    render(<MovieCard movie={movie} onClick={vi.fn()} />);

    expect(screen.getByText("8.8")).toBeInTheDocument();
  });

  it("Shows the fallback no-poster image if something went wrong", () => {
    render(<MovieCard movie={mockMovie} onClick={vi.fn()} />);

    const img = screen.getByAltText("Inception poster");

    fireEvent.error(img);

    expect(img).toHaveAttribute("src", "/no-poster.png");
  });
});
