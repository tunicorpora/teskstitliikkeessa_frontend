import React from 'react';
import PropTypes from 'prop-types';

const Prompt = props => {
  const { text } = props;
  return <div>{text}</div>;
};

Prompt.propTypes = {
  text: PropTypes.string
};

Prompt.defaultProps = {
  text: 'Oletko aivan varma?'
};

export default Prompt;
