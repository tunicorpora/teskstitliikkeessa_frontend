import React from 'react';
import ListItem from './listitem/index.jsx';

export default () => (
  <nav>
    <ul>
      <ListItem target={'toimijat'}>Toimijat</ListItem>
      <ListItem target={'kontribuutiot'}>Kontribuutiot</ListItem>
    </ul>
  </nav>
);
