// usePaginationAndSorting.js
import { useState, useMemo } from "react";

const usePaginationAndSorting = (files, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("date");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [selectedFileType, setSelectedFileType] = useState([]);

  const sortedFiles = useMemo(() => {
    return [...files]
      .filter((file) => {
        if (selectedFileType.length === 0) return true;
        return selectedFileType.includes(file.type);
      })
      .sort((a, b) => {
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
  }, [files, sortOption, sortOrder, selectedFileType]);

  const paginatedFiles = useMemo(() => {
    const indexOfLastFile = currentPage * itemsPerPage;
    const indexOfFirstFile = indexOfLastFile - itemsPerPage;
    return sortedFiles.slice(indexOfFirstFile, indexOfLastFile);
  }, [sortedFiles, currentPage]);

  const totalPages = Math.ceil(sortedFiles.length / itemsPerPage);

  return {
    paginatedFiles,
    currentPage,
    totalPages,
    setCurrentPage,
    sortOption,
    setSortOption,
    sortOrder,
    setSortOrder,
    selectedFileType,
    setSelectedFileType,
  };
};

export default usePaginationAndSorting;