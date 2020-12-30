import React from 'react';

import { AAThreshold } from '../conversions';

// Luminance of Black and White + 0.05 for the contrast calculation
const BLACK: number = 0.05;
const WHITE: number = 1.05;

interface CLLProps {
  name: string;
  value: string;
  luminance: number;
  click: (colour: string) => void;
}

const ColourListLine = ({
  name,
  value,
  luminance,
  click,
}: CLLProps): JSX.Element => {
  const blackRatio: number = (luminance + 0.05) / BLACK;
  const whiteRatio: number = WHITE / (luminance + 0.05);

  // Choose the colour for the name based on the better ratio
  const nameColour: string = blackRatio > whiteRatio ? 'black' : 'white';

  // Display black and white on the colour, if the ratio is good then use
  // black or white, otherwise use a mid-grey, biased toward the opposite
  const blackColour: string = blackRatio > AAThreshold ? 'black' : '#a0a0a0';
  const whiteColour: string = whiteRatio > AAThreshold ? 'white' : '#505050';

  const baseStyle = { background: value, color: nameColour };

  return (
    <>
      <div
        key={name}
        className="html-colour-list__colour-name"
        style={baseStyle}
        onClick={() => click(value)}
        title="Add to palette"
      >
        {name}
      </div>
      <div key={value} style={baseStyle}>
        {value}
      </div>
      <div key={`${name}-luminance`} style={baseStyle}>
        {luminance.toFixed(3)}
      </div>
      <div
        key={`${name}-black-ratio`}
        style={{ background: value, color: blackColour }}
      >
        Black {blackRatio.toFixed(2)}:1
      </div>
      <div
        key={`${name}-white-ratio`}
        style={{ background: value, color: whiteColour }}
      >
        White {whiteRatio.toFixed(2)}:1
      </div>
    </>
  );
};

export default ColourListLine;
