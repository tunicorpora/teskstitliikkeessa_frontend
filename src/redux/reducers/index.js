import { combineReducers } from 'redux';
import { authorReducer } from './author';
import { contributionReducer, colNameReducer } from './contribution';
import { rowReducer, colReducer } from './editing';
import uploadReducer from './upload';
import authReducer from './auth';
import filterReducer from './filter';
import linkReducer from './links';
import publicationReducer from './publication';
import editUtilsReducer from './editUtils';
import searchResultReducer from './searchResults';
import textTypeFilterReducer from './textTypeFilter';

const appReducer = combineReducers({
  author: authorReducer,
  contributionlist: contributionReducer,
  uploadStatus: uploadReducer,
  rowEdit: rowReducer,
  colEdit: colReducer,
  auth: authReducer,
  contributionfilters: filterReducer,
  contributioncolnames: colNameReducer,
  links: linkReducer,
  publications: publicationReducer,
  editUtils: editUtilsReducer,
  searchResults: searchResultReducer,
  textTypeFilter: textTypeFilterReducer
});

export default appReducer;
