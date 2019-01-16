import React from 'react';
import PropTypes from 'prop-types';

const HSLInput = ({ colour, index, handleChangeHSL }) => {
  const handleChange = event => {
    const { name, value } = event.target;

    colour[name] = Number(value);

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

HSLInput.propTypes = {
  index: PropTypes.number.isRequired,
  colour: PropTypes.shape({
    h: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired,
  }),
  handleChangeHSL: PropTypes.func.isRequired,
};

export default HSLInput;
