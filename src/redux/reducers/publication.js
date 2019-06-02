export default (state = {}, action) => {
  const { type, ...rest } = action;
  if (type === 'RECEPTIONS_SUCCESS') {
    return { ...state, ...rest.result };
  }
  return state;
};
