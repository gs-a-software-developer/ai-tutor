// uploadActions.js
import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  SET_FILE_DETAILS,
  SET_CATEGORIES,
} from "../types";
import axios from "axios";

export const uploadFileRequest = () => ({
  type: UPLOAD_FILE_REQUEST,
});

export const uploadFileSuccess = (file) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: file,
});

export const uploadFileFailure = (error) => ({
  type: UPLOAD_FILE_FAILURE,
  payload: error,
});

export const setFileDetails = (details) => ({
  type: SET_FILE_DETAILS,
  payload: details,
});

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const uploadFile = (file) => async (dispatch) => {
  dispatch(uploadFileRequest());
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );
    dispatch(uploadFileSuccess(response.data));
  } catch (error) {
    dispatch(uploadFileFailure(error.message));
  }
};