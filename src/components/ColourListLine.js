import React from 'react';
import PropTypes from 'prop-types';

import { ratioThreshold } from '../conversions';

// Luminance of Black and White + 0.05 for the contrast calculation
const BLACK = 0.05;
const WHITE = 1.05;

const ColourListLine = ({ name, value, luminance }) => {
  const blackRatio = (luminance + 0.05) / BLACK;
  const whiteRatio = WHITE / (luminance + 0.05);

  // Choose the colour for the name based on the better ratio
  const nameColour = blackRatio > whiteRatio ? 'black' : 'white';

  // Display black and white on the colour, if the ratio is good then use
  // black or white, otherwise use a mid-grey, biased toward the opposite
  const blackColour = blackRatio > ratioThreshold ? 'black' : '#b0b0b0';
  const whiteColour = whiteRatio > ratioThreshold ? 'white' : '#505050';

  const baseStyle = { background: value, color: nameColour };

  return [
    <div key={name} style={baseStyle}>{name}</div>,
    <div key={value} style={baseStyle}>{value}</div>,
    <div key={`${name}-luminance`} style={baseStyle}>
      {luminance.toFixed(3)}
    </div>,
    <div
      key={`${name}-black-ratio`}
      style={{ background: value, color: blackColour }}
    >
      Black {blackRatio.toFixed(2)}:1
    </div>,
    <div
      key={`${name}-white-ratio`}
      style={{ background: value, color: whiteColour }}
    >
      White {whiteRatio.toFixed(2)}:1
    </div>,
  ];
};

ColourListLine.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  luminance: PropTypes.number.isRequired,
};

export default ColourListLine;
