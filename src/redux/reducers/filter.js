export function filterReducer(state = [], action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'ADD_FILTER':
      return [...state, {}];
      break;
    case 'REMOVE_FILTER':
      let newstate = state;
      newstate.splice(rest.idx, 1);
      return state;
      break;
    case 'UPDATE_FILTER':
      const { idx, field, val } = rest;
      return state.map((filter, stateidx) => {
        if (stateidx === idx) {
          let altered = filter;
          if (!altered.fieldname) {
            altered.fieldname = 'Toimija';
          }
          return { ...altered, ...{ [field]: val } };
        } else {
          return filter;
        }
      });
      break;
    default:
      return state;
  }
}
