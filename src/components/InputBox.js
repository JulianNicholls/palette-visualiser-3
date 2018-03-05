import React from 'react';

import RGBInput from './RGBInput';
import HSLInputs from './HSLInputs';

class InputBox extends React.Component {
  render() {
    const { rgbs, hsls } = this.props;

    return (
      <div id="input-box">
        <span>Colour</span><span>RGB</span><span>HSL</span>
        <label htmlFor="rgb-0">First</label><RGBInput index={0} initial={rgbs[0]} handleChangeRGB={this.props.handleChangeRGB} /><HSLInputs index={0} initial={hsls[0]} handleChangeHSL={this.props.handleChangeHSL} />
        <label htmlFor="rgb-1">Second</label><RGBInput index={1} initial={rgbs[1]} handleChangeRGB={this.props.handleChangeRGB} /><HSLInputs index={1} initial={hsls[1]} handleChangeHSL={this.props.handleChangeHSL} />
        <label htmlFor="rgb-2">Third</label><RGBInput index={2} initial={rgbs[2]} handleChangeRGB={this.props.handleChangeRGB} /><HSLInputs index={2} initial={hsls[2]} handleChangeHSL={this.props.handleChangeHSL} />
        <label htmlFor="rgb-3">Fourth</label><RGBInput index={3} initial={rgbs[3]} handleChangeRGB={this.props.handleChangeRGB} /><HSLInputs index={3} initial={hsls[3]} handleChangeHSL={this.props.handleChangeHSL} />
        <label htmlFor="rgb-4">Fifth</label><RGBInput index={4} initial={rgbs[4]} handleChangeRGB={this.props.handleChangeRGB} /><HSLInputs index={4} initial={hsls[4]} handleChangeHSL={this.props.handleChangeHSL} />
      </div>
    );
  }
}

export default InputBox;
