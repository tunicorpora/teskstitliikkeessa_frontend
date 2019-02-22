import React, { Component } from 'react';
import ListItem from './listitem/index.jsx';
import { Link } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/utils';

export default class Nav extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <nav>
        <ul>
          <ListItem target={'toimijat'}>Toimijat</ListItem>
          <ListItem target={'kontribuutiot'}>Kontribuutiot</ListItem>
          <li style={{ display: isAuthenticated() ? 'block' : 'none' }}>
            <Link to={'/tuonti'}>Tuo uutta dataa</Link>
          </li>
          <li style={{ display: !isAuthenticated() ? 'block' : 'none' }}>
            <Link to={'/signin'}>Kirjaudu sisään</Link>
          </li>
          <li style={{ display: isAuthenticated() ? 'block' : 'none' }}>
            <a
              href="javascript:void(0)"
              onClick={() => {
                signout();
                dispatch({ type: 'SIGNOUT' });
              }}
            >
              Kirjaudu ulos
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
