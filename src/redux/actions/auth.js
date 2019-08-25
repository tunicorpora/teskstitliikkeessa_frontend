import { thunkCreator } from './utils';
import { authenticate } from '../../components/auth/utils';

export function editCredentials(field, val) {
  return {
    type: 'EDIT_CREDENTIALS',
    field,
    val
  };
}

export function signIn(auth) {
  const url = `${ENV.apiUrl}/signin`;
  const { username, password } = auth;
  return thunkCreator({
    types: ['SIGNIN_REQUEST', 'SIGNIN_SUCCESS', 'SIGNIN_ERROR'],
    promise: fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(jwt => authenticate(jwt))
  });
}
