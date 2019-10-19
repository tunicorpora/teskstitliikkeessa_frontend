import { thunkCreator } from './utils';

const performSearch = (filters, textTypeFilter, page = 1) => {
  console.log('heeee');
  let url = `${ENV.apiUrl}/publication?page=${page}`;
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
  const url = `${ENV.apiUrl}/publication/${id}`;
  return fetch(url).then(response => response.json());
};

const fetchDetails = id => {
  const url = `${ENV.apiUrl}/publication/${id}`;

  return thunkCreator({
    types: ['DETAILS_REQUEST', 'DETAILS_SUCCESS', 'DETAILS_ERROR'],
    promise: fetch(url)
      .then(response => response.json())
      .then(details => ({ [id]: Array.isArray(details) ? details[0] : details }))
  });
};

const exportResults = alldata => {
  console.log(alldata.map(item => item._id));
  const url = `${ENV.apiUrl}/export?ids=${alldata.map(item => item._id).join(',')}`;
  return thunkCreator({
    types: ['EXPORT_REQUEST', 'EXPORT_SUCCESS', 'EXPORT_ERROR'],
    promise: fetch(url).then(response => response.json())
  });
};

const resetRouteState = () => ({ type: 'RESET_ROUTE_STATE' });

export { fetchDetails, fetchDetailsRaw, performSearch, exportResults, resetRouteState };
