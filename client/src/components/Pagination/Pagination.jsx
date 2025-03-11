// Pagination.js
import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import styles from "./Pagination.module.css";

const PaginationButton = ({
  onClick,
  disabled,
  children,
  ariaLabel,
  isActive,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${styles.pageButton} ${
      isActive ? styles.activePageButton : ""
    }`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <PaginationButton
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        ariaLabel="Previous page"
      >
        <span className={styles.icon}>
          <ArrowLeft
            size={24}
            color={
              currentPage === 1
                ? "var(--color-line-2)"
                : "var(--color-secondary)"
            }
          />
        </span>
      </PaginationButton>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationButton
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          ariaLabel={`Go to page ${index + 1}`}
          isActive={currentPage === index + 1}
        >
          {index + 1}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        ariaLabel="Next page"
      >
        <span className={styles.icon}>
          <ArrowRight
            size={24}
            color={
              currentPage === totalPages
                ? "var(--color-line-2)"
                : "var(--color-secondary)"
            }
          />
        </span>
      </PaginationButton>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default React.memo(Pagination);
