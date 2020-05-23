import React, { Component } from 'react';
import ListItem from './listitem/index.jsx';
import { Link } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/utils';
import Icon from '../ui/icon';
import styles from './styles.scss';

export default props => {
  const { dispatch } = props;
  return (
    <nav className={styles.mainNav}>
      <div className={styles.navItems}>
        <ul>
					<ListItem target="search" iconName="faFileAlt"> Tekstit</ListItem>
          <ListItem target="authors" iconName="faUsers" >Tekijät</ListItem>
          {isAuthenticated() && (
						<ListItem target="tuonti" iconName="faBook" >Lisää alkuperäisteoksia</ListItem>
          )}
          {isAuthenticated() && <ListItem target="addlinks" iconName="faDirections">Lisää reseptioita</ListItem>}
          {isAuthenticated() && <ListItem target="newpublication" iconName="faPlus">Lisää yksittäinen</ListItem>}
          {isAuthenticated() && <ListItem target="publicationedit" iconName="faPencilAlt">Muokkaa tekstejä</ListItem>}
          {isAuthenticated() && <ListItem target="authoredit" iconName="faUserCog">Muokkaa tekijöitä</ListItem>}
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
