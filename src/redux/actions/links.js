import { thunkCreator } from './utils';
import { fetchDetails } from './publications';
import { isAuthenticated } from '../../components/auth/utils';

const setSourceId = id => ({
  type: 'SET_SOURCE_ID',
  id
});

const editLink = (linkType, ids) => ({
  type: 'EDIT_LINK',
  ids,
  linkType
});

const editSource = (sourceId, publications) => dispatch => {
  dispatch(setSourceId(sourceId));
  dispatch(fetchDetails(sourceId)).then(res => {
    Object.keys(res[sourceId].receptions).forEach(receptionType => {
      // add the id of the linkede publication to the store
      dispatch(editLink(receptionType, res[sourceId].receptions[receptionType]));
      // send a request to get the details of the publication
      // in case the details are missing
      res[sourceId].receptions[receptionType]
        .filter(id => !(id in publications))
        .forEach(id => dispatch(fetchDetails(id)));
    });
  });
};

const editReceptions = (receptionType, selected, publications) => dispatch => {
  dispatch(editLink(receptionType, selected.map(s => s.value)));
  selected.forEach(s => {
    if (!(s.value in publications)) {
      dispatch(fetchDetails(s.value));
    }
  });
};

const saveLinks = links => {
  const url = `${ENV.apiUrl}/savelinks`;
  const jwt = isAuthenticated();
  return thunkCreator({
    types: ['SAVELINKS_REQUEST', 'SAVELINKS_SUCCESS', 'SAVELINKS_ERROR'],
    promise: fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt.token
      },
      body: JSON.stringify(links)
    }).then(response => response.json())
  });
};

export { editSource, setSourceId, saveLinks, editReceptions };
