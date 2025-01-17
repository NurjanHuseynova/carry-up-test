import Image from 'next/image';
import React from 'react';
import arrow from "@/assets/img/arrow.svg";
import styles from "@/assets/css/pagination/pagination.module.css"
import { PaginationProps } from '@/types/type';



const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange,activetab }) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={styles.prev_arrow}
      >
        <Image src={arrow} alt="Previous" />
      </button>

      {pageNumbers.map((page) => (
    <button
    key={page}
    onClick={() => handlePageClick(page)}
    style={
      currentPage === page
        ? { backgroundColor: activetab === "carry" ? "#7fbaff" : "#A883F9A6" }
        : {}
    }
    className={currentPage === page ? styles.active : styles.pageNumber}
  >
    {page}
  </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
     
      >
        <Image src={arrow} alt="Next" />
      </button>
    </div>
  );
};

export default Pagination;


