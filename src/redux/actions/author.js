import { thunkCreator } from './utils';

export function testAuthors() {
  return {
    type: 'TEST_AUTHORS',
    list: ['kalle', 'ville']
  };
}

export function fetchAuthors() {
  const url = `${ENV.apiUrl}/author`;
  return thunkCreator({
    types: ['AUTHORLIST_REQUEST', 'AUTHORLIST_SUCCESS', 'AUTHORLIST_ERROR'],
    promise: fetch(url).then(response => response.json())
  });
}

export function fetchAuthorByName(name) {
  const url = `http://10.127.153.68/author/${name}`;
  console.log('fetchig author');
  console.log(url);
  return thunkCreator({
    types: ['AUTHOR_REQUEST', 'AUTHOR_SUCCESS', 'AUTHOR_ERROR'],
    promise: fetch(url).then(response => response.json())
  });
}

export function fetchReceptions(id) {
  const url = `http://10.127.153.68/receptions/${id}`;
  console.log(url);
  return thunkCreator({
    types: ['RECEPTIONS_REQUEST', 'RECEPTIONS_SUCCESS', 'RECEPTIONS_ERROR'],
    promise: fetch(url)
      .then(response => response.json())
      .then(receptions => {
        const publications = {};
        receptions.forEach(reception => {
          publications[reception._id] = reception;
        });
        return publications;
      })
  });
}
