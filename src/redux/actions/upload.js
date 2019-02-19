import { thunkCreator } from './utils';

export function testUpload(targetform) {
  console.log(targetform);
  const form = new FormData(targetform);
  console.log(form);
  return {
    type: 'TEST_UPLOAD',
  };
}

export function uploadData(targetform) {
  const form = new FormData(targetform);
  const url = 'http://localhost:3000/upload';
  return thunkCreator({
    types: ['UPLOAD_REQUEST', 'UPLOAD_SUCCESS', 'UPLOAD_ERROR'],
    promise: fetch(url, { method: 'POST', body: form }).then(response =>
      response.json()
    ),
  });
}
