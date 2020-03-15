import { combineReducers } from 'redux';
import authorReducer from './author';
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
import newPublicationReducer from './newPublicationReducer';
import pendingEditsReducer from './pendingEditsReducer';
import authorNameReducer from './authorNameReducer';
import authorLetterReducer from './authorLetterReducer';

const appReducer = combineReducers({
  author: authorReducer,
  authorNames: authorNameReducer,
  authorLetters: authorLetterReducer,
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
  textTypeFilter: textTypeFilterReducer,
  newPublication: newPublicationReducer,
  pendingEdits: pendingEditsReducer
});

export default appReducer;
