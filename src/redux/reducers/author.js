export default function authorReducer(state = {}, action) {
  const { type, ...authorlist } = action;

  switch (type) {
    case 'AUTHORLIST_REQUEST':
      console.log('request sent ');
      break;
    case 'AUTHORLIST_SUCCESS':
      return authorlist.result;
      break;
    case 'AUTHORLIST_ERROR':
      console.log('request error. ');
      break;
    case 'TEST_AUTHORS':
      return authorlist.list;
      break;
    default:
      return state;
  }

  return state;
}
