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
    default:
      return state;
  }

  return state;
}
