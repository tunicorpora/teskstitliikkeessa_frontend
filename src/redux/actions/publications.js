import { thunkCreator } from './utils';

const fetchDetailsRaw = id => {
  const url = `http://10.127.153.68/publications/${id}`;
  return fetch(url).then(response => response.json());
};

const fetchDetails = id => {
  const url = `http://10.127.153.68/publications/${id}`;

  return thunkCreator({
    types: ['DETAILS_REQUEST', 'DETAILS_SUCCESS', 'DETAILS_ERROR'],
    promise: fetch(url)
      .then(response => response.json())
      .then(details => ({ [id]: Array.isArray(details) ? details[0] : details }))
  });
};

export { fetchDetails, fetchDetailsRaw };
