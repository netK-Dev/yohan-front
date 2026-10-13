type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // nombre de pages adjacentes visibles
  className?: string;
};

const DOTS = '…';

function getPaginationRange(
  currentPage: number,
  totalItems: number,
  pageSize: number,
  siblingCount: number = 1
): (number | string)[] {
  const totalPageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  const totalPageNumbers = siblingCount + 5; // first, last, current, 2 dots, siblings

  if (totalPageNumbers >= totalPageCount) {
    return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount
  );

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPageCount - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, DOTS, lastPageIndex];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => lastPageIndex - rightItemCount + 1 + i
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  return [
    firstPageIndex,
    DOTS,
    ...Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    ),
    DOTS,
    lastPageIndex,
  ];
}

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalPages <= 1) return null;

  const range = getPaginationRange(
    currentPage,
    totalItems,
    pageSize,
    siblingCount
  );

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const baseBtn =
    'min-h-11 min-w-11 rounded-sm border border-white/20 px-3 py-2 text-sm text-white/75 transition-colors hover:border-white/60 hover:text-white disabled:hover:border-white/20';
  const activeBtn = 'border-white bg-white text-black!';

  return (
    <nav
      className={[
        'mt-8 flex flex-wrap items-center justify-center gap-2',
        className || '',
      ].join(' ')}
      aria-label="Pagination"
    >
      <button
        type="button"
        className={`${baseBtn} ${isFirst ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={() => !isFirst && onPageChange(currentPage - 1)}
        aria-label="Page précédente"
        disabled={isFirst}
      >
        <span aria-hidden="true">←</span>
        <span className="sr-only sm:not-sr-only sm:ml-2">Précédent</span>
      </button>

      {range.map((item, idx) => {
        if (item === DOTS) {
          return (
            <span key={`dots-${idx}`} className="px-2 text-white/60">
              {DOTS}
            </span>
          );
        }
        const pageNum = item as number;
        const isActive = pageNum === currentPage;
        return (
          <button
            type="button"
            key={pageNum}
            className={[baseBtn, isActive ? activeBtn : ''].join(' ')}
            onClick={() => onPageChange(pageNum)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Aller à la page ${pageNum}`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        className={`${baseBtn} ${isLast ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={() => !isLast && onPageChange(currentPage + 1)}
        aria-label="Page suivante"
        disabled={isLast}
      >
        <span className="sr-only sm:not-sr-only sm:mr-2">Suivant</span>
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}
