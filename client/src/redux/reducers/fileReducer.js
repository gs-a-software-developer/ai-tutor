// fileReducer.js
import {
  FETCH_FILES_REQUEST,
  FETCH_FILES_SUCCESS,
  FETCH_FILES_FAILURE,
  SET_SEARCH_TERM,
  SET_SORT_OPTION,
  SET_SORT_ORDER,
  SET_SELECTED_FILES,
  SET_CURRENT_PAGE,
  SET_SELECTED_FILE_TYPE,
  SET_SELECTED_CATEGORY,
  DELETE_FILES_SUCCESS,
} from "../types";

const initialState = {
  files: [],
  loading: false,
  error: null,
  searchTerm: "",
  sortOption: "date",
  sortOrder: "ascending",
  selectedFiles: [],
  currentPage: 1,
  selectedFileType: [],
  selectedCategory: "",
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FILES_SUCCESS:
      return { ...state, loading: false, files: action.payload };
    case FETCH_FILES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case SET_SORT_OPTION:
      return { ...state, sortOption: action.payload };
    case SET_SORT_ORDER:
      return { ...state, sortOrder: action.payload };
    case SET_SELECTED_FILES:
      return { ...state, selectedFiles: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_SELECTED_FILE_TYPE:
      return {
        ...state,
        selectedFileType: action.payload.length > 0 ? action.payload : [],
      };
    case SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    case DELETE_FILES_SUCCESS:
      return {
        ...state,
        files: state.files.filter((file) => !action.payload.includes(file.id)),
        selectedFiles: [],
      };
    default:
      return state;
  }
};

export default fileReducer;
