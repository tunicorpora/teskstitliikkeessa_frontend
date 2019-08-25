export default (state = {}, action) => {
  const { type, ...rest } = action;

  switch (type) {
    case 'EDIT_CREDENTIALS':
      return { ...state, [rest.field]: rest.val };
    case 'SIGNIN_SUCCESS':
      return { ...state, status: 'Signed in' };
    case 'SIGNIN_ERROR':
      return { ...state, status: 'Signin failed' };
    case 'SIGNOUT':
      return { ...state, status: 'Signed out' };
    case 'SIGNIN':
      return { ...state, status: 'Signed in' };
    default:
      return state;
  }
};
