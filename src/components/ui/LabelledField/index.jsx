import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import styles from './styles.scss';

const LabelledField = props => {
  const { onChange, label, inputType, value } = props;
  const id = cuid();
  const inputProps = { id, onChange, value };
  return (
    <div className={styles.labelContainer}>
      <label htmlFor={id}>{label}</label>
      {inputType === 'text' && <input type="text" {...inputProps} />}
      {inputType === 'area' && <textarea className={styles.area} {...inputProps} />}
      {inputType === 'number' && <input type="number" {...inputProps} />}
    </div>
  );
};

LabelledField.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

LabelledField.defaultProps = {
  inputType: 'text',
  value: ''
};

export default LabelledField;
