export default (
  state = {
    original: true,
    translations: true,
    adaptations: true,
    reviews: true,
    articles: true,
    other: true
  },
  action
) => {
  const { type, isChecked, value } = action;
  if (type === 'UPDATE_TEXTTYPE_FILTER') {
    return { ...state, [value]: isChecked };
  }
  if (type === 'RESET_ROUTE_STATE') {
    return {
      original: true,
      translations: true,
      adaptations: true,
      reviews: true,
      articles: true,
      other: true
    };
  }
  return state;
};
