import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, signout } from './utils';

export default ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        />
      )
    }
  />
);
