// uploadReducer.js
import {
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
    SET_FILE_DETAILS,
    SET_CATEGORIES,
  } from '../types';
  
  const initialState = {
    files: [],
    fileDetails: {},
    categories: [],
    loading: false,
    error: null,
  };
  
  const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPLOAD_FILE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case UPLOAD_FILE_SUCCESS:
        return {
          ...state,
          loading: false,
          files: [...state.files, action.payload],
        };
      case UPLOAD_FILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case SET_FILE_DETAILS:
        return {
          ...state,
          fileDetails: action.payload,
        };
      case SET_CATEGORIES:
        return {
          ...state,
          categories: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default uploadReducer;