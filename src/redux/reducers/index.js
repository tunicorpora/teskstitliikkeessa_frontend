import { combineReducers } from 'redux';
import { authorReducer } from './author';
import { contributionReducer } from './contribution';
import { rowReducer } from './editing';
import { uploadReducer } from './upload';

const appReducer = combineReducers({
  authorlist: authorReducer,
  contributionlist: contributionReducer,
  uploadStatus: uploadReducer,
  rowEdit: rowReducer,
});

export default appReducer;
