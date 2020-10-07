import React, { useState } from 'react';

import { rgbStrToObject, rgbObjectToStr } from '../conversions';

// This component has an interesting lifecycle:
// * it is initialized with an RGB value like #67aa7b, which can then be edited
//   and will only update centrally when the length is 7 characters
//   (# + 6 hex digits) because the value is meaningless at other times.
//
// * Concurrently, there are a set of three HSL inputs that update the RGB value,
//   that will now cause a re-rendering of this component, negating the need for
//   getDerivedStateFromProps()

interface RGBInputProps {
  rgb: string;
  index: number;
  handleChangeRGB: (index: number, value: string) => void;
}

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
    const parts = inputValue.match(/(\d{1,3}),?\s*(\d{1,3}),?\s*(\d{1,3})/);

    console.log({ inputValue, parts });
    if (parts) {
      const values = parts.slice(1, 4).map((part) => parseInt(part, 10));
      const rgbStr = rgbObjectToStr({ r: values[0], g: values[1], b: values[2] });

      console.log({ values, rgbStr });
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
