import { thunkCreator } from './utils';
import { fetchContributions } from './contribution';
import filterReducer from '../reducers/filter';

function _updateFilter(field, val, idx) {
  return {
    type: 'UPDATE_FILTER',
    field,
    val,
    idx
  };
}

export const updateFilter = (field, val, idx) => ({ type: 'UPDATE_FILTER', field, val, idx });

export const removeFilter = (idx, allfilters) => dispatch => {
  const action = { type: 'REMOVE_FILTER', idx: idx };
  // Kind of a hack: getting the latest state by (mis)using the reducer
  const futureState = filterReducer(allfilters, action);
  dispatch(action);
  return dispatch(fetchContributions(futureState));
};

export function filterContributions() {
  return {
    type: 'FILTER'
  };
}

export function addFilter() {
  return {
    type: 'ADD_FILTER'
  };
}
