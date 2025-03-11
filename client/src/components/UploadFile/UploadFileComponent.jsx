// UploadFileComponent
import React, { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { X } from "@phosphor-icons/react";
import styles from "./UploadFileComponent.module.css";
import buttonstyles from "../../styles/buttonstyles.module.css";

const UploadFileComponent = ({ onNext }) => {
  const fileInputRef = useRef();
  const modalImageRef = useRef();
  const modalRef = useRef();
  const progressRef = useRef({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const filteredFiles = selectedFiles.filter(
      (file, index, self) =>
        index === self.findIndex((f) => f.name === file.name)
    );
    setValidFiles(filteredFiles);
  }, [selectedFiles]);

  const preventDefault = (e) => e.preventDefault();

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((file) => {
      if (!validateFile(file)) {
        file.invalid = true;
        setUnsupportedFiles((prev) => [...prev, file]);
        setErrorMessage("File type not permitted");
      }
      return file;
    });
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    return validTypes.includes(file.type);
  };

  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return `${(size / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const removeFile = (name) => {
    setValidFiles((prev) => prev.filter((file) => file.name !== name));
    setSelectedFiles((prev) => prev.filter((file) => file.name !== name));
    setUnsupportedFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const closeModal = () => {
    modalRef.current.style.display = "none";
    modalImageRef.current.style.backgroundImage = "none";
  };

  const uploadFiles = async () => {
    for (const file of validFiles) {
      const formData = new FormData();
      formData.append("image", file);

      const progressContainer = progressRef.current[file.name];
      if (progressContainer) {
        progressContainer.querySelector(`.${styles.progress}`).style.width =
          "0%";
        progressContainer.querySelector(
          `.${styles.progressPercentage}`
        ).innerText = "0%";
      }

      try {
        await axios.post("https://api.imgbb.com/1/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            if (progressContainer) {
              progressContainer.querySelector(
                `.${styles.progress}`
              ).style.width = `${uploadPercentage}%`;
              progressContainer.querySelector(
                `.${styles.progressPercentage}`
              ).innerText = `${uploadPercentage}%`;
            }
            if (uploadPercentage === 100) {
              setValidFiles((prevFiles) =>
                prevFiles.filter((item) => item.name !== file.name)
              );
            }
          },
        });
      } catch {
        if (progressContainer) {
          progressContainer.querySelector(
            `.${styles.progress}`
          ).style.backgroundColor = "red";
          progressContainer.querySelector(
            `.${styles.progressPercentage}`
          ).innerText = "Error";
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.modalHeader}>
          <p>Please upload your file here</p>
        </div>

        {unsupportedFiles.length === 0 && validFiles.length > 0 && (
          <button className={styles.fileUploadBtn} onClick={uploadFiles}>
            Upload Files
          </button>
        )}

        {unsupportedFiles.length > 0 && (
          <p className="text-1">Please remove all unsupported files.</p>
        )}

        <div
          className={styles.dropContainer}
          onDragOver={preventDefault}
          onDragEnter={preventDefault}
          onDragLeave={preventDefault}
          onDrop={(e) => {
            preventDefault(e);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current.click()}
        >
          <div className={`${styles.dropMessage} text-1`}>
            <div className={styles.uploadIcon}></div>
            Drag & Drop files here or click to select file(s)
          </div>
          <input
            ref={fileInputRef}
            className={styles.fileInput}
            type="file"
            multiple
            onChange={() => handleFiles(fileInputRef.current.files)}
          />
        </div>
        <div className={`${styles.supportedInfo} text-2`}>
          <span>Supported format: .jpg, .png, .pdf</span>
          <span className={styles.maxSize}>Maximum size: 25MB</span>
        </div>
        <div className={styles.fileDisplayContainer}>
          {validFiles.map((file, i) => (
            <div className={styles.fileStatusBar} key={i}>
              <div className={styles.fileInfo}>
                <div className={styles.fileTypeLogo}>{fileType(file.name)}</div>
                <div className={styles.fileDetails}>
                  <span
                    className={`${styles.fileName} ${
                      file.invalid ? styles.fileError : ""
                    } text-1`}
                  >
                    {file.name}
                  </span>
                  <span className={`${styles.fileSize} text-2`}>
                    {fileSize(file.size)}
                  </span>
                </div>
                <div
                  className={styles.fileRemove}
                  onClick={() => removeFile(file.name)}
                >
                  <X weight="bold" size={12} color="#626567" />
                </div>
              </div>

              <div
                className={styles.progressContainer}
                ref={(el) => (progressRef.current[file.name] = el)}
              >
                <div className={styles.progress}></div>
                <div className={styles.progressPercentage}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button
          type="button"
          onClick={onNext}
          className={`${buttonstyles.button} ${buttonstyles.nextButton}`}
        >
          Next
        </button>
      </div>

      <div className={`${styles.modal} ${styles.modalImage}`} ref={modalRef}>
        <div className={styles.modalOverlay} onClick={closeModal}></div>
        <div className={styles.modalImageContent} ref={modalImageRef}></div>
      </div>
    </div>
  );
};

UploadFileComponent.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default UploadFileComponent;