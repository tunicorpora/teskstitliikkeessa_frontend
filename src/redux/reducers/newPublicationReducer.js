const newPublicationReducer = (state = {}, action) => {
  const { type, fieldname, value } = action;

  if (type === 'UPDATE_NEWPUBLICATION_FIELD') {
    return { ...state, [fieldname]: value };
  }
  if (type === 'RESET_ROUTE_STATE') {
    return {};
  }

  return state;
};

export default newPublicationReducer;
