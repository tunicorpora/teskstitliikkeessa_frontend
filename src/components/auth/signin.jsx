import React from 'react';
import ReactDOM from 'react-dom';

export default () => (
  <form
    onSubmit={e => {
      e.preventDefault();
      console.log('submitting..');
    }}
  >
    <div>
      <label htmlFor="username">Käyttäjänimi</label>
      <input name="username" type="text" />
    </div>
    <div>
      <label htmlFor="password">Salasana</label>
      <input name="password" type="password" />
    </div>
    <button type="submit">Kirjaudu</button>
  </form>
);
