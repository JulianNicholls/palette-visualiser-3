import React from 'react';

import { CONST, rgbStrToArray, contrastRatio } from '../conversions';

const HEADERS = ['Black', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'White'];

class ColourBlocks extends React.Component {
  contrastRatio(bg, fg) {
    const bga = rgbStrToArray(bg);
    const fga = rgbStrToArray(fg);

    return contrastRatio(bga, fga);
  }

  renderBlocks() {
    const colours = ['#000000', ...this.props.rgbs, '#FFFFFF'];
    const blocks = [];

    for (let bg = 0; bg < colours.length; ++bg) {
      const bgStr = colours[bg];
      blocks.push(
        <span className="line" key={bg}>
          {HEADERS[bg]}
        </span>
      );

      for (let fg = 0; fg < colours.length; ++fg) {
        const fgStr = colours[fg];
        const cr = this.contrastRatio(bgStr, fgStr);
        let bgCol, fgCol;

        if (fgStr === bgStr) {
          bgCol = '#555'; // Grey and invisible
          fgCol = '#555';
        } else if (cr >= CONST.ratio_threshold) {
          bgCol = bgStr; // Selected colours
          fgCol = fgStr;
        } else {
          bgCol = '#555'; // Grey, but sufficiently contrasted
          fgCol = '#ccc';
        }

        blocks.push(this.renderBlock(bgCol, fgCol, bgStr, fgStr, cr, `${bg}${fg}`));
      }
    }

    return blocks;
  }

  renderBlock(bgCol, fgCol, bgStr, fgStr, cr, key) {
    return (
      <div
        className="block"
        key={key}
        style={{ background: `${bgCol}`, color: `${fgCol}` }}
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
  }

  render() {
    return (
      <div id="colour-blocks">
        <span />
        {HEADERS.map((text, idx) => <span key={idx}>{text}</span>)}
        {this.renderBlocks()}
      </div>
    );
  }
}

export default ColourBlocks;
