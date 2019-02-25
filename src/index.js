import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from './DevTools.jsx';
import 'url-search-params-polyfill';

const store = configureStore({
  authorlist: [],
  contributionlist: [],
  uploadStatus: 'none',
  rowEdit: { id: null },
  auth: { user: {}, status: '' },
  contributionfilters: [],
  contributioncolnames: { all: [], active: [] },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
    {process.env.NODE_ENV !== 'production' && <DevTools />}
  </Provider>,
  document.getElementById('root')
);
