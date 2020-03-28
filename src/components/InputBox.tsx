import React, { Fragment } from 'react';

import { useColours } from '../context';

import RGBInput from './RGBInput';
import HSLInput from './HSLInput';

const LABELS = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

const InputBox = (): JSX.Element => {
  const { rgbs, hsls, changeRGB, changeHSL } = useColours();

  const renderSet = (index: number, label: string): JSX.Element => {
    return (
      <Fragment key={index}>
        <label htmlFor={`rgb-${index}`}>{label}</label>
        <RGBInput
          key={rgbs[index]}
          index={index}
          rgb={rgbs[index]}
          handleChangeRGB={(index: number, value: string) =>
            changeRGB(index, value)
          }
        />
        <input
          type="color"
          className="swatch"
          value={rgbs[index]}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            changeRGB(index, event.target.value)
          }
        />
        <HSLInput
          index={index}
          colour={hsls[index]}
          handleChangeHSL={(index: number, value: HSL) => changeHSL(index, value)}
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
