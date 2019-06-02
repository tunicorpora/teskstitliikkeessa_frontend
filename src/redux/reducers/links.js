export default (state = { source: null, receptions: {} }, action) => {
  const { type, ...rest } = action;
  const { sourceId, linkType } = rest;

  if (type === 'EDIT_SOURCE') {
    return { ...state, ...{ source: sourceId } };
  }

  if (type === 'EDIT_LINK') {
    const { receptions } = state;
    const updated = { ...receptions, ...{ [linkType]: sourceId || [] } };
    return { ...state, ...{ receptions: updated } };
  }

  return state;
};
