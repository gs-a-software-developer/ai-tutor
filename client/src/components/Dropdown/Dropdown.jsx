// Dropdown.js
import React, { useRef, useEffect, useState } from "react";
import { CaretUp, CaretDown } from "@phosphor-icons/react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ label, isOpen, toggle, options, onSelect, selectedOption }) => {
  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const triggerRect = dropdownRef.current.getBoundingClientRect();
      const dropdownWidth = triggerRect.width;
      const dropdownHeight = 200;

      let left = triggerRect.left;
      let top = triggerRect.bottom;

      if (left + dropdownWidth > window.innerWidth) {
        left = window.innerWidth - dropdownWidth;
      }

      if (top + dropdownHeight > window.innerHeight) {
        top = triggerRect.top - dropdownHeight;
      }

      setDropdownPosition({
        top: top + window.scrollY,
        left: left + window.scrollX,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggle]);

  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      onSelect(null);
    } else {
      onSelect(option);
    }
    toggle();
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div
        className={`${styles.dropdownHeader} ${isOpen ? styles.open : ""}`}
        onClick={toggle}
      >
        <span className={styles.dropdownText}>{selectedOption || label}</span>
        <div className={styles.caret}>
          {isOpen ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </div>
      </div>
      {isOpen && (
        <div
          className={styles.dropdownListWrapper}
          style={{
            position: "fixed",
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownRef.current?.clientWidth,
          }}
        >
          <div className={styles.dropdownList}>
            {options.map((option) => (
              <div
                key={option}
                className={`${styles.dropdownItem} ${
                  selectedOption && selectedOption !== option ? styles.disabled : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <input
                  type="radio"
                  name="dropdown-option"
                  checked={selectedOption === option}
                  readOnly
                  className={styles.radioButton}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;