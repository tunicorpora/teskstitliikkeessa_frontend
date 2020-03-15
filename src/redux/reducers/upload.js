export default (state = 'none', action) => {
  const { type, result } = action;

  switch (type) {
    case 'TEST_UPLOAD':
      return 'testing an upload..';
    case 'COMBINEAUTHORS_SUCCESS':
      return 'authors combined';
    case 'UPLOAD_RESET':
      return 'none';
    case 'RESET_ROUTE_STATE':
      return 'none';
    case 'UPLOAD_REQUEST':
    case 'AUTHORDELETE_REQUEST':
    case 'SAVEAUTHOR_REQUEST':
    case 'SEARCH_REQUEST':
      return 'in progress';
    case 'SAVEAUTHOR_SUCCESS':
    case 'AUTHORDELETE_SUCCESS':
    case 'SEARCH_SUCCESS':
      return 'success';
    case 'UPLOAD_SUCCESS':
      if (result.uploadStatus && result.uploadStatus === 'receptions ok') {
        return 'receptions ok';
      }
      return result.uploadStatus.saved || 0;
    case 'UPLOAD_ERR':
    case 'UPLOAD_ERROR':
    case 'SEARCH_ERROR':
    case 'SAVEAUTHOR_ERROR':
    case 'AUTHORDELETE_ERROR':
      return 'upload error';
    default:
      return state;
  }
};
