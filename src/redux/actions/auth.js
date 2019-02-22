import { thunkCreator } from './utils';
import { authenticate } from '../../components/auth/utils';

export function editCredentials(field, val) {
  return {
    type: 'EDIT_CREDENTIALS',
    field: field,
    val: val,
  };
}

export function signIn(user) {
  const url = 'http://localhost:3000/signin';
  return thunkCreator({
    types: ['SIGNIN_REQUEST', 'SIGNIN_SUCCESS', 'SIGNIN_ERROR'],
    promise: fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(jwt => authenticate(jwt)),
  });
  return {
    type: 'SIGN_IN',
  };
}
