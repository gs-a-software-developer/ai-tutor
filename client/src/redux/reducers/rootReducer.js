// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './userReducer';
import fileReducer from './fileReducer';
import uploadReducer from './uploadReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  files: fileReducer,
  upload: uploadReducer,
});

export default rootReducer;