import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import styles from './styles.scss';

const LabelledField = props => {
  const { onChange, label, inputType, value, children } = props;
  const id = cuid();
  const inputProps = { id, onChange, value };
  return (
    <div className={styles.labelContainer}>
      <label htmlFor={id}>{label}</label>
      {inputType === 'text' && !children && <input type="text" {...inputProps} />}
      {inputType === 'area' && <textarea className={styles.area} {...inputProps} />}
      {inputType === 'number' && <input type="number" {...inputProps} />}
      {children}
    </div>
  );
};

LabelledField.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
};

LabelledField.defaultProps = {
  inputType: 'text',
  value: '',
  children: null,
  onChange: () => null
};

export default LabelledField;
