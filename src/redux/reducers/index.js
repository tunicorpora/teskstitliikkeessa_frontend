import { combineReducers } from 'redux';
import { authorReducer } from './author';
import { contributionReducer } from './contribution';
import { rowReducer } from './editing';
import { uploadReducer } from './upload';
import { authReducer } from './auth';
import { filterReducer } from './filter';

const appReducer = combineReducers({
  authorlist: authorReducer,
  contributionlist: contributionReducer,
  uploadStatus: uploadReducer,
  rowEdit: rowReducer,
  auth: authReducer,
  contributionfilters: filterReducer,
});

export default appReducer;
