export function filterReducer(state = {}, action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'ADD_FILTER':
      return [...state, {}];
      break;
    case 'UPDATE_FILTER':
      const { idx, field, val } = rest;
      return state.map((filter, stateidx) => {
        if (stateidx === idx) {
          return { ...filter, ...{ [field]: val } };
        } else {
          return filter;
        }
      });
      break;
    default:
      return state;
  }
}
