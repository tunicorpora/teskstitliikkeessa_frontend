import React, { Component } from 'react';
import ListItem from './listitem/index.jsx';
import { Link } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/utils';
import styles from './styles.scss';

export default props => {
  const { dispatch } = props;
  return (
    <nav className={styles.mainNav}>
      <div className={styles.navItems}>
        <ul>
          <ListItem target="search">Tekstit</ListItem>
          <ListItem target="authors">Tekijät</ListItem>
          {isAuthenticated() && (
            <li>
              <Link to={'/tuonti'}>Lisää alkuperäisteoksia</Link>
            </li>
          )}
          {isAuthenticated() && <ListItem target="addlinks">Lisää reseptioita</ListItem>}
          {isAuthenticated() && <ListItem target="newpublication">Lisää yksittäinen</ListItem>}
          {isAuthenticated() && <ListItem target="publicationedit">Muokkaa tekstejä</ListItem>}
          {isAuthenticated() && <ListItem target="authoredit">Muokkaa tekijöitä</ListItem>}
          <li className={isAuthenticated() ? styles.hidden : styles.visible}>
            <Link to={'/signin'}>Kirjaudu sisään</Link>
          </li>
          <li className={isAuthenticated() ? styles.visible : styles.hidden}>
            <a
              href="#"
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
};
