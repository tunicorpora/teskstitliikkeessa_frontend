import { thunkCreator, resetRouteState } from './utils';
import { isAuthenticated } from '../../components/auth/utils';

const uploadDataRaw = (targetform, uploadType) => {
  const form = new FormData(targetform);
  const url = `${process.env.API_URL}/${uploadType}`;
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

const submitPublicationRaw = (publication, type) => {
  const url = `${process.env.API_URL}/singlepublication`;
  const jwt = isAuthenticated();
  const { token } = jwt;
  return thunkCreator({
    types: ['UPLOAD_REQUEST', 'UPLOAD_SUCCESS', 'UPLOAD_ERROR'],
    promise: fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ publication, type })
    }).then(response => response.json())
  });
};

const submitPublication = (publication, type) => dispatch => {
  dispatch(submitPublicationRaw(publication, type)).then(() => dispatch(resetRouteState));
};

export { uploadData, resetUploadStatus, submitPublication };
