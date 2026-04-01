import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MovieDetailsModal from "./MovieDetailsModal";

const mockNavigate = vi.fn();

//Mock router hooks for navigation and params
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "123" }),
}));

//Mock portal so modal renders normally in test
vi.mock("react-dom", () => ({
  createPortal: (node) => node,
}));

//Mock wrapper to simplify DOM
vi.mock("../assets/wrappers/MovieDetailsModal", () => ({
  default: ({ children, onClick }) => <div onClick={onClick}>{children}</div>,
}));

describe("MovieDetailsModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();

    //Mock portal root
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "modal-portal");
    document.body.appendChild(portalRoot);
  });

  it("Shows movie details and cast after successful fetch", async () => {
    globalThis.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 123,
          title: "Batman",
          release_date: "2022-03-01",
          vote_average: 8.2,
          overview: "A dark superhero movie",
          runtime: 176,
          genres: [{ name: "Action" }, { name: "Drama" }],
          poster_path: "/poster.jpg",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          cast: [{ id: 1, name: "Robert Pattinson", character: "Batman" }],
        }),
      });

    render(<MovieDetailsModal />);

    //Check loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    //Wait until movie details render
    expect(
      await screen.findByText("A dark superhero movie"),
    ).toBeInTheDocument();

    //Check content
    expect(screen.getByText(/176 min/)).toBeInTheDocument();
    expect(screen.getByText(/Action, Drama/)).toBeInTheDocument();
    expect(screen.getByText("Robert Pattinson")).toBeInTheDocument();
    expect(screen.getByText("Cast")).toBeInTheDocument();
  });

  it("Shows error when movie fetch fails", async () => {
    globalThis.fetch
      .mockResolvedValueOnce({
        ok: false,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          cast: [],
        }),
      });

    render(<MovieDetailsModal />);

    //Wait for error message
    expect(
      await screen.findByText("Error: Failed to fetch movie details"),
    ).toBeInTheDocument();
  });

  it("Shows no cast found when cast list is empty", async () => {
    globalThis.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 123,
          title: "Batman",
          release_date: "2022-03-01",
          vote_average: 8.2,
          overview: "A dark superhero movie",
          runtime: 176,
          genres: [{ name: "Action" }],
          poster_path: "/poster.jpg",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          cast: [],
        }),
      });

    render(<MovieDetailsModal />);

    //Wait for no cast message
    expect(await screen.findByText("No cast found.")).toBeInTheDocument();
  });

  it("Navigates back home when close button is clicked", async () => {
    globalThis.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 123,
          title: "Batman",
          release_date: "2022-03-01",
          vote_average: 8.2,
          overview: "A dark superhero movie",
          runtime: 176,
          genres: [{ name: "Action" }],
          poster_path: "/poster.jpg",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          cast: [],
        }),
      });

    render(<MovieDetailsModal />);

    //Wait until button is visible
    expect(await screen.findByText("Close")).toBeInTheDocument();

    //Click close
    fireEvent.click(screen.getByText("Close"));

    //Check navigation
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
