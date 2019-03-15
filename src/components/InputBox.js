import React, { Fragment, useContext } from 'react';

import { ColourContext, CHANGE_RGB, CHANGE_HSL } from '../context';

import RGBInput from './RGBInput';
import HSLInput from './HSLInput';

const LABELS = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

const InputBox = () => {
  const { rgbs, hsls, dispatch } = useContext(ColourContext);

  const renderSet = (index, label) => {
    return (
      <Fragment key={index}>
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
      </Fragment>
    );
  };

  return (
    <div id="input-box">
      <span className="first">Colour</span>
      <span>RGB</span>
      <span>Picker</span>
      <span>HSL</span>

      {LABELS.map((label, idx) => renderSet(idx, label))}
    </div>
  );
};

export default InputBox;
