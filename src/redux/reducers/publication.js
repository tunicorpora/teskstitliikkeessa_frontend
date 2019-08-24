export default (state = {}, action) => {
  const { type, ...rest } = action;
  if (['RECEPTIONS_SUCCESS', 'DETAILS_SUCCESS'].includes(type)) {
    return { ...state, ...rest.result };
  }
  // if (type === 'RECEPTIONS_SUCCESS') {
  //   return { ...state, ...rest.result };
  // }
  return state;
};
