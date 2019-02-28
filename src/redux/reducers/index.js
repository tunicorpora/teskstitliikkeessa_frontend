import { combineReducers } from 'redux';
import { authorReducer } from './author';
import { contributionReducer, colNameReducer } from './contribution';
import { rowReducer, colReducer } from './editing';
import { uploadReducer } from './upload';
import { authReducer } from './auth';
import { filterReducer } from './filter';

const appReducer = combineReducers({
  authorlist: authorReducer,
  contributionlist: contributionReducer,
  uploadStatus: uploadReducer,
  rowEdit: rowReducer,
  colEdit: colReducer,
  auth: authReducer,
  contributionfilters: filterReducer,
  contributioncolnames: colNameReducer,
});

export default appReducer;
