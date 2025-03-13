// contentActions.js
import {
  FETCH_CONTENT_REQUEST,
  FETCH_CONTENT_SUCCESS,
  FETCH_CONTENT_FAILURE,
} from "../types";
import fileData from "../../data/moduleFilesData.json";

export const fetchContent = (moduleName) => (dispatch) => {
  try {
    dispatch({ type: FETCH_CONTENT_REQUEST });

    // Extract module-specific data from the imported fileData
    const data = fileData[moduleName] || [];

    dispatch({ type: FETCH_CONTENT_SUCCESS, payload: { moduleName, data } });
  } catch (error) {
    dispatch({ type: FETCH_CONTENT_FAILURE, payload: error.message });
  }
};