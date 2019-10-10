export const updateFilter = (field, val, idx) => ({ type: 'UPDATE_FILTER', field, val, idx });

export const removeFilter = idx => ({ type: 'REMOVE_FILTER', idx });

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

export const updateTextTypeFilter = (value, isChecked) => ({
  type: 'UPDATE_TEXTTYPE_FILTER',
  value,
  isChecked
});
