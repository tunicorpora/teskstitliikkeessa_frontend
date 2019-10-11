export default function authorReducer(state = {}, action) {
  const { type, result, fieldname, val } = action;
  switch (type) {
    case 'AUTHOR_SUCCESS':
      return result;
    case 'EDIT_AUTHOR':
      return { ...state, [fieldname]: val };
    case 'AUTHOR_ERROR':
      return {};
    case 'RESET_AUTHOR':
      return {};
    default:
      return state;
  }
}
