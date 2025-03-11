// FileList.js
import React from "react";
import PropTypes from "prop-types";
import File from "../File/File";
import styles from "./FileList.module.css";

const FileItem = ({ file, isSelected, onCheckboxChange, showCheckboxes }) => {
  return (
    <div className={styles.fileItem}>
      {showCheckboxes && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onCheckboxChange(file.id)}
          className={styles.checkbox}
        />
      )}
      <File file={file} />
    </div>
  );
};


const FileList = ({ files, selectedFiles, onCheckboxChange, showCheckboxes }) => {
  return (
    <div className={styles.fileList}>
      {files.map((file) => (
        <FileItem
          key={file.id}
          file={file}
          isSelected={selectedFiles.includes(file.id)}
          onCheckboxChange={onCheckboxChange}
          showCheckboxes={showCheckboxes}
        />
      ))}
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  showCheckboxes: PropTypes.bool.isRequired,
};

FileItem.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  showCheckboxes: PropTypes.bool.isRequired,
};

export default React.memo(FileList);