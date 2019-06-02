export function authorReducer(state = {}, action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'AUTHOR_REQUEST':
      break;
    case 'AUTHOR_SUCCESS':
      return rest.result;
    case 'AUTHOR_ERROR':
      console.log('Error requesting author..');
      console.log(rest);
      break;
    default:
      return state;
  }

  return state;
}
