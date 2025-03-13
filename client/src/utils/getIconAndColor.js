// getIconAndColor.js
export const getIconAndColor = (contentType) => {
  if (!contentType) return { icon: "DefaultIcon", color: "gray" };

  const normalizedType = contentType.trim().toLowerCase();
  const mapping = {
    "lecture notes": { icon: "Book", color: "#007AFF" },
    textbook: { icon: "Book", color: "#007AFF" },
    "course outline": { icon: "Notepad", color: "#61A5F3" },
    syllabus: { icon: "Notepad", color: "#61A5F3" },
    "study guides": { icon: "Book", color: "#007AFF" },
    "homework assignments": { icon: "Notepad", color: "#61A5F3" },
    "project briefs": { icon: "Notepad", color: "#61A5F3" },
    "practice questionnaires": { icon: "QuestionMark", color: "#1542B4" },
    "tests and quizzes": { icon: "QuestionMark", color: "#1542B4" },
    "coding tutorials": { icon: "Code", color: "#B6C1D6" },
    "lab manuals": { icon: "Book", color: "#007AFF" },
    "case studies": { icon: "Notepad", color: "#61A5F3" },
    "code snippets": { icon: "Code", color: "#B6C1D6" },
    "recorded lectures": { icon: "Video", color: "#D62728" },
    "video tutorials": { icon: "Video", color: "#D62728" },
    "audio clips": { icon: "Video", color: "#D62728" },
    podcasts: { icon: "Video", color: "#D62728" },
    "research papers": { icon: "Notepad", color: "#61A5F3" },
    infographics: { icon: "Image", color: "#D62728" },
    "flash cards": { icon: "CardsThree", color: "#F48FFA" },
    "mind map": { icon: "Graph", color: "#D62728" },
    presentation: { icon: "Slideshow", color: "#8E6CDB" },
    video: { icon: "Video", color: "#D62728" },
  };

  return mapping[normalizedType] || { icon: "DefaultIcon", color: "gray" };
};
