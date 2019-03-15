import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

// This component has an interesting lifecycle:
// * it is initialized with an RGB value like #67aa7b, which can then be edited
//   and will only update centrally when the length is 7 characters
//   (# + 6 hex digits) because the value is meaningless at other times.
//
// * Concurrently, there are a set of three HSL inputs that update the RGB value,
//   that will now cause a re-rendering of this component, negating the need for
//   getDerivedStateFromProps()

const RGBInput = ({ rgb, index, handleChangeRGB }) => {
  const [value, setValue] = useState(rgb);
  const valueRef = useRef();

  const handleChange = () => {
    let inputValue = valueRef.current.value.toLowerCase();

    if (inputValue[0] !== '#') inputValue = `#${inputValue}`;

    if (/^#[0-9a-f]{0,6}$/.test(value)) {
      setValue(inputValue);

      if (inputValue.length === 7) handleChangeRGB(index, inputValue);
    }
  };

  return (
    <input
      type="text"
      className="rgb-input"
      value={value}
      onChange={handleChange}
      ref={r => (valueRef.current = r)}
    />
  );
};

RGBInput.propTypes = {
  index: PropTypes.number.isRequired,
  rgb: PropTypes.string.isRequired,
  handleChangeRGB: PropTypes.func.isRequired,
};

export default RGBInput;
