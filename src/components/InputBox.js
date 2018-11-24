import React from 'react';

import { Consumer, CHANGE_RGB, CHANGE_HSL } from '../context';

import RGBInput from './RGBInput';
import HSLInput from './HSLInput';

const LABELS = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

class InputBox extends React.Component {
  renderSet(index, label, rgbs, hsls) {
    return (
      <React.Fragment key={index}>
        <label htmlFor={`rgb-${index}`}>{label}</label>
        <RGBInput
          key={rgbs[index]}
          index={index}
          rgb={rgbs[index]}
          handleChangeRGB={(index, value) =>
            this.dispatch({ type: CHANGE_RGB, index, value })
          }
        />
        <input
          type="color"
          className="swatch"
          value={rgbs[index]}
          onChange={event =>
            this.dispatch({ type: CHANGE_RGB, index, value: event.target.value })
          }
        />
        <HSLInput
          index={index}
          colour={hsls[index]}
          handleChangeHSL={(index, value) =>
            this.dispatch({ type: CHANGE_HSL, index, value })
          }
        />
      </React.Fragment>
    );
  }

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

              {LABELS.map((label, idx) => this.renderSet(idx, label, rgbs, hsls))}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default InputBox;
