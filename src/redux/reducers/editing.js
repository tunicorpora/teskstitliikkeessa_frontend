export function rowReducer(state = {}, action) {
  const { type, id, col, val } = action;

  switch (type) {
    case 'CANCEL_EDITS':
      return { id: null };
    case 'START_TO_EDIT_CONTRIBUTION':
      return { id };
    case 'EDIT_CONTRIBUTION':
      return { ...state, ...{ [col]: val } };
    default:
      return state;
  }
}

export function colReducer(state = {}, action) {
  const { type, ...edit } = action;

  switch (type) {
    case 'CANCEL_COL_EDIT':
      return { name: null, newname: null };
    case 'EDIT_COLNAME':
      return { name: edit.name, newname: edit.newname };
    case 'START_TO_EDIT_COLNAME':
      return { name: edit.name, newname: edit.name };
    default:
      return state;
  }
}
