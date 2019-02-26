import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <li>
      <Link to={'/' + props.target}>{props.children}</Link>
    </li>
  );
};
