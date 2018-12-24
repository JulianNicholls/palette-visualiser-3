import React from 'react';

const HSLInput = ({ colour, index, handleChangeHSL }) => {
  const handleChange = event => {
    const { name, value } = event.target;

    colour[name] = value;

    handleChangeHSL(index, colour);
  };

  return (
    <div className="hsl-inputs">
      <input
        className="hsl-input"
        type="number"
        min="0"
        max="360"
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
