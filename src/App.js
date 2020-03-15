import { connect } from 'react-redux';
import Main from './components/main/index.jsx';

function mapStateToProps(state) {
  return {
    author: state.author,
    contributionlist: state.contributionlist,
    uploadStatus: state.uploadStatus,
    rowEdit: state.rowEdit,
    colEdit: state.colEdit,
    auth: state.auth,
    contributionfilters: state.contributionfilters,
    contributioncolnames: state.contributioncolnames,
    links: state.links,
    publications: state.publications,
    editUtils: state.editUtils,
    searchResults: state.searchResults,
    textTypeFilter: state.textTypeFilter,
    newPublication: state.newPublication,
    pendingEdits: state.pendingEdits,
    authorNames: state.authorNames,
    authorLetters: state.authorLetters
  };
}

const App = connect(mapStateToProps)(Main);

export default App;
