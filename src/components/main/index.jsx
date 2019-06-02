import { HashRouter, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';

import About from '../content/about/index.jsx';
import Agents from '../content/authors/index.jsx';
import Contributions from '../content/contributions/index.jsx';
import Header from '../header/index.jsx';
import Inspector from '../content/inspector/index.jsx';
import LinkAdder from '../content/linkadder/index.jsx';
import Nav from '../nav/index.jsx';
import Signin from '../auth/signin.jsx';
import Xlsimporter from '../content/xlsimporter/index.jsx';
import styles from './general_styles.scss';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      contributionlist,
      dispatch,
      rowEdit,
      colEdit,
      auth,
      contributionfilters,
      uploadStatus,
      contributioncolnames: colnames,
      links,
      author,
      publications,
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
                  <Route exact path="/about" component={About} />
                  <Route exact path="/" component={About} />
                  <Route
                    path="/authors"
                    render={() => (
                      <Inspector
                        author={author}
                        dispatch={dispatch}
                        publications={publications}
                      />
                    )}
                  />
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
                    path="/addlinks"
                    render={() => (
                      <LinkAdder dispatch={dispatch} links={links} />
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
          <footer>
            <p>
              Tekninen toteutus ja toteutukseen liittyvät kysymykset: Juho Härme
              (juho.harme at gmail.com).
            </p>
            <p>
              Lähdekoodi &nbsp;
              <a href="https://github.com/tunicorpora/tekstitliikkeessa_api">
                täällä
              </a>
              &nbsp; ja &nbsp;
              <a href="https://github.com/tunicorpora/teskstitliikkeessa_frontend">
                täällä
              </a>
              .
            </p>
            <p>Palvelin Tampereen yliopistolta / CSC:ltä.</p>
            <p>YLEISTÄ TIETOA PROJEKTISTA / varsinaiset vastuuhenkilöt?</p>
          </footer>
        </main>
      </HashRouter>
    );
  }
}
