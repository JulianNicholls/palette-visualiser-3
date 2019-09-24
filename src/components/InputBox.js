import React, { Fragment } from 'react';

import { useColours } from '../context';

import RGBInput from './RGBInput';
import HSLInput from './HSLInput';

const LABELS = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

const InputBox = () => {
  const { rgbs, hsls, changeRGB, changeHSL } = useColours();

  const renderSet = (index, label) => {
    return (
      <Fragment key={index}>
        <label htmlFor={`rgb-${index}`}>{label}</label>
        <RGBInput
          key={rgbs[index]}
          index={index}
          rgb={rgbs[index]}
          handleChangeRGB={(index, value) => changeRGB(index, value)}
        />
        <input
          type="color"
          className="swatch"
          value={rgbs[index]}
          onChange={event => changeRGB(index, event.target.value)}
        />
        <HSLInput
          index={index}
          colour={hsls[index]}
          handleChangeHSL={(index, value) => changeHSL(index, value)}
        />
      </Fragment>
    );
  };

  return (
    <section id="input-box">
      <span className="first">Colour</span>
      <span>RGB</span>
      <span>Picker</span>
      <span>HSL</span>

      {LABELS.map((label, idx) => renderSet(idx, label))}
    </section>
  );
};

export default InputBox;
