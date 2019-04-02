import React, { useContext } from 'react';

import { ColourContext } from '../context';
import ColourBlock from './ColourBlock';

const HEADERS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Black', 'White'];

const ColourBlocks = () => {
  const { rgbs, selectColour } = useContext(ColourContext);

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
        blocks.push(
          <ColourBlock
            bgStr={bgStr}
            fgStr={fgStr}
            key={`${bg}${fg}`}
            selectColour={selectColour}
          />
        );
      });
    });

    return blocks;
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
