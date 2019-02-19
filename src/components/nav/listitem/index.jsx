import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <li>
      {props.children}
      <ul>
        <li>
          <Link to={'/' + props.target}>Selaus</Link>
        </li>
        <li>Haku</li>
        <li>Syöttö</li>
      </ul>
    </li>
  );
};
