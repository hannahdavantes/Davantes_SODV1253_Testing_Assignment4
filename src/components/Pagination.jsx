import Wrapper from "../assets/wrappers/Pagination";

const Pagination = ({ page, totalPages, isLoading, onPageChange }) => {
  //We don't render the pagination if there's only 1 page
  if (totalPages <= 1) return null;

  //This determines that 2 pages are shown before and after
  //So if curent page is 11 then it show 9, 10 (2 before)
  //11 (actual page), then 12, 13 (2 after)
  const windowSize = 2;
  const start = Math.max(2, page - windowSize);
  const end = Math.min(totalPages - 1, page + windowSize);

  const pages = [];

  //First page is always shown
  pages.push(1);

  //Add the ellipsis (...)
  if (start > 2) {
    pages.push("start-ellipsis");
  }

  //Add middle window pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  //Add the ellipsis
  if (end < totalPages - 1) {
    pages.push("end-ellipsis");
  }

  //Last page is alwasy sjhown
  if (totalPages > 1) {
    pages.push(totalPages);
  }

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

export default Pagination;
