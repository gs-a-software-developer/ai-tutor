// Files;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileList from "../FileList/FileList";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import SortModal from "../SortModal/SortModal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import usePaginationAndSorting from "../../utils/usePaginationAndSorting";
import styles from "./Files.module.css";
import {
  fetchFiles,
  setSearchTerm,
  setSelectedFiles,
  deleteFiles,
  setSortOption,
  setSortOrder,
  setSelectedFileType,
} from "../../redux/actions/fileActions";

const Files = ({ moduleName = null }) => {
  const dispatch = useDispatch();
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

  const {
    paginatedFiles,
    totalPages,
    setCurrentPage,
    setSortOption: setSortOptionLocal,
    setSortOrder: setSortOrderLocal,
  } = usePaginationAndSorting(files, 10);

  useEffect(() => {
    dispatch(fetchFiles(moduleName));
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

  const handleDelete = () => {
    dispatch(deleteFiles(selectedFiles));
  };

  const handleSortOptionChange = (option) => {
    dispatch(setSortOption(option));
    setSortOptionLocal(option);
  };

  const handleSortOrderChange = (order) => {
    dispatch(setSortOrder(order));
    setSortOrderLocal(order);
  };

  const handleFileTypeSelect = (types) => {
    dispatch(setSelectedFileType(types));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1 className="heading-1">{moduleName || "Files"}</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => dispatch(setSearchTerm(e.target.value))}
        onSelectAllChange={() =>
          dispatch(
            setSelectedFiles(
              selectedFiles.length === files.length ? [] : files.map((file) => file.id)
            )
          )
        }
        isAllSelected={selectedFiles.length === files.length}
        onDelete={handleDelete}
        onSortModalOpen={() => setIsSortModalOpen(true)}
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
        onClose={() => setIsSortModalOpen(false)}
        displayOptions={["Ascending", "Descending"]}
        fileTypes={["PDF", "DOC", "XLS"]}
        onSortOptionChange={handleSortOptionChange}
        onSortOrderChange={handleSortOrderChange}
        onFileTypeSelect={handleFileTypeSelect}
        selectedFileType={selectedFileType}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default Files;
