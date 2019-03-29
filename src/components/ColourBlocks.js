import React, { useContext } from 'react';

import { ColourContext } from '../context';

import {
  ratioThreshold,
  largeThreshold,
  rgbStrToObject,
  contrastRatio,
} from '../conversions';

const HEADERS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Black', 'White'];

const ColourBlocks = () => {
  const { rgbs, selectColour } = useContext(ColourContext);

  const ratio = (bg, fg) => {
    const bga = rgbStrToObject(bg);
    const fga = rgbStrToObject(fg);

    return contrastRatio(bga, fga).toFixed(2);
  };

  const renderBlocks = () => {
    const colours = [...rgbs, '#000000', '#ffffff'];
    const blocks = [];

    colours.forEach((bgStr, bg) => {
      blocks.push(
        <span className="line" key={bg}>
          {HEADERS[bg]}
        </span>
      );

      colours.forEach((fgStr, fg) => {
        const cr = ratio(bgStr, fgStr);
        let bgCol, fgCol, title;

        if (fgStr === bgStr) {
          bgCol = '#333'; // Grey and invisible
          fgCol = '#333';
        } else if (cr >= ratioThreshold) {
          bgCol = bgStr; // Selected colours
          fgCol = fgStr;
        } else if (cr >= largeThreshold) {
          bgCol = '#707070'; // Light Grey, sufficiently contrasted
          fgCol = '#f5f5f5';
          title = 'Sufficient contrast for large text';
        } else {
          bgCol = '#555'; // Grey, but sufficiently contrasted
          fgCol = '#ccc';
          title = 'Insufficient contrast';
        }

        blocks.push(
          renderBlock(bgCol, fgCol, bgStr, fgStr, cr, title, `${bg}${fg}`)
        );
      });
    });

    return blocks;
  };

  const renderBlock = (bgCol, fgCol, bgStr, fgStr, cr, title, key) => {
    return (
      <div
        className="block"
        key={key}
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
        </p>
      </div>
    );
  };

  return (
    <section id="colour-blocks">
      <span />
      {HEADERS.map((text, idx) => (
        <span key={idx}>{text}</span>
      ))}
      {renderBlocks()}
    </section>
  );
};

export default ColourBlocks;
