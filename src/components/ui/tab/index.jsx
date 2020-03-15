import React from 'react';
import PropTypes from 'prop-types';

const Tab = props => {
  const { children } = props;
  console.log(children);
  return <div>moro</div>;
};

Tab.propTypes = {
  children: PropTypes.node.isRequired
};

export default Tab;
