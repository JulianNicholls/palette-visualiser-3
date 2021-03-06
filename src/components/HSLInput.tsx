import React from 'react';

interface HSLInputProps {
  colour: HSL;
  index: number;
  handleChangeHSL: (index: number, value: HSL) => void;
}

const limits = {
  h: { max: 359 },
  s: { max: 100 },
  l: { max: 100 },
};

const HSLInput = ({
  colour,
  index,
  handleChangeHSL,
}: HSLInputProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let { name, value: valueStr } = event.target;
    let value = Number(valueStr);

    if (value > limits[name].max) value = limits[name].max;
    else if (value < 0) value = 0;

    colour[name] = value;
    handleChangeHSL(index, colour);
  };

  return (
    <div className="hsl-inputs">
      <input
        className="hsl-input"
        type="number"
        min="0"
        max="359"
        name="h"
        value={colour.h}
        onChange={handleChange}
      />
      <input
        className="hsl-input"
        type="number"
        min="0"
        max="100"
        name="s"
        value={colour.s}
        onChange={handleChange}
      />
      <input
        className="hsl-input"
        type="number"
        min="0"
        max="100"
        name="l"
        value={colour.l}
        onChange={handleChange}
      />
    </div>
  );
};

export default HSLInput;
