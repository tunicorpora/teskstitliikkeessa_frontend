export function uploadReducer(state = 'none', action) {
  const { type, ...uploadStatus } = action;

  switch (type) {
    case 'TEST_UPLOAD':
      return 'testing an upload..';
      break;
    case 'UPLOAD_REQUEST':
      return 'in progress';
      break;
    case 'UPLOAD_SUCCESS':
      return uploadStatus.result.saved;
      break;
    case 'UPLOAD_ERROR':
      console.log('upload error');
      break;
    default:
      return state;
  }

  return state;
}
