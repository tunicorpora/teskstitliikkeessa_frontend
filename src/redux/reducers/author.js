export default function authorReducer(state = {}, action) {
  const { type, result, fieldname, val } = action;
  switch (type) {
    case 'AUTHOR_SUCCESS':
      return result;
    case 'RESET_ROUTE_STATE':
      return {};
    case 'EDIT_AUTHOR':
      return { ...state, [fieldname]: val };
    case 'AUTHOR_ERROR':
      return {};
    case 'RESET_AUTHOR':
    case 'UPLOAD_RESET':
      return {};
    default:
      return state;
  }
}
