import { thunkCreator } from './utils';
import { dispatch } from 'rxjs/internal/observable/range';
import { isAuthenticated } from '../../components/auth/utils';
import { userInfo } from 'os';

function fetchColNames() {
  let url = `${ENV.apiUrl}/colnames`;
  return thunkCreator({
    types: [
      'CONTRIBUTION_COLNAMES_REQUEST',
      'CONTRIBUTION_COLNAMES_SUCCESS',
      'CONTRIBUTION_COLNAMES_ERROR',
    ],
    promise: fetch(url).then(response => response.json()),
  });
}

function changeColState(name, include) {
  return { type: 'CHANGE_COL_STATE', name: name, include: include };
}

function fetchContributions(filters, page = 1) {
  let url = `${ENV.apiUrl}/entry?page=` + page;
  if (filters.length) {
    url += '&filters=' + encodeURIComponent(JSON.stringify(filters));
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
  const url = `${ENV.apiUrl}/entry/${id}`;
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

const deleteContribution = (id, filters) => dispatch =>
  _deleteContribution(id)(dispatch).then(result =>
    fetchContributions(filters)(dispatch)
  );

const startColEdit = name => {
  return {
    type: 'START_TO_EDIT_COLNAME',
    name: name,
  };
};

const startContributionEdit = id => {
  return {
    type: 'START_TO_EDIT_CONTRIBUTION',
    id: id,
  };
};

function _saveColEdit(name, newname) {
  const url = `${ENV.apiUrl}/colnames/${name}/${newname}`;
  const jwt = isAuthenticated();
  return thunkCreator({
    types: ['COLEDIT_REQUEST', 'COLEDIT_SUCCESS', 'COLEDIT_ERROR'],
    promise: fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt.token,
      },
    }).then(response => {
      return response.json();
    }),
  });
}

const saveColEdit = (name, newname) => dispatch => {
  console.log(newname);
  _saveColEdit(name, newname)(dispatch)
    .then(() => dispatch(fetchColNames()))
    .then(dispatch({ type: 'CANCEL_COL_EDIT' }));
};

function _saveContributionEdit(rowEdit) {
  const { id, ...data } = rowEdit;
  const url = `${ENV.apiUrl}/entry/${id}`;
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

const makeColedit = (name, newname) => {
  return {
    type: 'EDIT_COLNAME',
    name: name,
    newname: newname,
  };
};

const saveContributionEdit = (rowEdit, filters) => dispatch => {
  _saveContributionEdit(rowEdit)(dispatch)
    .then(() => dispatch(fetchContributions(filters)))
    .then(dispatch({ type: 'CANCEL_EDITS' }));
};
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
  fetchColNames,
  changeColState,
  startColEdit,
  saveColEdit,
  makeColedit,
};
