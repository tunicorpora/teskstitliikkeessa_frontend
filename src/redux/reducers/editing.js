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

export function colReducer(state = {}, action) {
  const { type, ...edit } = action;

  switch (type) {
    case 'CANCEL_COL_EDIT':
      return { name: null, newname: null };
      break;
    case 'EDIT_COLNAME':
      return { name: edit.name, newname: edit.newname };
      break;
    case 'START_TO_EDIT_COLNAME':
      return { name: edit.name, newname: edit.name };
      break;
    default:
      return state;
  }
}
