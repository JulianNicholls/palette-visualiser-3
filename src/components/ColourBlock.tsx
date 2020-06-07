import React from 'react';

import { useColours } from '../context';

import {
  AAAThreshold,
  AAThreshold,
  largeThreshold,
  rgbStrToObject,
  contrastRatio,
} from '../conversions';

const AA_LargeNormal = 'AA Large/Normal';

interface ColourBlockProps {
  bgStr: string;
  fgStr: string;
}

const ColourBlock = ({ bgStr, fgStr }: ColourBlockProps): JSX.Element => {
  const { selectColour } = useColours();

  const ratio = (bg: string, fg: string): number => {
    const bga = rgbStrToObject(bg);
    const fga = rgbStrToObject(fg);

    return contrastRatio(bga, fga);
  };

  const cr = ratio(bgStr, fgStr);
  let bgCol = bgStr;
  let fgCol = fgStr;
  let AAAText = '';
  let AAText = '';
  let title = '';

  if (fgStr === bgStr) {
    bgCol = '#333'; // Dark Grey and invisible
    fgCol = '#333';
  } else if (cr >= AAAThreshold) {
    AAAText = 'AAA Large/Normal';
    AAText = AA_LargeNormal;
  } else if (cr >= AAThreshold) {
    AAAText = 'AAA Large';
    AAText = AA_LargeNormal;
  } else if (cr >= largeThreshold) {
    bgCol = '#707070'; // Light Grey, sufficiently contrasted
    fgCol = '#f5f5f5';
    AAText = 'AA Large';
    title = 'Sufficient contrast for large text (18 point or 14 point bold)';
  } else {
    bgCol = '#555'; // Mid-Grey, still sufficiently contrasted
    fgCol = '#ccc';
    title = 'Insufficient contrast';
  }

  return (
    <div
      className="block"
      style={{ background: bgCol, color: fgCol }}
      title={title}
      onClick={() => selectColour(bgStr, fgStr)}
    >
      <p>
        {bgStr}
        <br />
        {fgStr}
        <br />
        {cr.toFixed(2)}:1
        <br />
        <span className="access">&nbsp;{AAAText}</span>
        <br />
        <span className="access">&nbsp;{AAText || ' '}</span>
      </p>
    </div>
  );
};

export default ColourBlock;
