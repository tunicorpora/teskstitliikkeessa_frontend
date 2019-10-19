export default (state = 'none', action) => {
  const { type, result } = action;

  switch (type) {
    case 'TEST_UPLOAD':
      return 'testing an upload..';
    case 'UPLOAD_RESET':
      return 'none';
    case 'RESET_ROUTE_STATE':
      return 'none';
    case 'UPLOAD_REQUEST':
      return 'in progress';
    case 'UPLOAD_SUCCESS':
      if (result.uploadStatus && result.uploadStatus === 'receptions ok') {
        return 'receptions ok';
      }
      return result.uploadStatus.saved || 0;
    case 'UPLOAD_ERROR':
      return 'upload error';
    default:
      return state;
  }
};
