export default function authorReducer(state = {}, action) {
  const { type, ...authorlist } = action;

  switch (type) {
    case 'TEST_AUTHORS':
      return authorlist.list;
      break;
    default:
      return state;
  }

  return state;
}
