// modules.Actions.js
import { FETCH_MODULES_SUCCESS, FETCH_MODULES_FAILURE } from "../types";
import modulesData from "../../data/modulesData.json";

export const fetchModules = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_MODULES_SUCCESS,
      payload: modulesData,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MODULES_FAILURE,
      payload: error.message,
    });
  }
};
