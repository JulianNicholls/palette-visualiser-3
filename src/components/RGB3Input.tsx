import React, { useState } from 'react';
import {useDebounce } from 'react-use';

import { rgbStrToObject, rgbObjectToStr } from '../conversions';

// This component has the same lifecycle as RGBHexInput.

const RGB3Input = ({
  rgb,
  index,
  handleChangeRGB,
}: RGBInputProps): JSX.Element => {
  const [value, setValue] = useState<string>(() => {
    const rgbo = rgbStrToObject(rgb);

    return `${rgbo.r}, ${rgbo.g}, ${rgbo.b}`;
  });

  // Allow 600ms before updating the RGB colour centrally, otherwise the
  // millisecond that it matches rrr, ggg, bbb it will be snatched.
  useDebounce(() => {
    const parts = value.split(/[, ]+/);

    if (parts.length === 3) {
      const values = parts.map((part) => parseInt(part, 10));
      const rgbStr = rgbObjectToStr({ r: values[0], g: values[1], b: values[2] });

      handleChangeRGB(index, rgbStr);
    }
  }, 600, [value])

  // Update the value, as long as the entered text has only good characters
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const entered = e.target.value;

    if (/^[0-9, ]*$/.test(entered))
      setValue(entered);
  }

  return (
    <input
      id={`rgb-${index}`}
      type="text"
      className="rgb-input"
      value={value}
      onChange={handleChange}
    />
  );
};

export default RGB3Input;
