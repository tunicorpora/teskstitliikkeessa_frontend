import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from './DevTools.jsx';
import 'url-search-params-polyfill';

const store = configureStore({
  authorlist: [],
  contributionlist: { data: [], meta: [] },
  uploadStatus: null,
  rowEdit: { id: null },
  colEdit: { name: null, newname: null },
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
