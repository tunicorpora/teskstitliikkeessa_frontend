import { thunkCreator } from './utils';
import { isAuthenticated } from '../../components/auth/utils';

export function testUpload(targetform) {
  console.log(targetform);
  const form = new FormData(targetform);
  console.log(form);
  return {
    type: 'TEST_UPLOAD'
  };
}

export function uploadData(targetform, uploadType = '') {
  const form = new FormData(targetform);
  const url = `${ENV.apiUrl}/upload${uploadType}`;
  const jwt = isAuthenticated();
  console.log(jwt);
  return thunkCreator({
    types: ['UPLOAD_REQUEST', 'UPLOAD_SUCCESS', 'UPLOAD_ERROR'],
    promise: fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + jwt.token
      },
      body: form
    }).then(response => response.json())
  });
}
