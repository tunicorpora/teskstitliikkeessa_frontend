import { thunkCreator } from './utils';

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

export function deleteContribution(id) {
  const url = `http://localhost:3000/entry/${id}`;
  return thunkCreator({
    types: [
      'CONTRIBUTIONDELETE_REQUEST',
      'CONTRIBUTIONDELETE_SUCCESS',
      'CONTRIBUTIONDELETE_ERROR',
    ],
    promise: fetch(url, { method: 'DELETE' }),
  });
}
