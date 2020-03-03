import React, { useState } from 'react';

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

const RGBInput = ({ rgb, index, handleChangeRGB }: RGBInputProps): JSX.Element => {
  const [value, setValue] = useState<string>(rgb);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue: string = e.target.value.toLowerCase();

    if (inputValue[0] !== '#') inputValue = `#${inputValue}`;

    if (/^#[0-9a-f]{0,6}$/.test(inputValue)) {
      setValue(inputValue);

      if (inputValue.length === 7) handleChangeRGB(index, inputValue);
    }
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

export default RGBInput;
