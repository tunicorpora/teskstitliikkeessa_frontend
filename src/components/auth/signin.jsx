import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { signIn, editCredentials } from '../../redux/actions/auth';

export default class SignIn extends Component {
  handleEdit(target) {
    this.props.dispatch(editCredentials(target.name, target.value));
  }

  render() {
    const { dispatch, auth } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(signIn(auth.user));
        }}
      >
        <div>
          <label htmlFor="username">Käyttäjänimi</label>
          <input
            onChange={e => this.handleEdit(e.target)}
            name="username"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Salasana</label>
          <input
            onChange={e => this.handleEdit(e.target)}
            name="password"
            type="password"
          />
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
    );
  }
}
