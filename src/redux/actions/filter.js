import { thunkCreator } from './utils';
import { fetchContributions } from './contribution';

function _updateFilter(field, val, idx) {
  return {
    type: 'UPDATE_FILTER',
    field: field,
    val: val,
    idx: idx,
  };
}

export const updateFilter = (field, val, idx, allfilters) => dispatch => {
  dispatch({ type: 'UPDATE_FILTER', field: field, val: val, idx: idx });
  return dispatch(fetchContributions(allfilters));
};

export function filterContributions() {
  return {
    type: 'FILTER',
  };
}

export function addFilter() {
  return {
    type: 'ADD_FILTER',
  };
}
