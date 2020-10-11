import React, { useState } from 'react';
import {useDebounce} from 'react-use'

// This component has an interesting lifecycle:
// * it is initialized with an RGB value like #67aa7b, which can then be edited
//   and will only update centrally when the length is 7 characters
//   (# + 6 hex digits) because the value is meaningless at other times.
//
// * Concurrently, there are a set of three HSL inputs that update the RGB value,
//   that will now cause a re-rendering of this component, negating the need for
//   getDerivedStateFromProps()

const RGBHexInput = ({
  rgb,
  index,
  handleChangeRGB,
}: RGBInputProps): JSX.Element => {
  const [value, setValue] = useState<string>(rgb);

  // Setting a new value centrally is now split into two parts, allowing a
  // 600ms grace period after it matches #rrggbb
  useDebounce(() => {
    if (value.length === 7) handleChangeRGB(index, value);
  }, 600, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value.toLowerCase();

    if (inputValue[0] !== '#') inputValue = `#${inputValue}`;

    if (/^#[0-9a-f]{0,6}$/.test(inputValue)) setValue(inputValue);
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

export default RGBHexInput;
