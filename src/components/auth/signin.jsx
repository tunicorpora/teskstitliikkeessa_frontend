import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { signIn, editCredentials } from '../../redux/actions/auth';
import { isAuthenticated } from '../auth/utils';
import styles from './signin_styles.scss';
import general_styles from '../main/general_styles.scss';

export default class SignIn extends Component {
  handleEdit(target) {
    this.props.dispatch(editCredentials(target.name, target.value));
  }

  render() {
    const { dispatch, auth } = this.props;

    if (isAuthenticated()) {
      return <div>Muokkausoikeudet käytössä.</div>;
    }

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(signIn(auth));
        }}
      >
        <div className={styles.fieldContainer}>
          <div>
            <label htmlFor="username">Käyttäjänimi</label>
          </div>
          <div>
            <input onChange={e => this.handleEdit(e.target)} name="username" type="text" />
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div>
            <label htmlFor="password">Salasana</label>
          </div>
          <div>
            <input onChange={e => this.handleEdit(e.target)} name="password" type="password" />
          </div>
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
    );
  }
}
