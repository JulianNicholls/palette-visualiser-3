import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { Provider } from './context';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
