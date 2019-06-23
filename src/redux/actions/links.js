import { thunkCreator } from './utils';
import { fetchReceptions } from './author';

const editSource = sourceId => ({
  type: 'EDIT_SOURCE',
  sourceId
});

const editLinks = (linkType, sourceId) => ({
  type: 'EDIT_LINK',
  sourceId: sourceId && sourceId.map(s => s.value),
  linkType
});

const editLink = (linkType, sourceId) => dispatch => {
  if (linkType === 'source') {
    return dispatch(fetchReceptions(sourceId)).then(() => dispatch(editSource(sourceId)));
  }
  return dispatch(editLinks(linkType, sourceId));
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

export { editLink, saveLinks };
