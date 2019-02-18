import React from 'react';
import { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Nav from '../nav/index.jsx';
import Agents from '../content/authors/index.jsx';
import About from '../content/about/index.jsx';
import Contributions from '../content/contributions/index.jsx';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <main>
          <Nav />
          <Switch>
            <Route exact path="/" component={About} />
            <Route path="/toimijat" component={Agents} />
            <Route path="/kontribuutiot" component={Contributions} />
          </Switch>
        </main>
      </HashRouter>
    );
  }
}
