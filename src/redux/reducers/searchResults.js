export default (state = [], action) => {
  const { type, result } = action;
  switch (type) {
    case 'SEARCH_SUCCESS':
      return result;
    case 'RESET_ROUTE_STATE':
      return [];
    default:
      return state;
  }
};
