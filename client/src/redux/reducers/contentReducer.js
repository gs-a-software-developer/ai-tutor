// contentReducer.js
import {
  FETCH_CONTENT_REQUEST,
  FETCH_CONTENT_SUCCESS,
  FETCH_CONTENT_FAILURE,
  RESET_CONTENT,
} from "../types";

const initialState = {
  loading: false,
  content: {}, // Ensure this is an object
  error: null,
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENT_REQUEST:
      return { ...state, loading: true };
    case FETCH_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        content: {
          ...state.content,
          [action.payload.moduleName]: action.payload.data,
        },
      };
    case FETCH_CONTENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default contentReducer;