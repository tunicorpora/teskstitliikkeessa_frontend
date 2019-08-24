export default (state = { source: null, receptions: {} }, action) => {
  const { type, ...rest } = action;
  const { id, linkType, ids } = rest;

  if (type === 'SET_SOURCE_ID') {
    return { ...state, ...{ source: id } };
  }

  if (type === 'EDIT_LINK') {
    const { receptions } = state;
    const updated = { ...receptions, ...{ [linkType]: ids || [] } };
    return { ...state, ...{ receptions: updated } };
  }

  return state;
};
