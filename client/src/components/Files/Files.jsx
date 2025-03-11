// Files.js
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileList from "../FileList/FileList";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import SortModal from "../SortModal/SortModal";
import fileTypesData from "../../data/fileTypes.json";
import styles from "./Files.module.css";
import {
  setSearchTerm,
  setSortOption,
  setSortOrder,
  setSelectedFiles,
  setCurrentPage,
  setSelectedFileType,
  setSelectedCategory,
  fetchFiles,
  deleteFiles,
} from "../../redux/actions/fileActions";

const Files = () => {
  const dispatch = useDispatch();
  const {
    files,
    searchTerm,
    sortOption,
    sortOrder,
    selectedFiles,
    currentPage,
    selectedFileType,
    selectedCategory,
  } = useSelector((state) => state.files);
  const [isSortModalOpen, setSortModalOpen] = useState(false);

  const filesPerPage = 10;

  // Fetch files when the component mounts
  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  // Filter files based on search term and selected file type
  const filteredFiles = useMemo(() => {
    return files.filter(
      (file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedFileType.length === 0 ||
          selectedFileType.includes(file.fileType))
    );
  }, [files, searchTerm, selectedFileType]);

  // Sort files based on the selected sort option and order
  const sortedFiles = useMemo(() => {
    return [...filteredFiles].sort((a, b) => {
      let comparison = 0;
      switch (sortOption) {
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
        case "moduleCode":
          comparison = a.moduleCode.localeCompare(b.moduleCode);
          break;
        case "theme":
          comparison = a.theme.localeCompare(b.theme);
          break;
        case "faculty":
          comparison = a.faculty.localeCompare(b.faculty);
          break;
        default:
          comparison = new Date(b.date) - new Date(a.date);
          break;
      }
      return sortOrder === "ascending" ? comparison : -comparison;
    });
  }, [filteredFiles, sortOption, sortOrder]);

  // Paginate files
  const paginatedFiles = useMemo(() => {
    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    return sortedFiles.slice(indexOfFirstFile, indexOfLastFile);
  }, [sortedFiles, currentPage]);

  const totalPages = Math.ceil(sortedFiles.length / filesPerPage);

  // Handle file selection
  const handleCheckboxChange = useCallback(
    (fileId) => {
      dispatch(
        setSelectedFiles(
          selectedFiles.includes(fileId)
            ? selectedFiles.filter((id) => id !== fileId)
            : [...selectedFiles, fileId]
        )
      );
    },
    [dispatch, selectedFiles]
  );

  // Handle select all
  const handleSelectAllChange = useCallback(() => {
    if (selectedFiles.length === filteredFiles.length) {
      dispatch(setSelectedFiles([]));
    } else {
      dispatch(setSelectedFiles(filteredFiles.map((file) => file.id)));
    }
  }, [dispatch, filteredFiles, selectedFiles]);

  // Handle file deletion
  const handleDelete = useCallback(() => {
    dispatch(deleteFiles(selectedFiles));
  }, [dispatch, selectedFiles]);

  // Handle sorting option change
  const handleSortOptionChange = useCallback(
    (option) => {
      dispatch(setSortOption(option));
      dispatch(setCurrentPage(1)); // Reset to page 1 when sorting
    },
    [dispatch]
  );

  // Handle sort order change
  const handleSortOrderChange = useCallback(
    (order) => {
      dispatch(setSortOrder(order));
    },
    [dispatch]
  );

  // Handle file type selection
  const handleFileTypeSelect = useCallback(
    (type) => {
      const updatedTypes = Array.isArray(type) ? type : [type];
      console.log("Selected File Types:", updatedTypes);
      dispatch(setSelectedFileType(updatedTypes));
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  // Handle category selection
  const handleCategorySelect = useCallback(
    (category) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch]
  );

  // Apply filters and close modal
  const handleApplyFilters = useCallback(() => {
    setSortModalOpen(false);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={"heading-1"}>Files</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => dispatch(setSearchTerm(e.target.value))}
        onSelectAllChange={handleSelectAllChange}
        isAllSelected={selectedFiles.length === filteredFiles.length}
        onDelete={handleDelete}
        onSortModalOpen={() => setSortModalOpen(true)}
      />
      <FileList
        key={currentPage}
        files={paginatedFiles}
        selectedFiles={selectedFiles}
        onCheckboxChange={handleCheckboxChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
      {isSortModalOpen && (
        <SortModal
          isOpen={isSortModalOpen}
          onClose={() => setSortModalOpen(false)}
          onSortOptionChange={handleSortOptionChange}
          onSortOrderChange={handleSortOrderChange}
          onFileTypeSelect={handleFileTypeSelect}
          onCategorySelect={handleCategorySelect}
          selectedFileType={selectedFileType}
          selectedCategory={selectedCategory}
          onApplyFilters={handleApplyFilters}
          displayOptions={["Ascending", "Descending"]}
          fileTypes={fileTypesData.fileTypes}
          sortOrder={sortOrder}
        />
      )}
    </div>
  );
};

export default Files;
