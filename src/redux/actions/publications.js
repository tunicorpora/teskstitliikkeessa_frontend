import { thunkCreator } from './utils';

const performSearch = (filters, textTypeFilter, page = 1) => {
  let url = `${ENV.apiUrl}/search?page=${page}`;
  if (filters.length) {
    url += `&filters=${encodeURIComponent(JSON.stringify(filters))}`;
  }
  if (!Object.entries(textTypeFilter).every(([_, val]) => val)) {
    url += `&textTypes=${Object.entries(textTypeFilter)
      .filter(([_, val]) => val)
      .map(([cat]) => cat)
      .join(',')}`;
  }
  return thunkCreator({
    types: ['SEARCH_REQUEST', 'SEARCH_SUCCESS', 'SEARCH_ERROR'],
    promise: fetch(url).then(response => response.json())
  });
};

const fetchDetailsRaw = id => {
  const url = `${ENV.apiUrl}/publications/${id}`;
  return fetch(url).then(response => response.json());
};

const fetchDetails = id => {
  const url = `${ENV.apiUrl}/publications/${id}`;

  return thunkCreator({
    types: ['DETAILS_REQUEST', 'DETAILS_SUCCESS', 'DETAILS_ERROR'],
    promise: fetch(url)
      .then(response => response.json())
      .then(details => ({ [id]: Array.isArray(details) ? details[0] : details }))
  });
};

export { fetchDetails, fetchDetailsRaw, performSearch };
