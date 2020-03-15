import { thunkCreator } from './utils';
import { isAuthenticated } from '../../components/auth/utils';

export function testAuthors() {
  return {
    type: 'TEST_AUTHORS',
    list: ['kalle', 'ville']
  };
}

export function fetchAuthors() {
  const url = `${process.env.API_URL}/author`;
  return thunkCreator({
    types: ['AUTHORLIST_REQUEST', 'AUTHORLIST_SUCCESS', 'AUTHORLIST_ERROR'],
    promise: fetch(url).then(response => response.json())
  });
}

export function listAuthorNames(letter, page, offset) {
  const url = `${process.env.API_URL}/authornames?page=${page}&offset=${offset}&letter=${letter}`;
  return thunkCreator({
    types: ['AUTHORNAMELIST_REQUEST', 'AUTHORNAMELIST_SUCCESS', 'AUTHORNAMELIST_ERROR'],
    promise: fetch(url).then(response => response.json())
  });
}

export function listAuthorLetters() {
  const url = `${process.env.API_URL}/authorletters`;
  return thunkCreator({
    types: ['AUTHORLETTERLIST_REQUEST', 'AUTHORLETTERLIST_SUCCESS', 'AUTHORLETTERLIST_ERROR'],
    promise: fetch(url).then(response => response.json())
  });
}

export function fetchAuthorByName(name) {
  const url = `${process.env.API_URL}/author/${name}`;
  return thunkCreator({
    types: ['AUTHOR_REQUEST', 'AUTHOR_SUCCESS', 'AUTHOR_ERROR'],
    promise: fetch(url).then(response => response.json())
  });
}

export function fetchReceptions(id) {
  const url = `${process.env.API_URL}/reception/${id}`;
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
  const url = `${process.env.API_URL}/author`;
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

export function deleteAuthor(id) {
  const url = `${process.env.API_URL}/author/${id}`;
  const jwt = isAuthenticated();
  return thunkCreator({
    types: ['AUTHORDELETE_REQUEST', 'AUTHORDELETE_SUCCESS', 'AUTHORDELETE_ERROR'],
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

export const saveAuthorEdit = author => {
  const url = `${process.env.API_URL}/author`;
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

export const combineAuthors = (from, to) => {
  const url = `${process.env.API_URL}/authors/combine/${from}/${to}`;
  const jwt = isAuthenticated();
  return thunkCreator({
    types: ['COMBINEAUTHORS_REQUEST', 'COMBINEAUTHORS_SUCCESS', 'COMBINEAUTHORS_ERROR'],
    promise: fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt.token
      }
    }).then(response => response.json())
  });
};
