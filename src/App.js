import { connect } from 'react-redux';
import Main from './components/main/index.jsx';

function mapStateToProps(state) {
  return {
    authorlist: state.authorlist,
    contributionlist: state.contributionlist,
    uploadStatus: state.contributionlist,
    form: state.form,
  };
}

const App = connect(mapStateToProps)(Main);

export default App;
