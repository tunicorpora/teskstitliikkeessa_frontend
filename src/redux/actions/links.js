import { thunkCreator } from './utils';
import { fetchReceptions } from './author';
import { fetchDetails, fetchDetailsRaw } from './publications';

const setSourceId = id => ({
  type: 'SET_SOURCE_ID',
  id
});

const editLink = (linkType, ids) => ({
  type: 'EDIT_LINK',
  ids,
  linkType
});

const editSource = sourceId => dispatch => {
  dispatch(setSourceId(sourceId));
  dispatch(fetchDetails(sourceId)).then(res => {
    Object.keys(res[sourceId].receptions).forEach(receptionType => {
      // add the id of the linkede publication to the store
      dispatch(editLink(receptionType, res[sourceId].receptions[receptionType]));
      // send a request to get the details of the publication
      res[sourceId].receptions[receptionType].forEach(id => dispatch(fetchDetails(id)));
    });
  });
};

const saveLinks = links => {
  const url = 'http://10.127.153.68/savelinks';
  console.log(JSON.stringify(links));
  // const jwt = isAuthenticated();
  return thunkCreator({
    types: ['SAVELINKS_REQUEST', 'SAVELINKS_SUCCESS', 'SAVELINKS_ERROR'],
    promise: fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify(links)
    }).then(response => response.json())
  });
};

export { editSource, setSourceId, saveLinks };
