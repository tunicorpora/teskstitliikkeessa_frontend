import { thunkCreator } from './utils';
import { isAuthenticated } from '../../components/auth/utils';

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
  const url = `${ENV.apiUrl}/author/${name}`;
  return thunkCreator({
    types: ['AUTHOR_REQUEST', 'AUTHOR_SUCCESS', 'AUTHOR_ERROR'],
    promise: fetch(url).then(response => response.json())
  });
}

export function fetchReceptions(id) {
  const url = `${ENV.apiUrl}/reception/${id}`;
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

export function deleteAll() {
  const url = `${ENV.apiUrl}/author`;
  const jwt = isAuthenticated();
  return thunkCreator({
    types: ['TOTALDELETE_REQUEST', 'TOTALDELETE_SUCCESS', 'TOTALDELETE_ERROR'],
    promise: fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`
      }
    }).then(response => response.json())
  });
}

export const editAuthor = (fieldname, val) => ({
  type: 'EDIT_AUTHOR',
  fieldname,
  val
});

export const resetAuthor = () => ({
  type: 'RESET_AUTHOR'
});

export const saveAuthorEdit = author => {
  console.log('FIRE!!');
  const url = `${ENV.apiUrl}/author`;
  const jwt = isAuthenticated();
  const validatedAuthor = { ...author };
  delete validatedAuthor.publications;
  delete validatedAuthor.publications;
  return thunkCreator({
    types: ['SAVEAUTHOR_REQUEST', 'SAVEAUTHOR_SUCCESS', 'SAVEAUTHOR_ERROR'],
    promise: fetch(url, {
      method: author._id ? 'PUT' : 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt.token
      },
      body: JSON.stringify(validatedAuthor)
    }).then(response => response.json())
  });
};
