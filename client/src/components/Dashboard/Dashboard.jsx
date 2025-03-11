// Dashboard.js
import React, { useMemo } from "react";
import { CaretDown } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import File from "../File/File";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./Dashboard.module.css";
import { useFiles } from "../../hooks/useFiles";

const Dashboard = () => {
  const { files, loading, error } = useFiles();

  // Memoize file counts to avoid recalculating on every render
  const fileCounts = useMemo(() => {
    const counts = { video: 0, document: 0, image: 0 };
    files.forEach((file) => counts[file.type]++);
    return counts;
  }, [files]);

  const totalFiles = fileCounts.video + fileCounts.document + fileCounts.image;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <FileList files={files} />
    </div>
  );
};

const FileList = ({ files }) => (
  <div className={styles.content}>
    {files.map((file) => (
      <File key={file.id} file={file} />
    ))}
  </div>
);

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Dashboard;
