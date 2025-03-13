import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setSortOption,
  setSortOrder,
  setSelectedFiles,
  setCurrentPage,
  setSelectedFileType,
  setSelectedCategory,
  deleteFiles,
} from "../redux/actions/moduleFileActions";

const useFileManagement = (fetchFilesAction, filesSelector) => {
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
  } = useSelector(filesSelector);

  const filesPerPage = 10;

  // Memoize fetchFilesAction to prevent unnecessary re-renders
  const memoizedFetchFilesAction = useCallback(() => {
    dispatch(fetchFilesAction());
  }, [dispatch, fetchFilesAction]);

  // Fetch files when the component mounts
  useEffect(() => {
    memoizedFetchFilesAction();
  }, [memoizedFetchFilesAction]);

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

  return {
    paginatedFiles,
    totalPages,
    searchTerm,
    selectedFiles,
    currentPage,
    selectedFileType,
    selectedCategory,
    sortOrder, // Ensure sortOrder is returned
    handleCheckboxChange,
    handleSelectAllChange,
    handleDelete,
    handleSortOptionChange,
    handleSortOrderChange,
    handleFileTypeSelect,
    handleCategorySelect,
  };
};

export default useFileManagement;