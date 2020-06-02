import React from 'react';

import { useColours } from '../context';
import ColourBlock from './ColourBlock';

const HEADERS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Black', 'White'];

const ColourBlocks = (): JSX.Element => {
  const { rgbs, selectColour } = useColours();

  const renderBlocks = (): Array<JSX.Element> => {
    const colours = [...rgbs.slice(0, 5), '#000000', '#ffffff'];
    const blocks: Array<JSX.Element> = [];

    colours.forEach((bgStr: string, bg: number) => {
      blocks.push(
        <span className="line" key={bg}>
          {HEADERS[bg]}
        </span>
      );

      colours.forEach((fgStr: string, fg: number) => {
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
