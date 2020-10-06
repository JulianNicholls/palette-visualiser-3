import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { rgbStrToObject, sRGBLuminance, RGBtoHSV } from '../conversions';
import { useColours } from '../context';

import RGBHexInput from './RGBHexInput';
import HSLInput from './HSLInput';

const LABELS = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
  'Tenth',
];

const InputBox = (): JSX.Element => {
  const {
    rgbs,
    hsls,
    changeRGB,
    changeHSL,
    addColour,
    removeColour,
  } = useColours();

  const renderSet = (index: number, label: string): JSX.Element => {
    const rgb = rgbStrToObject(rgbs[index]);
    const hsv = RGBtoHSV(rgb);

    return (
      <Fragment key={index}>
        {rgbs.length > 5 ? (
          <button className="action delete" onClick={() => removeColour(index)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        ) : (
          <span />
        )}
        <label htmlFor={`rgb-${index}`}>{label}</label>
        <RGBHexInput
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
        <div className="three-field">
          <span className="info">{rgb.r}</span>
          <span className="info">{rgb.g}</span>
          <span className="info">{rgb.b}</span>
        </div>
        <span className="info">{sRGBLuminance(rgb).toFixed(3)}</span>
        <div className="three-field">
          <span className="info">{hsv.h}</span>
          <span className="info">{hsv.s}</span>
          <span className="info">{hsv.v}</span>
        </div>
      </Fragment>
    );
  };

  return (
    <section id="input-box">
      <span />
      <span className="first">Colour</span>
      <span>RGB</span>
      <span>Picker</span>
      <span>HSL</span>
      <span>RGB</span>
      <span>sRGB Lum</span>
      <span>HSV</span>

      {rgbs.map((rgb: string, idx: number) =>
        renderSet(idx, idx < LABELS.length ? LABELS[idx] : 'Another')
      )}

      <button className="action span-2" onClick={() => addColour('#000000')}>
        <FontAwesomeIcon icon={faPlusSquare} />
        &nbsp;Add Colour
      </button>
    </section>
  );
};

export default InputBox;
