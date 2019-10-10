export default (state = [], action) => {
  const { type, result } = action;
  switch (type) {
    case 'SEARCH_SUCCESS':
      return result;
    default:
      return state;
  }
};
