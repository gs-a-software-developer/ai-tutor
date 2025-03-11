// SortModal.jsx
import React, { useState } from "react";
import { X, CaretUp, CaretDown } from "@phosphor-icons/react";
import styles from "./SortModal.module.css";
import buttonstyles from "../../styles/buttonstyles.module.css";

const SortModal = ({
  isOpen,
  onClose,
  displayOptions,
  fileTypes,
  onSortOptionChange,
  onSortOrderChange,
  onFileTypeSelect,
  selectedFileType,
  sortOrder,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  if (!isOpen) return null;

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleClearAll = () => {
    onFileTypeSelect([]);
    onSortOrderChange("ascending");
    onSortOptionChange("date");
    onSortOptionChange("");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Sort and Filter Options</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.dropdownGroup}>
          <Dropdown
            label="Sort Order"
            type="radio"
            options={displayOptions}
            selected={sortOrder} // Use sortOrder to determine the selected option
            onSelect={(option) => onSortOrderChange(option.toLowerCase())} // Ensure the option is lowercase
            isOpen={openDropdown === "sortOrder"}
            toggle={() => toggleDropdown("sortOrder")}
          />
          <Dropdown
            label="File Type"
            type="multi-select"
            options={fileTypes}
            selected={selectedFileType}
            onSelect={(option) => onFileTypeSelect(option)}
            isOpen={openDropdown === "fileType"}
            toggle={() => toggleDropdown("fileType")}
          />
        </div>

        {openDropdown && (
          <div className={styles.dropdownList}>
            {openDropdown === "sortOrder" &&
              displayOptions.map((option, index) => (
                <DropdownItem
                  key={index}
                  option={option}
                  selected={sortOrder} // Use sortOrder to determine the selected option
                  onSelect={(option) => onSortOrderChange(option.toLowerCase())} // Ensure the option is lowercase
                  type="radio"
                />
              ))}
            {openDropdown === "fileType" &&
              fileTypes.map((option, index) => (
                <DropdownItem
                  key={index}
                  option={option}
                  selected={selectedFileType}
                  onSelect={(option) => onFileTypeSelect(option)}
                  type="multi-select"
                />
              ))}
          </div>
        )}

        <div className={styles.modalFooter}>
          <button
            className={`${buttonstyles.button} ${buttonstyles.clearButton}`}
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

const Dropdown = ({ label, isOpen, toggle }) => {
  return (
    <div className={styles.dropdownContainer}>
      <div
        className={`${styles.dropdownHeader} ${isOpen ? styles.open : ""}`}
        onClick={toggle}
      >
        <span className={styles.dropdownText}>{label}</span>
        <div className={styles.caret}>
          {isOpen ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </div>
      </div>
    </div>
  );
};

const DropdownItem = ({ option, selected, onSelect, type }) => {
  const handleChange = () => {
    if (type === "multi-select") {
      const updatedSelection = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      onSelect(updatedSelection);
    } else {
      onSelect(option);
    }
  };

  return (
    <label className={styles.dropdownItem}>
      <input
        type={type === "multi-select" ? "checkbox" : "radio"}
        className={type === "multi-select" ? styles.checkbox : styles.radio}
        checked={
          type === "multi-select"
            ? selected.includes(option)
            : selected === option.toLowerCase()
        }
        onChange={handleChange}
      />
      <span className={styles.dropdownText}>{option}</span>
    </label>
  );
};

export default SortModal;
