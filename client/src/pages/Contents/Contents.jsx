// Contents
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../../redux/actions/contentActions";
import { CaretLeft, Sliders } from "@phosphor-icons/react";
import Content from "../../components/Content/Content";
import SortModal from "../../components/SortModal/SortModal";
import styles from "./Contents.module.css";

const Contents = ({ onSelectFiles }) => {
  const navigate = useNavigate();
  const { moduleName } = useParams();
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.content);

  const [displayFilter, setDisplayFilter] = useState(["All Modules"]);
  const [contentTypeFilter, setContentTypeFilter] = useState([]);
  const [fileTypeFilter, setFileTypeFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleBack = () => navigate(-1);

  useEffect(() => {
    if (moduleName) {
      dispatch(fetchContent(moduleName));
    }
  }, [dispatch, moduleName]);

  const displayOptions = useMemo(
    () => ["All Modules", "Lecturer's Content", "AI-Tutor Content"],
    []
  );

  const contentTypes = useMemo(() => {
    if (!content[moduleName]) return [];
    return Array.from(
      new Set(content[moduleName].map((item) => item.contentType))
    );
  }, [content, moduleName]);

  const fileTypes = useMemo(() => {
    if (!content[moduleName]) return [];
    return Array.from(
      new Set(content[moduleName].map((item) => item.fileType))
    );
  }, [content, moduleName]);

  useEffect(() => {
    if (!content[moduleName]) return;

    const filteredContents = content[moduleName].filter((item) => {
      const matchesDisplay =
        displayFilter.includes("All Modules") ||
        (displayFilter.includes("Lecturer's Content") &&
          item.origin === "Lecturer") ||
        (displayFilter.includes("AI-Tutor Content") &&
          item.origin === "AI-Tutor");

      const matchesContentType =
        contentTypeFilter.length === 0 ||
        contentTypeFilter.includes(item.contentType);

      const matchesFileType =
        fileTypeFilter.length === 0 || fileTypeFilter.includes(item.fileType);

      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesDisplay && matchesContentType && matchesFileType && matchesSearch
      );
    });

    setFilteredData({ [moduleName]: filteredContents });
  }, [
    content,
    moduleName,
    displayFilter,
    contentTypeFilter,
    fileTypeFilter,
    searchQuery,
  ]);

  const handleSelectFile = (fileId) => {
    console.log("File selected:", fileId);
    setSelectedFiles((prevSelected) => {
      if (prevSelected.includes(fileId)) {
        return prevSelected.filter((id) => id !== fileId);
      } else {
        return [...prevSelected, fileId];
      }
    });
  };

  // Pass selectedFiles to the parent component
  useEffect(() => {
    onSelectFiles(selectedFiles);
  }, [selectedFiles, onSelectFiles]);

  return (
    <div className={styles.contentsContainer}>
      {loading && <p>Loading content...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.header}>
        <CaretLeft
          size={20}
          color="#090909"
          onClick={handleBack}
          className={styles.backCaret}
        />
        <h1 className={styles.title}>{moduleName || "Module"}</h1>
      </div>
      <div className={styles.toolbar}>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search by title..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBar}
          />
        </div>
        <button
          className={styles.selectButton}
          onClick={() => setIsModalOpen(true)}
        >
          <Sliders size={20} color="#007AFF" />
        </button>
      </div>
      <div className={styles.modulesGrid}>
        {Object.entries(filteredData).map(([section, contents]) => (
          <div key={section}>
            {Array.isArray(contents) && contents.length > 0 ? (
              contents.map((item) => (
                <Content
                  key={item.id}
                  content={item}
                  isSelected={selectedFiles.includes(item.id)}
                  onSelect={handleSelectFile}
                />
              ))
            ) : (
              <p className={styles.noContentMessage}>
                No content available for the selected filters.
              </p>
            )}
          </div>
        ))}

        {Object.keys(filteredData).length === 0 && (
          <p className={styles.noContentMessage}>
            No content available for the selected module.
          </p>
        )}
      </div>
      <SortModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        displayOptions={displayOptions}
        contentTypes={contentTypes}
        fileTypes={fileTypes}
        displayFilter={displayFilter}
        setDisplayFilter={setDisplayFilter}
        contentTypeFilter={contentTypeFilter}
        setContentTypeFilter={setContentTypeFilter}
        fileTypeFilter={fileTypeFilter}
        setFileTypeFilter={setFileTypeFilter}
      />
    </div>
  );
};

export default Contents;
