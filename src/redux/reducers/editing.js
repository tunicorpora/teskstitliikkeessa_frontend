export function rowReducer(state = {}, action) {
  const { type, ...edit } = action;

  switch (type) {
    case 'CANCEL_EDITS':
      return { id: null };
      break;
    case 'START_TO_EDIT_CONTRIBUTION':
      return { id: edit.id };
      break;
    case 'EDIT_CONTRIBUTION':
      return { ...state, ...edit };
      break;
    default:
      return state;
  }
}
