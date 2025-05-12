import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FileList from "../FileList/FileList";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import SortModal from "../SortModal/SortModal";
import { CaretLeft } from "@phosphor-icons/react";
import usePaginationAndSorting from "../../utils/usePaginationAndSorting";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./ModuleFiles.module.css";

import {
  fetchFiles,
  setSearchTerm,
  setSelectedFiles,
  deleteFiles,
  setSortOption,
  setSortOrder,
  setSelectedFileType,
} from "../../redux/actions/fileActions";

const ModuleFiles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { moduleName } = useParams();
  const {
    files,
    searchTerm,
    selectedFiles,
    currentPage,
    loading,
    error,
    sortOption,
    sortOrder,
    selectedFileType,
  } = useSelector((state) => state.files);

  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const { paginatedFiles, totalPages, setCurrentPage } =
    usePaginationAndSorting(files, 10);

  // Fetch files for the specific module
  useEffect(() => {
    if (moduleName) {
      dispatch(fetchFiles(moduleName));
    }
  }, [dispatch, moduleName]);

  const handleCheckboxChange = (fileId) => {
    dispatch(
      setSelectedFiles(
        selectedFiles.includes(fileId)
          ? selectedFiles.filter((id) => id !== fileId)
          : [...selectedFiles, fileId]
      )
    );
  };

  const handleBack = () => navigate(-1);

  const handleDelete = () => {
    dispatch(deleteFiles(selectedFiles));
  };

  const handleSortModalOpen = () => {
    setIsSortModalOpen(true);
  };

  const handleSortModalClose = () => {
    setIsSortModalOpen(false);
  };

  const handleSortOptionChange = (option) => {
    dispatch(setSortOption(option));
  };

  const handleSortOrderChange = (order) => {
    dispatch(setSortOrder(order));
  };

  const handleFileTypeSelect = (types) => {
    dispatch(setSelectedFileType(types));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CaretLeft
          size={20}
          color="#090909"
          onClick={handleBack}
          className={styles.backCaret}
        />
        <h1 className={styles.title}>{moduleName || "Module"}</h1>
      </div>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => dispatch(setSearchTerm(e.target.value))}
        onSelectAllChange={() =>
          dispatch(
            setSelectedFiles(
              selectedFiles.length === files.length
                ? []
                : files.map((file) => file.id)
            )
          )
        }
        isAllSelected={selectedFiles.length === files.length}
        onDelete={handleDelete}
        onSortModalOpen={handleSortModalOpen}
      />
      <FileList
        files={paginatedFiles}
        selectedFiles={selectedFiles}
        onCheckboxChange={handleCheckboxChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
      <SortModal
        isOpen={isSortModalOpen}
        onClose={handleSortModalClose}
        displayOptions={["Ascending", "Descending"]}
        fileTypes={["PDF", "DOC", "XLS"]} // Example file types
        onSortOptionChange={handleSortOptionChange}
        onSortOrderChange={handleSortOrderChange}
        onFileTypeSelect={handleFileTypeSelect}
        selectedFileType={selectedFileType}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default ModuleFiles;
