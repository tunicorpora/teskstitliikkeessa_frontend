import { thunkCreator } from './utils';

export function testAuthors() {
  return {
    type: 'TEST_AUTHORS',
    list: ['kalle', 'ville'],
  };
}

export function fetchAuthors() {
  const url = 'http://localhost:3000/author';
  return thunkCreator({
    types: ['AUTHORLIST_REQUEST', 'AUTHORLIST_SUCCESS', 'AUTHORLIST_ERROR'],
    promise: fetch(url).then(response => response.json()),
  });
}
