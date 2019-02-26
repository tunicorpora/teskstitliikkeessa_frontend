export function contributionReducer(state = {}, action) {
  const { type, ...contributionlist } = action;

  console.log(contributionlist);

  switch (type) {
    case 'CONTRIBUTIONLIST_REQUEST':
      break;
    case 'CONTRIBUTIONLIST_SUCCESS':
      return contributionlist.result;
      break;
    case 'CONTRIBUTIONLIST_ERROR':
      console.log('request error. ');
      break;
    case 'CONTRIBUTIONDELETE_ERROR':
      console.log('request error. ');
      break;
    case 'CONTRIBUTIONSAVE_ERROR':
      console.log('request error. ');
      break;
    default:
      return state;
  }

  return state;
}

export function colNameReducer(state = {}, action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'CHANGE_COL_STATE':
      return {
        all: state.all,
        active: state.all.filter(
          colname =>
            (rest.name === colname && rest.include) ||
            (rest.name !== colname && state.active.indexOf(colname) > -1)
        ),
      };
      break;
    case 'CONTRIBUTION_COLNAMES_REQUEST':
      return state;
      break;
    case 'CONTRIBUTION_COLNAMES_SUCCESS':
      const colnames = Object.keys(rest.result)
        .filter(key => key.indexOf('_') !== 0 && key)
        .map(key => (key === 'author' ? 'Toimija' : key));
      return {
        all: colnames,
        active: colnames.filter(
          col =>
            [
              'Ensi-ilta',
              'Ohjaaja',
              'Esityspaikka',
              'Linkki',
              'Tietokanta',
              'Lisätiedot',
            ].indexOf(col) < 0
        ),
      };
      break;

    default:
      return state;
  }

  return state;
}
