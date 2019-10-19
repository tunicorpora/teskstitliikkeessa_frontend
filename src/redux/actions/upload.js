import { thunkCreator } from './utils';
import { isAuthenticated } from '../../components/auth/utils';

const uploadDataRaw = (targetform, uploadType) => {
  const form = new FormData(targetform);
  const url = `${ENV.apiUrl}/${uploadType}`;
  const jwt = isAuthenticated();
  const { token } = jwt;
  return thunkCreator({
    types: ['UPLOAD_REQUEST', 'UPLOAD_SUCCESS', 'UPLOAD_ERROR'],
    promise: fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: form
    }).then(response => response.json())
  });
};

const uploadData = (targetform, uploadType = 'publication') => dispatch => {
  dispatch(uploadDataRaw(targetform, uploadType));
};

const resetUploadStatus = () => ({
  type: 'UPLOAD_RESET'
});

export { uploadData, resetUploadStatus };
