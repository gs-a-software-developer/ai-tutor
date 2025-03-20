// File.jsx
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { CaretCircleDown, CaretCircleUp, Video, FileText, Image, Trash, DownloadSimple, DotsThreeVertical } from "@phosphor-icons/react";
import DeleteModal from "../DeleteModal/DeleteModal";
import styles from "./File.module.css";

// Constants for reusable values
const ICON_SIZE = 32;
const ICON_COLOR = "var(--color-secondary)";
const ICON_WEIGHT = "thin";

// FileIcon Component (Reusable)
const FileIcon = ({ type }) => {
  const iconProps = { size: ICON_SIZE, color: ICON_COLOR, weight: ICON_WEIGHT };

  switch (type) {
    case "video":
      return <Video {...iconProps} />;
    case "document":
      return <FileText {...iconProps} />;
    case "image":
      return <Image {...iconProps} />;
    default:
      return null;
  }
};

// FileTags Component (Reusable)
const FileTags = ({ tags }) => (
  <div className={styles.tags}>
    {tags.map((tag, index) => (
      <span key={index} className={styles.tag}>
        {tag}
      </span>
    ))}
  </div>
);

// DropdownButton Component (Reusable)
const DropdownButton = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className={styles.dropdownButton}
    aria-expanded={isOpen}
    aria-label={isOpen ? "Collapse dropdown" : "Expand dropdown"}
  >
    {isOpen ? (
      <CaretCircleUp size={20} weight="fill" color={ICON_COLOR} />
    ) : (
      <CaretCircleDown size={20} weight="fill" color={ICON_COLOR} />
    )}
  </button>
);

// Main File Component
const File = React.memo(({ file, onSelect, onDelete }) => {
  console.log("onDelete prop:", onDelete); // Debugging

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleMenuClick = useCallback((e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  }, []);

  const handleDeleteClick = useCallback((e) => {
    e.stopPropagation();
    setModalOpen(true);
    setMenuOpen(false);
  }, []);

  const handleDownloadClick = useCallback((e) => {
    e.stopPropagation();
    // Implement download functionality here
    setMenuOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    console.log("Deleting file with ID:", file.id); // Debugging
    if (typeof onDelete === "function") {
      onDelete(file.id);
    } else {
      console.error("onDelete is not a function");
    }
    setModalOpen(false);
  }, [file.id, onDelete]);

  const handleCancelDelete = useCallback(() => {
    setModalOpen(false);
  }, []);

  const tags = [file.moduleCode, file.faculty, file.theme].filter(Boolean);

  return (
    <div className={styles.wrapper} onClick={onSelect} role="button" tabIndex={0}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.fileIcon}>
            <FileIcon type={file.type} />
          </div>
          <div className={styles.textContainer}>
            <div className={`${styles.fileName} text-1`}>{file.name}</div>
            <div className={`${styles.authorName} text-2`}>{file.author}</div>
            <div className={`${styles.timeText} text-2`}>{file.date}</div>
          </div>
          <FileTags tags={tags} />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.menuContainer}>
            <button onClick={handleMenuClick} className={styles.menuButton} aria-label="File options">
              <DotsThreeVertical size={16} color="var(--color-muted)" />
            </button>
            {isMenuOpen && (
              <div className={styles.menuPopup}>
                <button onClick={handleDownloadClick} className={styles.menuItem}>
                  <DownloadSimple size={16} weight="fill" color={ICON_COLOR} />
                  <span>Download</span>
                </button>
                <button onClick={handleDeleteClick} className={styles.menuItem}>
                  <Trash size={16} weight="fill" color="rgba(218, 38, 62, 0.7)" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
          <DropdownButton isOpen={isDropdownOpen} onClick={toggleDropdown} />
        </div>
      </div>
      {isDropdownOpen && (
        <div className={`${styles.bottomSection} ${isDropdownOpen ? styles.bottomSectionOpen : ""}`}>
          <p className={`${styles.descriptionTitle} text-2`}>Description</p>
          <p className={`${styles.description} text-1`}>{file.description}</p>
        </div>
      )}

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this file?"
      />
    </div>
  );
});

// PropTypes for type checking
File.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["video", "document", "image"]).isRequired,
    moduleCode: PropTypes.string,
    faculty: PropTypes.string,
    theme: PropTypes.string,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func.isRequired, // Ensure onDelete is required
};

File.defaultProps = {
  onSelect: () => {},
};

export default File;