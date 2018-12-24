import React from 'react';

import { Consumer, CHANGE_RGB, CHANGE_HSL } from '../context';

import RGBInput from './RGBInput';
import HSLInput from './HSLInput';

const LABELS = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

const InputBox = () => {
  return (
    <Consumer>
      {({ rgbs, hsls, dispatch }) => {
        const renderSet = (index, label, rgbs, hsls) => {
          return (
            <React.Fragment key={index}>
              <label htmlFor={`rgb-${index}`}>{label}</label>
              <RGBInput
                key={rgbs[index]}
                index={index}
                rgb={rgbs[index]}
                handleChangeRGB={(index, value) =>
                  dispatch({ type: CHANGE_RGB, index, value })
                }
              />
              <input
                type="color"
                className="swatch"
                value={rgbs[index]}
                onChange={event =>
                  dispatch({ type: CHANGE_RGB, index, value: event.target.value })
                }
              />
              <HSLInput
                index={index}
                colour={hsls[index]}
                handleChangeHSL={(index, value) =>
                  dispatch({ type: CHANGE_HSL, index, value })
                }
              />
            </React.Fragment>
          );
        };

        return (
          <div id="input-box">
            <span className="first">Colour</span>
            <span>RGB</span>
            <span>Picker</span>
            <span>HSL</span>

            {LABELS.map((label, idx) => renderSet(idx, label, rgbs, hsls))}
          </div>
        );
      }}
    </Consumer>
  );
};

export default InputBox;
