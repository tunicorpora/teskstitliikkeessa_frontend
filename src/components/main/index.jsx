import React from 'react';
import { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Nav from '../nav/index.jsx';
import Agents from '../content/authors/index.jsx';
import Xlsimporter from '../content/xlsimporter/index.jsx';
import About from '../content/about/index.jsx';
import Contributions from '../content/contributions/index.jsx';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { authorlist, contributionlist, dispatch } = this.props;

    return (
      <HashRouter>
        <main>
          <Nav />
          <Switch>
            <Route exact path="/" component={About} />
            <Route
              path="/tuonti"
              render={() => <Xlsimporter dispatch={dispatch} />}
            />
            <Route
              path="/toimijat"
              render={() => <Agents list={authorlist} dispatch={dispatch} />}
            />
            <Route
              path="/kontribuutiot"
              render={() => (
                <Contributions list={contributionlist} dispatch={dispatch} />
              )}
            />
          </Switch>
        </main>
      </HashRouter>
    );
  }
}
