import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store';
import Board from './Board';

const store = createStore();

export default () => (
  <Provider store={store}>
    <Board />
  </Provider>
);
