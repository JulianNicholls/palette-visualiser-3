import React, { useState } from 'react';

import { rgbStrToObject, rgbObjectToStr } from '../conversions';

// This component has the same lifecycle as RGBHexInput:

const RGB3Input = ({
  rgb,
  index,
  handleChangeRGB,
}: RGBInputProps): JSX.Element => {
  const [value, setValue] = useState<string>(() => {
    const rgbo = rgbStrToObject(rgb);

    return `${rgbo.r}, ${rgbo.g}, ${rgbo.b}`;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    const parts = inputValue.match(/(\d{1,3})[, ]+(\d{1,3})[, ]+(\d{1,3})/);

    if (parts) {
      const values = parts.slice(1, 4).map((part) => parseInt(part, 10));
      const rgbStr = rgbObjectToStr({ r: values[0], g: values[1], b: values[2] });

      handleChangeRGB(index, rgbStr);
    }

    setValue(inputValue);
  };

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
