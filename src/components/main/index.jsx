import React from 'react';
import { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Nav from '../nav/index.jsx';
import Header from '../header/index.jsx';
import Signin from '../auth/signin.jsx';
import Agents from '../content/authors/index.jsx';
import Xlsimporter from '../content/xlsimporter/index.jsx';
import About from '../content/about/index.jsx';
import Contributions from '../content/contributions/index.jsx';
import styles from './general_styles.scss';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      authorlist,
      contributionlist,
      dispatch,
      rowEdit,
      colEdit,
      auth,
      contributionfilters,
      uploadStatus,
      contributioncolnames: colnames,
    } = this.props;

    return (
      <HashRouter>
        <main>
          <Header />
          <Nav dispatch={dispatch} />
          <div className={styles.pageContainer}>
            <div className={styles.content}>
              <div className={styles.innerContent}>
                <Switch>
                  <Route exact path="/" component={About} />
                  <Route
                    path="/tuonti"
                    render={() => (
                      <Xlsimporter
                        dispatch={dispatch}
                        colEdit={colEdit}
                        colnames={colnames}
                        uploadStatus={uploadStatus}
                      />
                    )}
                  />
                  <Route
                    path="/toimijat"
                    render={() => (
                      <Agents list={authorlist} dispatch={dispatch} />
                    )}
                  />
                  <Route
                    path="/signin"
                    render={() => <Signin dispatch={dispatch} auth={auth} />}
                  />
                  <Route
                    path="/kontribuutiot"
                    render={() => (
                      <Contributions
                        rowEdit={rowEdit}
                        list={contributionlist}
                        filters={contributionfilters}
                        dispatch={dispatch}
                        colnames={colnames}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </main>
      </HashRouter>
    );
  }
}
