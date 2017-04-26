import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store';
import Table from './Table';

const store = createStore();

export default () => (
  <Provider store={store}>
    <Table />
  </Provider>
);
