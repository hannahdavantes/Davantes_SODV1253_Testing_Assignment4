import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "./Pagination";

//Mock the styled Wrapper so styles don't break tests
vi.mock("../assets/wrappers/Pagination", () => ({
    default: ({ children }) => <div>{children}</div>,
}));

describe("Pagination", () => {
    //Pagination should not render if only 1 page
    it("Does not render when totalPages is 1 or less", () => {
        const { container } = render(
            <Pagination
                page={1}
                totalPages={1}
                isLoading={false}
                onPageChange={vi.fn()}
            />,
        );

        //Expect nothing to be rendered
        expect(container.firstChild).toBeNull();
    });

    //The prev/next button and page number should appear
    it("renders Prev, Next, and page buttons", () => {
        render(
            <Pagination
                page={1}
                totalPages={5}
                isLoading={false}
                onPageChange={vi.fn()}
            />,
        );

        //Check if navigation buttons exist
        expect(screen.getByText("Prev")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();

        //Check if some page numbers exist
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    //Prev button should be disabled on first page (for pages > 1)
    it("Disables Prev button on first page", () => {
        render(
            <Pagination
                page={1}
                totalPages={5}
                isLoading={false}
                onPageChange={vi.fn()}
            />,
        );

        expect(screen.getByText("Prev")).toBeDisabled();
        expect(screen.getByText("Next")).not.toBeDisabled();
    });

    //Next button should be disabled on last page
    it("Disables Next button on last page", () => {
        render(
            <Pagination
                page={5}
                totalPages={5}
                isLoading={false}
                onPageChange={vi.fn()}
            />,
        );

        expect(screen.getByText("Next")).toBeDisabled();
        expect(screen.getByText("Prev")).not.toBeDisabled();
    });

    //Clicking Prev should go to previous page
    it("Calls onPageChange with previous page when Prev is clicked", () => {
        const onPageChange = vi.fn();

        render(
            <Pagination
                page={3}
                totalPages={5}
                isLoading={false}
                onPageChange={onPageChange}
            />,
        );

        //Simulate clicking Prev
        fireEvent.click(screen.getByText("Prev"));

        //Expect function to be called with page 2
        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    //Clicking Next should go to next page
    it("Calls onPageChange with next page when Next is clicked", () => {
        const onPageChange = vi.fn();

        render(
            <Pagination
                page={3}
                totalPages={5}
                isLoading={false}
                onPageChange={onPageChange}
            />,
        );

        //Simulate clicking Next
        fireEvent.click(screen.getByText("Next"));

        //Expect function to be called with page 4
        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(4);
    });

    //Clicking a page number should go to that page
    it("calls onPageChange with the correct page number when a page button is clicked", () => {
        const onPageChange = vi.fn();

        render(
            <Pagination
                page={3}
                totalPages={5}
                isLoading={false}
                onPageChange={onPageChange}
            />,
        );

        //Click page 5
        fireEvent.click(screen.getByText("5"));

        //Expect function to be called with 5
        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(5);
    });

    //Ellipsis (...) should appear when pages are skipped
    it("Shows ellipsis when there are skipped pages", () => {
        render(
            <Pagination
                page={6}
                totalPages={10}
                isLoading={false}
                onPageChange={vi.fn()}
            />,
        );

        //Expect the ellipsis (...) to appear twice (start and end)
        const ellipsis = screen.getAllByText("...");
        expect(ellipsis).toHaveLength(2);
    });

    //Current page should have active class
    it("applies active class to current page", () => {
        render(
            <Pagination
                page={3}
                totalPages={5}
                isLoading={false}
                onPageChange={vi.fn()}
            />,
        );

        expect(screen.getByText("3")).toHaveClass("active");
    });
});
