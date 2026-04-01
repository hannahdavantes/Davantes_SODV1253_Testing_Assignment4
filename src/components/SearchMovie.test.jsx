import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import SearchMovie from "./SearchMovie";

describe("SearchMovie", () => {
  //Mock functions that gets called for testing in order to get data it receives
  const mockOnSearch = vi.fn();
  const mockOnClear = vi.fn();

  //This gets called for every test
  beforeEach(() => {
    vi.clearAllMocks();

    //Mock the fetching for genres from TMDB
    //Fake API response but similar to TMDB response
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            genres: [
              { id: 28, name: "Action" },
              { id: 35, name: "Comedy" },
            ],
          }),
      }),
    );
  });

  //Cleanup
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Renders input, select and buttons", async () => {
    render(
      <SearchMovie
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        isLoading={false}
      />,
    );

    //Input text
    expect(
      screen.getByPlaceholderText("Search movies by title..."),
    ).toBeInTheDocument();

    //Select
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    //Buttons
    expect(screen.getByRole("button", { name: "SEARCH" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CLEAR" })).toBeInTheDocument();

    //Wait for genres to load - from mock API fetch above
    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Action" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Comedy" }),
      ).toBeInTheDocument();
    });
  });

  it("Fetches and displays genres on mount", async () => {
    render(
      <SearchMovie
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        isLoading={false}
      />,
    );

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByRole("option", { name: "All Genres" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Action" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Comedy" })).toBeInTheDocument();
  });

  it("Calls onSearch with trimmed query and selected genre on submit", async () => {
    //This creates a mock user that simulates a user actions
    const user = userEvent.setup();

    render(
      <SearchMovie
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        isLoading={false}
      />,
    );

    //Get the elements
    const input = screen.getByPlaceholderText("Search movies by title...");
    const select = screen.getByRole("combobox");
    const searchButton = screen.getByRole("button", { name: "SEARCH" });

    //Wait for genres
    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Action" }),
      ).toBeInTheDocument();
    });

    //This is when user is simulated when they search
    await user.type(input, "   Batman   ");
    await user.selectOptions(select, "28");
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith({
      query: "Batman",
      genre: "28",
    });
  });

  it("Calls onSearch when only genre is selected", async () => {
    const user = userEvent.setup();

    render(
      <SearchMovie
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        isLoading={false}
      />,
    );

    const select = screen.getByRole("combobox");
    const searchButton = screen.getByRole("button", { name: "SEARCH" });

    //Wait for genres
    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Comedy" }),
      ).toBeInTheDocument();
    });

    await user.selectOptions(select, "35");
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith({
      query: "",
      genre: "35",
    });
  });

  it("Clears input and genre and calls onClear when CLEAR is clicked", async () => {
    const user = userEvent.setup();

    render(
      <SearchMovie
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        isLoading={false}
      />,
    );

    const input = screen.getByPlaceholderText("Search movies by title...");
    const select = screen.getByRole("combobox");
    const clearButton = screen.getByRole("button", { name: "CLEAR" });

    //Wait for genres
    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Action" }),
      ).toBeInTheDocument();
    });

    await user.type(input, "Inception");
    await user.selectOptions(select, "28");

    expect(input).toHaveValue("Inception");
    expect(select).toHaveValue("28");

    await user.click(clearButton);

    expect(input).toHaveValue("");
    expect(select).toHaveValue("");
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it("Disables buttons when isLoading is true", () => {
    render(
      <SearchMovie
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        isLoading={true}
      />,
    );

    expect(screen.getByRole("button", { name: "SEARCH" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "CLEAR" })).toBeDisabled();
  });

  it("Handles failed genre fetch gracefully", async () => {
    //Watches the console for error logs
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    //Mocks failed fetch
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      }),
    );

    render(
      <SearchMovie
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        isLoading={false}
      />,
    );

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });

    expect(
      screen.getByRole("option", { name: "All Genres" }),
    ).toBeInTheDocument();

    errorSpy.mockRestore();
  });
});
