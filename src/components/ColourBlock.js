import React from 'react';
import PropTypes from 'prop-types';

import {
  AAAThreshold,
  AAThreshold,
  largeThreshold,
  rgbStrToObject,
  contrastRatio,
} from '../conversions';

const ColourBlock = ({ bgStr, fgStr, selectColour }) => {
  const ratio = (bg, fg) => {
    const bga = rgbStrToObject(bg);
    const fga = rgbStrToObject(fg);

    return contrastRatio(bga, fga).toFixed(2);
  };

  const cr = ratio(bgStr, fgStr);
  let bgCol = bgStr;
  let fgCol = fgStr;
  let AAAText = '';
  let AAText = '';
  let title;

  if (fgStr === bgStr) {
    bgCol = '#333'; // Grey and invisible
    fgCol = '#333';
  } else if (cr >= AAAThreshold) {
    AAAText = 'AAA Large/Normal';
    AAText = 'AA Large/Normal';
  } else if (cr >= AAThreshold) {
    bgCol = bgStr; // Selected colours
    fgCol = fgStr;
    AAAText = 'AAA Large';
    AAText = 'AA Large/Normal';
  } else if (cr >= largeThreshold) {
    bgCol = '#707070'; // Light Grey, sufficiently contrasted
    fgCol = '#f5f5f5';
    AAText = 'AA Large';
    title = 'Sufficient contrast for large text';
  } else {
    bgCol = '#555'; // Grey, but sufficiently contrasted
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
        {cr}:1
        <br />
        <span className="access">&nbsp;{AAAText}</span>
        <br />
        <span className="access">&nbsp;{AAText || ' '}</span>
      </p>
    </div>
  );
};

ColourBlock.propTypes = {
  bgStr: PropTypes.string.isRequired,
  fgStr: PropTypes.string.isRequired,
  selectColour: PropTypes.func.isRequired,
};
