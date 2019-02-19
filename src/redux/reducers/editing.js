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
      let newstate = Object.assign({}, state);
      let edited = Object.assign(newstate, edit);
      return edited;
      break;
    default:
      return state;
  }
}
