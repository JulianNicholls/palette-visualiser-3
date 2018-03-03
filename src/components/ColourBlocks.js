import React from 'react';

class ColourBlocks extends React.Component {
  state = {
    colours: ['#000000', ...this.props.rgbs, '#FFFFFF']
  }

  renderBlocks() {
    const { colours } = this.state;
    const headers = ['Black', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'White'];
    const blocks = [];

    for (let bg = 0; bg < colours.length; ++bg) {
      blocks.push(<span className="line" key={bg} > {headers[bg]}</ span>);
      for (let fg = 0; fg < colours.length; ++fg) {
        blocks.push(this.renderBlock(colours[bg], colours[fg], 4.36, `${bg}${fg}`));
      }
    }

    return blocks;
  }

  renderBlock(bg, fg, cr, key) {
    return (
      <div className="block" key={key} style={{ background: `${bg}`, color: `${fg}` }}>
        bg: {bg}<br />
        fg: {fg}<br />
        cr: {cr}:1
      </div>
    );
  }

  render() {
    return (
      <div id="colour-blocks">
        <span></span><span>Black</span> <span>First</span> <span>Second</span> <span>Third</span> <span>Fourth</span> <span>Fifth</span> <span>White</span>
        {this.renderBlocks()}
      </div>
    );
  }
};

export default ColourBlocks;