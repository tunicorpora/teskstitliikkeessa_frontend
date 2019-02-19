import { combineReducers } from 'redux';
import { authorReducer } from './author';
import { contributionReducer } from './contribution';
import { uploadReducer } from './upload';

const appReducer = combineReducers({
  authorlist: authorReducer,
  contributionlist: contributionReducer,
  uploadStatus: uploadReducer,
});

export default appReducer;
