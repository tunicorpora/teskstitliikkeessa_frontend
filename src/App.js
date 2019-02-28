import { connect } from 'react-redux';
import Main from './components/main/index.jsx';

function mapStateToProps(state) {
  return {
    authorlist: state.authorlist,
    contributionlist: state.contributionlist,
    uploadStatus: state.contributionlist,
    rowEdit: state.rowEdit,
    colEdit: state.colEdit,
    auth: state.auth,
    contributionfilters: state.contributionfilters,
    contributioncolnames: state.contributioncolnames,
  };
}

const App = connect(mapStateToProps)(Main);

export default App;
