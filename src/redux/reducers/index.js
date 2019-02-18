import { combineReducers } from 'redux';
import { authorReducer } from './author';
import { contributionReducer } from './contribution';

const appReducer = combineReducers({
  authorlist: authorReducer,
  contributionlist: contributionReducer,
});

export default appReducer;
