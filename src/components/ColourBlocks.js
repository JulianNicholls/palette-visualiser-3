import React from 'react';

import { CONST, rgbStrToObject, contrastRatio } from '../conversions';

const HEADERS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Black', 'White'];

class ColourBlocks extends React.Component {
  contrastRatio(bg, fg) {
    const bga = rgbStrToObject(bg);
    const fga = rgbStrToObject(fg);

    return contrastRatio(bga, fga).toFixed(2);
  }

  renderBlocks() {
    const colours = [...this.props.rgbs, '#000000', '#FFFFFF'];
    const blocks = [];

    colours.forEach((bgStr, bg) => {
      blocks.push(
        <span className="line" key={bg}>
          {HEADERS[bg]}
        </span>
      );

      colours.forEach((fgStr, fg) => {
        const cr = this.contrastRatio(bgStr, fgStr);
        let bgCol, fgCol;

        if (fgStr === bgStr) {
          bgCol = '#333'; // Grey and invisible
          fgCol = '#333';
        } else if (cr >= CONST.ratio_threshold) {
          bgCol = bgStr; // Selected colours
          fgCol = fgStr;
        } else {
          bgCol = '#555'; // Grey, but sufficiently contrasted
          fgCol = '#ccc';
        }

        blocks.push(this.renderBlock(bgCol, fgCol, bgStr, fgStr, cr, `${bg}${fg}`));
      });
    });

    return blocks;
  }

  renderBlock(bgCol, fgCol, bgStr, fgStr, cr, key) {
    return (
      <div
        className="block"
        key={key}
        style={{ background: bgCol, color: fgCol }}
        onClick={() => this.props.selectColour(bgStr, fgStr)}
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
