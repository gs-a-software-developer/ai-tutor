// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './userReducer';
import modulesReducer from './modulesReducer';
import fileReducer from './fileReducer';
import uploadReducer from './uploadReducer';
import contentReducer from './contentReducer';
import moduleFileReducer from './moduleFileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  modules: modulesReducer,
  files: fileReducer,
  upload: uploadReducer,
  content: contentReducer,
  moduleFile: moduleFileReducer, // Ensure this is included
});

export default rootReducer;