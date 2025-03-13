// SearchBar.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Sliders, TrashSimple } from "@phosphor-icons/react";
import styles from "./SearchBar.module.css";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onSortModalOpen,
}) => {

  return (
    <div className={styles.header}>
      <input
        type="text"
        placeholder="Search files..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={onSearchChange}
        aria-label="Search files"
      />
      <div className={styles.buttonContainer}>
        <button
          className={styles.selectButton}
          onClick={onSortModalOpen}
          aria-label="Open sort and filter options"
        >
          <Sliders size={20} color="#007AFF" />
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSortModalOpen: PropTypes.func.isRequired,
  selectedFiles: PropTypes.array.isRequired,
};

SearchBar.defaultProps = {
  selectedFiles: [],
};

export default React.memo(SearchBar);