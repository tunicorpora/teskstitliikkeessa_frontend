export function authReducer(state = {}, action) {
  const { type, ...rest } = action;

  switch (type) {
    case 'EDIT_CREDENTIALS':
      let newstate = Object.assign({}, state);
      //const edited = Object.assign({}, newstate);
      newstate.user[rest.field] = rest.val;
      return newstate;
      break;
    case 'SIGNIN_ERROR':
      console.log('error signin in..');
      return state;
      break;
    case 'SIGNOUT':
      let signoutstate = Object.assign({}, state);
      signoutstate.status = 'Signed out';
      return signoutstate;
      break;
    default:
      return state;
  }
}
