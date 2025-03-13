// Capitalizes the first letter of a string
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Formats a module name to a URL-friendly slug (e.g., "AI Tutor" → "ai-tutor")
export const formatToSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

// Generates a random color for modules (if not provided)
export const getRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD700"];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Truncate text by word count (useful for limiting descriptions)
export const truncateTextByWords = (text, wordLimit) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};
