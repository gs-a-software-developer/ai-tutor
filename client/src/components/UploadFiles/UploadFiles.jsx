// UploadFiles
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../redux/actions/uploadActions';
import { Video, FileText, Image } from "@phosphor-icons/react";
import AddFile from '../AddFile/AddFile';
import styles from './UploadFiles.module.css';


// Reusable Icon Component
const IconButton = ({ icon: Icon, label, isActive, onClick }) => (
  <div
    className={`${styles.iconWrapper} ${isActive ? styles.active : ''}`}
    onClick={onClick}
  >
    <Icon color={isActive ? '#007AFF' : '#D2D2D2'} size={40} weight="thin" />
    <span className={`${styles.iconText} ${isActive ? styles.activeText : ''}`}>{label}</span>
  </div>
);

IconButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const UploadFiles = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.upload);
  const [activeIcon, setActiveIcon] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleIconClick = useCallback((icon, event) => {
    event.stopPropagation();
    setActiveIcon(icon);
  }, []);

  const handleUploadClick = useCallback((event) => {
    event.stopPropagation();
    setShowPopup(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.iconWrapper}`) && !event.target.closest(`.${styles.uploadButton}`)) {
        setActiveIcon(null);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Files</h1>
      <div className={styles.iconContainer}>
        <IconButton
          icon={Video}
          label="Video"
          isActive={activeIcon === 'video'}
          onClick={(e) => handleIconClick('video', e)}
        />
        <IconButton
          icon={Image}
          label="Images"
          isActive={activeIcon === 'images'}
          onClick={(e) => handleIconClick('images', e)}
        />
        <IconButton
          icon={FileText}
          label="Documents"
          isActive={activeIcon === 'documents'}
          onClick={(e) => handleIconClick('documents', e)}
        />
      </div>
      <button
        className={`${styles.uploadButton} ${activeIcon ? styles.active : ''}`}
        onClick={handleUploadClick}
      >
        Upload
      </button>
      {showPopup && <AddFile onClose={handleClosePopup} />}
      {loading && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default UploadFiles;