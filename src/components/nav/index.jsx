import React, { Component } from 'react';
import ListItem from './listitem/index.jsx';
import { Link } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/utils';
import styles from './styles.scss';

export default class Nav extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <nav className={styles.mainNav}>
        <div className={styles.navItems}>
          <ul>
            <ListItem target={'about'}>Etusivu</ListItem>
            <ListItem target={'toimijat'}>Toimijat</ListItem>
            <ListItem target={'kontribuutiot'}>Kontribuutiot</ListItem>
            <li className={isAuthenticated() ? styles.visible : styles.hidden}>
              <Link to={'/tuonti'}>Tuo uutta dataa</Link>
            </li>
            <li className={isAuthenticated() ? styles.hidden : styles.visible}>
              <Link to={'/signin'}>Kirjaudu sisään</Link>
            </li>
            <li className={isAuthenticated() ? styles.visible : styles.hidden}>
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
        </div>
      </nav>
    );
  }
}
