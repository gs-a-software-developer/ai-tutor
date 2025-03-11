// fileUtils.js
export const filterFiles = (files, searchTerm) => {
  return files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const sortFiles = (files, option, order) => {
  return [...files].sort((a, b) => {
    let comparison = a[option].localeCompare(b[option]);
    return order === "ascending" ? comparison : -comparison;
  });
};