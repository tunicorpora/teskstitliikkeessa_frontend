import React from 'react';
import ListItem from './listitem/index.jsx';
import { Link } from 'react-router-dom';
import { signout } from '../auth/utils';

export default ({ dispatch }) => (
  <nav>
    <ul>
      <ListItem target={'toimijat'}>Toimijat</ListItem>
      <ListItem target={'kontribuutiot'}>Kontribuutiot</ListItem>
      <li>
        <Link to={'/tuonti'}>Tuo uutta dataa</Link>
      </li>
      <li>
        <Link to={'/signin'}>Kirjaudu sisään</Link>
      </li>
      <li>
        <a
          href="javascript:void(0)"
          onClick={() => {
            signout();
            dispatch();
          }}
        >
          Kirjaudu ulos
        </a>
      </li>
    </ul>
  </nav>
);
