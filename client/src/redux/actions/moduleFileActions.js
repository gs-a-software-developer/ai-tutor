// moduleFileActions.js
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
  DELETE_FILES_REQUEST,
  DELETE_FILES_SUCCESS,
  DELETE_FILES_FAILURE,
} from "../types";

import filesData from '../../data/moduleFilesData.json';

// Fetch files for a specific module
export const fetchFiles = (moduleName) => {
  return async (dispatch) => {
    dispatch(fetchFilesRequest());
    try {
      // Simulate an API call with a delay
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Filter files by moduleName
          const filesForModule = filesData[moduleName] || [];
          resolve(filesForModule);
        }, 1000);
      });
      dispatch(fetchFilesSuccess(response));
    } catch (error) {
      dispatch(fetchFilesFailure(error.message));
    }
  };
};

// Delete files
export const deleteFiles = (fileIds) => {
  return async (dispatch) => {
    dispatch(deleteFilesRequest());
    try {
      // Simulate an API call with a delay
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          dispatch(deleteFilesSuccess(fileIds));
        }, 1000);
      });
    } catch (error) {
      dispatch(deleteFilesFailure(error.message));
    }
  };
};

// Action creators
export const fetchFilesRequest = () => ({
  type: FETCH_FILES_REQUEST,
});

export const fetchFilesSuccess = (files) => ({
  type: FETCH_FILES_SUCCESS,
  payload: files,
});

export const fetchFilesFailure = (error) => ({
  type: FETCH_FILES_FAILURE,
  payload: error,
});

export const deleteFilesRequest = () => ({
  type: DELETE_FILES_REQUEST,
});

export const deleteFilesSuccess = (fileIds) => ({
  type: DELETE_FILES_SUCCESS,
  payload: fileIds,
});

export const deleteFilesFailure = (error) => ({
  type: DELETE_FILES_FAILURE,
  payload: error,
});

export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export const setSortOption = (option) => ({
  type: SET_SORT_OPTION,
  payload: option,
});

export const setSortOrder = (order) => ({
  type: SET_SORT_ORDER,
  payload: order,
});

export const setSelectedFiles = (files) => ({
  type: SET_SELECTED_FILES,
  payload: files,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setSelectedFileType = (type) => ({
  type: SET_SELECTED_FILE_TYPE,
  payload: type,
});

export const setSelectedCategory = (category) => ({
  type: SET_SELECTED_CATEGORY,
  payload: category,
});