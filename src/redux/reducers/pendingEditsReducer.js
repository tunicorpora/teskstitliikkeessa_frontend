export default (state = [], action) => {
  const { type, id } = action;

  if (type === 'ADD_PENDING_ID') {
    return [...state, id];
  }
  if (type === 'REMOVE_PENDING_ID') {
    return state.filter(stateId => stateId !== id);
  }
  if (type === 'REMOVE_ALL_PENDING_IDS') {
    return [];
  }
  return state;
};
