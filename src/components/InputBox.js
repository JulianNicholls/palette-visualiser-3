import React from 'react';

import { Consumer, CHANGE_RGB, CHANGE_HSL } from '../context';

import RGBInput from './RGBInput';
import HSLInput from './HSLInput';

class InputBox extends React.Component {
  renderSet(index, label, rgbs, hsls, dispatch) {
    return (
      <React.Fragment>
        <label htmlFor={`rgb-${index}`}>{label}</label>
        <RGBInput
          index={index}
          rgb={rgbs[index]}
          handleChangeRGB={this.handleChangeRGB}
        />
        <div className="swatch" style={{ background: rgbs[index] }} />
        <HSLInput
          index={index}
          colour={hsls[index]}
          handleChangeHSL={this.handleChangeHSL}
        />
      </React.Fragment>
    );
  }

  handleChangeRGB = (index, value) => {
    this.dispatch({ type: CHANGE_RGB, index, value });
  };

  handleChangeHSL = (index, value) => {
    this.dispatch({ type: CHANGE_HSL, index, value });
  };

  render() {
    return (
      <Consumer>
        {({ rgbs, hsls, dispatch }) => {
          this.dispatch = dispatch;

          return (
            <div id="input-box">
              <span className="first">Colour</span>
              <span>RGB</span>
              <span />
              <span>HSL</span>

              {this.renderSet(0, 'First', rgbs, hsls, dispatch)}
              {this.renderSet(1, 'Second', rgbs, hsls, dispatch)}
              {this.renderSet(2, 'Third', rgbs, hsls, dispatch)}
              {this.renderSet(3, 'Fourth', rgbs, hsls, dispatch)}
              {this.renderSet(4, 'Fifth', rgbs, hsls, dispatch)}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default InputBox;
