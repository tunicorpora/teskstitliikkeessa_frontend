import React from 'react';
import ReactDOM from 'react-dom';

export default props => {
  return (
    <div>
      <h2>Toimijat</h2>
      <ul>
        {props.list.map((author, idx) => (
          <li key={idx}>{author}</li>
        ))}
      </ul>
    </div>
  );
};
