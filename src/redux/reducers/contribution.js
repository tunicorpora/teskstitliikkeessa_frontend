export function contributionReducer(state = {}, action) {
  const { type, ...contributionlist } = action;

  switch (type) {
    case 'CONTRIBUTIONLIST_REQUEST':
      break;
    case 'CONTRIBUTIONLIST_SUCCESS':
      return contributionlist.result;
      break;
    case 'CONTRIBUTIONLIST_ERROR':
      console.log('request error. ');
      break;
    case 'CONTRIBUTIONDELETE_ERROR':
      console.log('request error. ');
      break;
    case 'CONTRIBUTIONSAVE_ERROR':
      console.log('request error. ');
      break;
    default:
      return state;
  }

  return state;
}

export function colNameReducer(state = [], action) {
  const { type, ...contributionlist } = action;

  switch (type) {
    case 'CONTRIBUTION_COLNAMES_REQUEST':
      return state;
      break;
    case 'CONTRIBUTION_COLNAMES_SUCCESS':
      return Object.keys(contributionlist.result)
        .filter(key => key.indexOf('_') !== 0 && key)
        .map(key => (key === 'author' ? 'Toimija' : key));
      return contributionlist.result;
      break;
    default:
      return state;
  }

  return state;
}
