import React from "react";
import { Box } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  const renderPageButtons = () => {
    const buttons: React.ReactNode[] = [];
    const range = 1;
  
    if (pageCount <= 5) {
      Array.from({ length: pageCount }).forEach((_, index) => {
        const pageNumber = index + 1;
        buttons.push(
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? styles.activePage : styles.pageNumber}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      });
    } else {
      Array.from({ length: pageCount }).forEach((_, index) => {
        const pageNumber = index + 1;
        const isCurrent = pageNumber === currentPage;
        const isInRange = Math.abs(pageNumber - currentPage) <= range;
  
        if (currentPage === pageCount) {
          if (
            isCurrent ||
            pageNumber === 1 ||
            pageNumber === pageCount - 1 ||
            pageNumber === pageCount
          ) {
            buttons.push(
              <button
                key={pageNumber}
                className={isCurrent ? styles.activePage : styles.pageNumber}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          } else if (pageNumber === pageCount - 2) {
            buttons.push(
              <span key={`ellipsisBeforeLast${pageNumber}`} className={styles.outRangePageNumber}>
                ..
              </span>
            );
          }
        } else if (currentPage > 2) {
          if (isCurrent || pageNumber === 1 || pageNumber === pageCount) {
            buttons.push(
              <button
                key={pageNumber}
                className={isCurrent ? styles.activePage : styles.pageNumber}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          } else if (pageNumber === 2 || pageNumber === pageCount - 1) {
            buttons.push(
              <span key={`ellipsis${pageNumber}`} className={styles.outRangePageNumber}>
                ..
              </span>
            );
          }
        } else {
          if (
            isCurrent ||
            isInRange ||
            pageNumber === 1 ||
            pageNumber === pageCount ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            buttons.push(
              <button
                key={pageNumber}
                className={isCurrent ? styles.activePage : styles.pageNumber}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          } else if (pageNumber === 2) {
            buttons.push(
              <span key={`ellipsisStart${pageNumber}`} className={styles.outRangePageNumber}>
                ..
              </span>
            );
          } else if (pageNumber === pageCount - 1) {
            buttons.push(
              <span key={`ellipsisEnd${pageNumber}`} className={styles.outRangePageNumber}>
                ..
              </span>
            );
          }
        }
      });
    }
  
    return buttons;
  };
    
  
  return (
    <Box className={styles.paginationContainer}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.pageButton}
      >
        <ArrowLeftIcon sx={{ fontSize: 30 }} />
      </button>
      {renderPageButtons()}
      <button
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.pageButton}
      >
        <ArrowRightIcon sx={{ fontSize: 30 }} />
      </button>
    </Box>
  );
};

export default Pagination;
