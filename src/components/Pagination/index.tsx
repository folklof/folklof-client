import React from "react";
import { Box } from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import styles from "./Pagination.module.scss";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage, onPageChange }) => {
    const renderPageButtons = () => {
      const buttons: React.ReactNode[] = [];
  
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
  
      return buttons;
    };
  
    return (
      <Box className={styles.paginationContainer}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={styles.pageButton}
        >
          <ArrowLeftIcon sx={{fontSize: 30}}/>
        </button>
        {renderPageButtons()}
        <button
          disabled={currentPage === pageCount}
          onClick={() => onPageChange(currentPage + 1)}
          className={styles.pageButton}
        >
          <ArrowRightIcon sx={{fontSize: 30}}/>
        </button>
      </Box>
    );
  };
  
  export default Pagination;