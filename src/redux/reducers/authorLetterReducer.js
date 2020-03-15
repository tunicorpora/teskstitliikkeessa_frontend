export default (state = [], action) => {
  const { type, result } = action;

  if (type === 'AUTHORLETTERLIST_SUCCESS') {
    return [...result];
  }

  return state;
};
