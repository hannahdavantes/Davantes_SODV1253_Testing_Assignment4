import { memo, useMemo } from "react";
import Wrapper from "../assets/wrappers/Pagination";

const Pagination = ({ page, totalPages, isLoading, onPageChange }) => {
  //We memoize the pages so it doesn't rebuild on every rerender
  const pages = useMemo(() => {
    //We don't render the pagination if there's only 1 page
    if (totalPages <= 1) return [];

    //This determines that 2 pages are shown before and after
    //So if curent page is 11 then it show 9, 10 (2 before)
    //11 (actual page), then 12, 13 (2 after)
    const windowSize = 2;
    const start = Math.max(2, page - windowSize);
    const end = Math.min(totalPages - 1, page + windowSize);

    const pageItems = [];

    //First page is always shown
    pageItems.push(1);

    //Add the ellipsis (...)
    if (start > 2) {
      pageItems.push("start-ellipsis");
    }

    //Add middle window pages
    for (let i = start; i <= end; i++) {
      pageItems.push(i);
    }

    //Add the ellipsis
    if (end < totalPages - 1) {
      pageItems.push("end-ellipsis");
    }

    //Last page is alwasy sjhown
    if (totalPages > 1) {
      pageItems.push(totalPages);
    }

    return pageItems;
  }, [page, totalPages]);

  //We don't render the pagination if there's only 1 page
  if (totalPages <= 1) return null;

  return (
    <Wrapper>
      <button
        className="btn-page"
        disabled={page === 1 || isLoading}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      {pages.map((p, index) => {
        if (p === "start-ellipsis" || p === "end-ellipsis") {
          return (
            <span key={p + index} className="ellipsis">
              ...
            </span>
          );
        }

        return (
          <button
            key={p}
            className={`btn-page ${p === page ? "active" : ""}`}
            disabled={isLoading}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        );
      })}

      <button
        className="btn-page"
        disabled={page === totalPages || isLoading}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </Wrapper>
  );
};

//This avoids rerender if props did not change
export default memo(Pagination);
