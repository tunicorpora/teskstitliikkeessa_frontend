export default (state = 'none', action) => {
  const { type, result } = action;

  switch (type) {
    case 'TEST_UPLOAD':
      return 'testing an upload..';
      break;
    case 'UPLOAD_REQUEST':
      return 'in progress';
      break;
    case 'UPLOAD_SUCCESS':
      return result.uploadStatus.saved || 0;
      break;
    case 'UPLOAD_ERROR':
      console.log('upload error');
      break;
    default:
      return state;
  }

  return state;
};
