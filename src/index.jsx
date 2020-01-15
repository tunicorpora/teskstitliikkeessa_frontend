import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import App from './App';
import DevTools from './DevTools.jsx';
import 'url-search-params-polyfill';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
    {process.env.NODE_ENV !== 'production' && <DevTools />}
  </Provider>,
  document.getElementById('root'),
);
