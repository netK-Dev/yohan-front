import { COLOR_COMBINATIONS } from '@/lib/colors';

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
    'rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white sm:px-4 sm:py-2.5';
  const activeBtn = `${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.hover} text-white border-[#ff0015]/60`;

  return (
    <nav
      className={[
        'mt-8 flex items-center justify-center gap-2 sm:gap-3',
        className || '',
      ].join(' ')}
      aria-label="Pagination"
    >
      <button
        className={`${baseBtn} ${isFirst ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={() => !isFirst && onPageChange(currentPage - 1)}
        aria-label="Page précédente"
        disabled={isFirst}
      >
        Précédent
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
        className={`${baseBtn} ${isLast ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={() => !isLast && onPageChange(currentPage + 1)}
        aria-label="Page suivante"
        disabled={isLast}
      >
        Suivant
      </button>
    </nav>
  );
}
