export default (state = {}, action) => {
  const { type } = action;

  if (type === 'LAST_EDIT') {
    return { ...state, lastEdit: action.id };
  }
  return state;
};
