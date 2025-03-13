// modulesReducer.js
import { FETCH_MODULES_SUCCESS, FETCH_MODULES_FAILURE } from "../types";

const initialState = {
  modules: [],
  error: null,
};

const modulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODULES_SUCCESS:
      return { ...state, modules: action.payload, error: null };
    case FETCH_MODULES_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default modulesReducer;
