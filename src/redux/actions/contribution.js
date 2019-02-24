import { thunkCreator } from './utils';
import { dispatch } from 'rxjs/internal/observable/range';
import { isAuthenticated } from '../../components/auth/utils';
import { userInfo } from 'os';

function fetchContributions(filters) {
  let url = 'http://localhost:3000/entry';
  if (filters.length) {
    console.log(JSON.stringify(filters));
    url += '?filters=' + JSON.stringify(filters);
  }
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
  const jwt = isAuthenticated();
  return thunkCreator({
    types: [
      'CONTRIBUTIONDELETE_REQUEST',
      'CONTRIBUTIONDELETE_SUCCESS',
      'CONTRIBUTIONDELETE_ERROR',
    ],
    promise: fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt.token,
      },
    }).then(response => response.json()),
  });
}

const deleteContribution = id => dispatch =>
  _deleteContribution(id)(dispatch).then(result =>
    fetchContributions()(dispatch)
  );

const startContributionEdit = id => {
  return {
    type: 'START_TO_EDIT_CONTRIBUTION',
    id: id,
  };
};

function _saveContributionEdit(rowEdit) {
  const { id, ...data } = rowEdit;
  const url = `http://localhost:3000/entry/${id}`;
  const jwt = isAuthenticated();
  return thunkCreator({
    types: [
      'CONTRIBUTIONEDIT_REQUEST',
      'CONTRIBUTIONEDIT_SUCCESS',
      'CONTRIBUTIONEDIT_ERROR',
    ],
    promise: fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify(data),
    }).then(response => {
      return response.json();
    }),
  });
}

const saveContributionEdit = rowEdit => dispatch =>
  _saveContributionEdit(rowEdit)(dispatch)
    .then(() => dispatch(fetchContributions()))
    .then(dispatch({ type: 'CANCEL_EDITS' }));

const makeContributionEdit = rowEdit => {
  return {
    type: 'EDIT_CONTRIBUTION',
    ...rowEdit,
  };
};

export {
  startContributionEdit,
  makeContributionEdit,
  saveContributionEdit,
  fetchContributions,
  deleteContribution,
};
