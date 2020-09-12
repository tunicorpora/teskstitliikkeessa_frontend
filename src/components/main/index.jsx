import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

import About from '../content/about';
import Contributions from '../content/contributions';
import Inspector from '../content/inspector';
import LinkAdder from '../content/linkadder';
import Nav from '../nav';
import Signin from '../auth/signin';
import Xlsimporter from '../content/xlsimporter';
import styles from './general_styles.scss';
import SearchPage from '../content/search';
import AuthorEdit from '../content/authoredit';
import PublicationAdder from '../content/PublicationAdder';

const main = props => {
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
    editUtils,
    searchResults,
    textTypeFilter,
    newPublication,
    pendingEdits,
    authorNames,
    authorLetters
  } = props;

  return (
    <HashRouter>
      <main>
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
                      authorNames={authorNames}
                      authorLetters={authorLetters}
                      uploadStatus={uploadStatus}
                    />
                  )}
                />
                <Route
                  path="/authoredit"
                  render={() => (
                    <AuthorEdit author={author} dispatch={dispatch} uploadStatus={uploadStatus} />
                  )}
                />
                <Route
                  path="/newpublication"
                  render={() => (
                    <PublicationAdder
                      dispatch={dispatch}
                      newPublication={newPublication}
                      publications={publications}
                      uploadStatus={uploadStatus}
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
                  path="/search"
                  render={(renderProps) => (
                    <SearchPage
                      dispatch={dispatch}
                      publications={publications}
                      searchResults={searchResults}
                      filters={contributionfilters}
                      textTypeFilter={textTypeFilter}
                      uploadStatus={uploadStatus}
											{...renderProps}
                    />
                  )}
                />
                <Route
                  path="/addlinks"
                  render={() => (
                    <LinkAdder
                      uploadStatus={uploadStatus}
                      dispatch={dispatch}
                      links={links}
                      publications={publications}
                    />
                  )}
                />
                <Route path="/signin" render={() => <Signin dispatch={dispatch} auth={auth} />} />
                <Route
                  path="/publicationedit"
                  render={() => (
                    <Contributions
                      rowEdit={rowEdit}
                      list={searchResults}
                      filters={contributionfilters}
                      dispatch={dispatch}
                      colnames={colnames}
                      editUtils={editUtils}
                      textTypeFilter={textTypeFilter}
                      pendingEdits={pendingEdits}
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
};

main.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  authorNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  authorLetters: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default main;
