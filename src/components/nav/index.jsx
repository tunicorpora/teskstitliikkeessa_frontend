import React, { Component } from 'react';
import ListItem from './listitem/index.jsx';
import { Link } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/utils';
import styles from './styles.scss';

export default props => {
  const { dispatch } = props;
  return (
    <nav className={styles.mainNav}>
      <div className={styles.logo}>Tekstit liikkeessä</div>
      <div className={styles.navItems}>
        <ul>
          <ListItem target="search">Haku</ListItem>
          <ListItem target="authors">Selaus kirjailijoittain</ListItem>
          <ListItem target="addlinks">Lisää reseptioita</ListItem>
          <li className={isAuthenticated() ? styles.visible : styles.hidden}>
            <Link to={'/tuonti'}>Tuo dataa</Link>
          </li>
          <li className={isAuthenticated() ? styles.hidden : styles.visible}>
            <Link to={'/signin'}>Kirjaudu sisään</Link>
          </li>
          <ListItem target="publicationedit">Muokkaa julkaisuja</ListItem>
          <ListItem target="authoredit">Muokkaa toimijoita</ListItem>
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
};
