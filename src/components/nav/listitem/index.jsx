import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '../../ui/icon';
import styles from './styles.scss';

const listItem = ({ children, iconName, target }) => {
  return (
    <li className={styles.container}>
			{iconName && <span className={styles.left}><Icon iconName={iconName} /></span>}
      <Link to={`/${target}`}>{children}</Link>
    </li>
  );
};

listItem.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.string.isRequired,
  iconName: PropTypes.string,
};

listItem.defaultProps = {
  iconName: '',
};

export default listItem;
