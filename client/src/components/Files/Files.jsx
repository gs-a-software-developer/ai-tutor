// Files.jsx
import React from "react";
import withFiles from "../../hoc/withFiles";
import FileList from "../FileList/FileList";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import SortModal from "../SortModal/SortModal";
import fileTypesData from "../../data/fileTypes.json";
import styles from "./Files.module.css";

const Files = ({
  files,
  searchTerm,
  sortOption,
  sortOrder,
  selectedFiles,
  currentPage,
  selectedFileType,
  selectedCategory,
  isSortModalOpen,
  setSortModalOpen,
  handleCheckboxChange,
  handleSelectAllChange,
  handleDelete,
  handleSortOptionChange,
  handleSortOrderChange,
  handleFileTypeSelect,
  handleCategorySelect,
  handleApplyFilters,
  totalPages,
  filteredFiles,
}) => {
  return (
    <div className={styles.container}>
      <h1 className={"heading-1"}>Files</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => handleSortOptionChange(e.target.value)}
        onSelectAllChange={handleSelectAllChange}
        isAllSelected={selectedFiles.length === filteredFiles.length}
        onDelete={handleDelete}
        onSortModalOpen={() => setSortModalOpen(true)}
      />
      <FileList
        key={currentPage}
        files={files}
        selectedFiles={selectedFiles}
        onCheckboxChange={handleCheckboxChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => handleSortOptionChange(page)}
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

export default withFiles(Files);