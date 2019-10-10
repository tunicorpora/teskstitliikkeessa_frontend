import React from 'react';
import PropTypes from 'prop-types';
import styles from './texttypefilter.scss';
import { updateTextTypeFilter } from '../../../redux/actions/filter';

const TextTypeFilter = props => {
  const { dispatch, text, value, textTypeFilter } = props;
  return (
    <div className={styles.container}>
      <div>
        <input
          type="checkbox"
          checked={textTypeFilter[value]}
          onChange={ev => dispatch(updateTextTypeFilter(value, ev.target.checked))}
        />
      </div>
      <div>{text}</div>
    </div>
  );
};

TextTypeFilter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  textTypeFilter: PropTypes.shape({ translations: PropTypes.bool }).isRequired
};

export default TextTypeFilter;
