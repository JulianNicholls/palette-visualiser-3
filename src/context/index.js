import React, { Component } from 'react';

import {
  rgbStrToObject,
  rgbObjectToStr,
  RGBtoHSL,
  HSLtoRGB
} from '../conversions';

const LS_KEY = 'pv31';

const Context = React.createContext();

export const SELECT_COLOUR = 'SELECT_COLOUR';
export const CHANGE_RGB = 'CHANGE_RGB';
export const CHANGE_HSL = 'CHANGE_HSL';

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_RGB: {
      const { rgbs, hsls } = state;
      const { index, value } = action;

      rgbs[index] = value;
      hsls[index] = RGBtoHSL(rgbStrToObject(value));
      localStorage.setItem(LS_KEY, JSON.stringify(rgbs));

      return { rgbs, hsls };
    }

    case CHANGE_HSL: {
      const { rgbs, hsls } = state;
      const { index, value } = action;

      const rgb = HSLtoRGB(value);

      hsls[index] = value;
      rgbs[index] = rgbObjectToStr(rgb);
      localStorage.setItem(LS_KEY, JSON.stringify(rgbs));

      return { hsls, rgbs };
    }

    case SELECT_COLOUR:
      return { selectedBG: action.bg, selectedFG: action.fg };

    default:
      return state;
  }
};

const HSLsFromRGBs = rgbs => {
  const hsls = [];

  for (let idx = 0; idx < rgbs.length; ++idx) {
    hsls[idx] = RGBtoHSL(rgbStrToObject(rgbs[idx]));
  }

  return hsls;
};

export class Provider extends Component {
  constructor(props) {
    super(props);

    const saveData = localStorage.getItem(LS_KEY);

    const rgbs = saveData
      ? JSON.parse(saveData)
      : ['#336699', '#669933', '#996633', '#663399', '#339966'];

    this.state = {
      rgbs,
      hsls: HSLsFromRGBs(rgbs),
      selectedBG: '#000000',
      selectedFG: '#ffffff',
      dispatch: action => this.setState(state => reducer(state, action))
    };
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
