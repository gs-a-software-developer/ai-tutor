// withFiles.js
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFiles,
  setSearchTerm,
  setSortOption,
  setSortOrder,
  setSelectedFiles,
  setCurrentPage,
  setSelectedFileType,
  setSelectedCategory,
  deleteFiles,
} from "../redux/actions/fileActions";

const withFiles = (WrappedComponent) => {
  return (props) => {
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

    useEffect(() => {
      console.log("Fetching files for module:", props.moduleName); // Debugging
      dispatch(fetchFiles(props.moduleName));
    }, [dispatch, props.moduleName]);
    
    console.log("Files:", files); // Debugging

    const filteredFiles = useMemo(() => {
      return files.filter(
        (file) =>
          file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedFileType.length === 0 ||
            selectedFileType.includes(file.fileType))
      );
    }, [files, searchTerm, selectedFileType]);

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

    const paginatedFiles = useMemo(() => {
      const indexOfLastFile = currentPage * filesPerPage;
      const indexOfFirstFile = indexOfLastFile - filesPerPage;
      return sortedFiles.slice(indexOfFirstFile, indexOfLastFile);
    }, [sortedFiles, currentPage]);

    const totalPages = Math.ceil(sortedFiles.length / filesPerPage);

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

    const handleSelectAllChange = useCallback(() => {
      if (selectedFiles.length === filteredFiles.length) {
        dispatch(setSelectedFiles([]));
      } else {
        dispatch(setSelectedFiles(filteredFiles.map((file) => file.id)));
      }
    }, [dispatch, filteredFiles, selectedFiles]);

    const handleDelete = useCallback(() => {
      dispatch(deleteFiles(selectedFiles));
    }, [dispatch, selectedFiles]);

    const handleSortOptionChange = useCallback(
      (option) => {
        dispatch(setSortOption(option));
        dispatch(setCurrentPage(1));
      },
      [dispatch]
    );

    const handleSortOrderChange = useCallback(
      (order) => {
        dispatch(setSortOrder(order));
      },
      [dispatch]
    );

    const handleFileTypeSelect = useCallback(
      (type) => {
        const updatedTypes = Array.isArray(type) ? type : [type];
        dispatch(setSelectedFileType(updatedTypes));
        dispatch(setCurrentPage(1));
      },
      [dispatch]
    );

    const handleCategorySelect = useCallback(
      (category) => {
        dispatch(setSelectedCategory(category));
      },
      [dispatch]
    );

    const handleApplyFilters = useCallback(() => {
      setSortModalOpen(false);
    }, []);

    return (
      <WrappedComponent
        {...props}
        files={paginatedFiles}
        searchTerm={searchTerm}
        sortOption={sortOption}
        sortOrder={sortOrder}
        selectedFiles={selectedFiles}
        currentPage={currentPage}
        selectedFileType={selectedFileType}
        selectedCategory={selectedCategory}
        isSortModalOpen={isSortModalOpen}
        setSortModalOpen={setSortModalOpen}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAllChange={handleSelectAllChange}
        handleDelete={handleDelete}
        handleSortOptionChange={handleSortOptionChange}
        handleSortOrderChange={handleSortOrderChange}
        handleFileTypeSelect={handleFileTypeSelect}
        handleCategorySelect={handleCategorySelect}
        handleApplyFilters={handleApplyFilters}
        totalPages={totalPages}
        filteredFiles={filteredFiles} // Pass filteredFiles to the wrapped component
      />
    );
  };
};

export default withFiles;