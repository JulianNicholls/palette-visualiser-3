import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { ColourProvider } from './context';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(
  <ColourProvider>
    <App />
  </ColourProvider>,
  document.getElementById('root')
);
