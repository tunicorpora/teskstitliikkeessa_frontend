import { thunkCreator } from './utils';

const editLink = (linkType, sourceId) => {
  if (linkType === 'source') {
    return {
      type: 'EDIT_SOURCE',
      sourceId,
    };
  }
  return {
    type: 'EDIT_LINK',
    sourceId: sourceId && sourceId.map(s => s.value),
    linkType,
  };
};

const saveLinks = (links) => {
  const url = 'http://10.127.153.68/savelinks';
  console.log(JSON.stringify(links));
  // const jwt = isAuthenticated();
  return thunkCreator({
    types: ['SAVELINKS_REQUEST', 'SAVELINKS_SUCCESS', 'SAVELINKS_ERROR'],
    promise: fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + jwt.token,
      },
      body: JSON.stringify(links),
    }).then(response => response.json()),
  });
};

export { editLink, saveLinks };
