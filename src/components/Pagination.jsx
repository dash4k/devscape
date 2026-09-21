const getPageNumbers = (current, total) => {
  const delta = 1;
  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }
  return pages;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const baseBtn =
    'min-w-9 h-9 px-3 rounded-lg text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer';

  return (
    <nav
      aria-label="Pagination"
      className="w-full flex items-center justify-center gap-1 mt-6"
    >
      <button
        className={`${baseBtn} hover:bg-surface-container-highest disabled:hover:bg-surface text-text-primary`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {getPageNumbers(currentPage, totalPages).map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-1 text-gray-400 cursor-default">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`${baseBtn} ${
              p === currentPage
                ? 'bg-accent-cta text-text-on-cta font-bold'
                : 'hover:bg-surface-container-highest text-text-primary'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        className={`${baseBtn} hover:bg-surface-container-highest disabled:hover:bg-surface text-text-primary`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
