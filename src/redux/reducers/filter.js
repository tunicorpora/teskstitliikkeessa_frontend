export default (state = [{ fieldname: 'title' }], action) => {
  const { type, idx, field, val } = action;
  const newstate = [...state];

  switch (type) {
    case 'ADD_FILTER':
      return [...state, { fieldname: 'title' }];
    case 'REMOVE_FILTER':
      newstate.splice(idx, 1);
      return newstate;
    case 'UPDATE_FILTER':
      return state.map((filter, stateidx) => {
        if (stateidx === idx) {
          return { ...filter, ...{ [field]: val } };
        }
        return filter;
      });
    default:
      return state;
  }
};
