export function authReducer(state = {}, action) {
  const { type, ...rest } = action;
  let newstate = Object.assign({}, state);

  switch (type) {
    case 'EDIT_CREDENTIALS':
      //const edited = Object.assign({}, newstate);
      newstate.user[rest.field] = rest.val;
      return newstate;
      break;
    case 'SIGNIN_SUCCESS':
      newstate.status = 'Signed in';
      return newstate;
      break;
    case 'SIGNIN_ERROR':
      newstate.status = 'Signin failed';
      return newstate;
      break;
    case 'SIGNOUT':
      newstate.status = 'Signed out';
      return newstate;
      break;
    case 'SIGNIN':
      newstate.status = 'Signed in';
      return newstate;
      break;
    default:
      return state;
  }
}
