export default (state = [], action) => {
  const { type, result } = action;

  if (type === 'AUTHORNAMELIST_SUCCESS') {
    return [...result];
  }
  if (type === 'RESET_ROUTE_STATE') {
    return [];
  }

  return state;
};
