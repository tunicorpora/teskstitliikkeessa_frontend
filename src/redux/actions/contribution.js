import { thunkCreator } from './utils';
import { isAuthenticated } from '../../components/auth/utils';
import { performSearch } from './publications';

function changeColState(name, include) {
  return { type: 'CHANGE_COL_STATE', name, include };
}

function fetchContributions(filters, page = 1) {
  let url = `${ENV.apiUrl}/publication?page=${page}`;
  if (filters.length) {
    url += `&filters=${encodeURIComponent(JSON.stringify(filters))}`;
  }
  return thunkCreator({
    types: ['CONTRIBUTIONLIST_REQUEST', 'CONTRIBUTIONLIST_SUCCESS', 'CONTRIBUTIONLIST_ERROR'],
    promise: fetch(url).then(response => response.json())
  });
}

function batchDeleteContributionRaw(ids) {
  const url = `${ENV.apiUrl}/publication?ids=${ids.join(',')}`;
  const jwt = isAuthenticated();
  return thunkCreator({
    types: ['BATCHDELETE_REQUEST', 'BATCHDELETE_SUCCESS', 'BATCHDELETE_ERROR'],
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

function deleteContributionRaw(id) {
  const url = `${ENV.apiUrl}/publication/${id}`;
  const jwt = isAuthenticated();
  return thunkCreator({
    types: ['CONTRIBUTIONDELETE_REQUEST', 'CONTRIBUTIONDELETE_SUCCESS', 'CONTRIBUTIONDELETE_ERROR'],
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

const deleteContribution = (id, filters) => dispatch => {
  dispatch(deleteContributionRaw(id)).then(() => performSearch(filters, {})(dispatch));
};

const batchDeleteContribution = (ids, filters) => dispatch => {
  dispatch(batchDeleteContributionRaw(ids)).then(() => performSearch(filters, {})(dispatch));
};

const startContributionEdit = id => {
  return {
    type: 'START_TO_EDIT_CONTRIBUTION',
    id
  };
};

function saveContributionEditRaw(rowEdit) {
  const { id, ...data } = rowEdit;
  const url = `${ENV.apiUrl}/publication/${id}`;
  const jwt = isAuthenticated();
  return thunkCreator({
    types: ['CONTRIBUTIONEDIT_REQUEST', 'CONTRIBUTIONEDIT_SUCCESS', 'CONTRIBUTIONEDIT_ERROR'],
    promise: fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt.token
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    })
  });
}

const makeColedit = (name, newname) => {
  return {
    type: 'EDIT_COLNAME',
    name: name,
    newname: newname
  };
};

const saveContributionEdit = (rowEdit, filters) => dispatch => {
  dispatch(saveContributionEditRaw(rowEdit))
    .then(dispatch({ type: 'LAST_EDIT', id: rowEdit.id }))
    .then(dispatch({ type: 'CANCEL_EDITS' }))
    .then(() => dispatch(performSearch(filters, {})));
};

const makeContributionEdit = (col, val) => {
  return {
    type: 'EDIT_CONTRIBUTION',
    col,
    val
  };
};

const addPendingId = id => {
  return {
    type: 'ADD_PENDING_ID',
    id
  };
};

const removePendingId = id => {
  return {
    type: 'REMOVE_PENDING_ID',
    id
  };
};

const removeAllPendingIds = () => {
  return {
    type: 'REMOVE_ALL_PENDING_IDS'
  };
};

export {
  startContributionEdit,
  makeContributionEdit,
  saveContributionEdit,
  fetchContributions,
  deleteContribution,
  changeColState,
  addPendingId,
  removePendingId,
  removeAllPendingIds,
  batchDeleteContribution
};
