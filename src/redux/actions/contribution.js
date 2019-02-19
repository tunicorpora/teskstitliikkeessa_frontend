import { thunkCreator } from './utils';
import { dispatch } from 'rxjs/internal/observable/range';

export function fetchContributions() {
  const url = 'http://localhost:3000/entry';
  return thunkCreator({
    types: [
      'CONTRIBUTIONLIST_REQUEST',
      'CONTRIBUTIONLIST_SUCCESS',
      'CONTRIBUTIONLIST_ERROR',
    ],
    promise: fetch(url).then(response => response.json()),
  });
}

function _deleteContribution(id) {
  const url = `http://localhost:3000/entry/${id}`;
  return thunkCreator({
    types: [
      'CONTRIBUTIONDELETE_REQUEST',
      'CONTRIBUTIONDELETE_SUCCESS',
      'CONTRIBUTIONDELETE_ERROR',
    ],
    promise: fetch(url, { method: 'DELETE' }).then(response => response.json()),
  });
}

export const deleteContribution = id => dispatch =>
  _deleteContribution(id)(dispatch).then(result =>
    fetchContributions()(dispatch)
  );
