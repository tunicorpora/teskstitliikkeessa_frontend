import { thunkCreator } from './utils';
import { isAuthenticated } from '../../components/auth/utils';

export function testAuthors() {
  return {
    type: 'TEST_AUTHORS',
    list: ['kalle', 'ville'],
  };
}

export function fetchAuthors() {
  const jwt = isAuthenticated();
  const url = 'http://localhost:3000/author';
  console.log(jwt);
  return thunkCreator({
    types: ['AUTHORLIST_REQUEST', 'AUTHORLIST_SUCCESS', 'AUTHORLIST_ERROR'],
    promise: fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt.token,
      },
    }).then(response => response.json()),
  });
}
