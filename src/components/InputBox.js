import React from 'react';

import RGBInput from './RGBInput';
import HSLInputs from './HSLInputs';

class InputBox extends React.Component {
  renderSet(index, label) {
    const { rgbs, hsls } = this.props;

    return (
      <React.Fragment>
        <label htmlFor={`rgb-${index}`}>{label}</label>
        <RGBInput
          index={index}
          initial={rgbs[index]}
          handleChangeRGB={this.props.handleChangeRGB}
        />
        <div className="swatch" style={{ background: rgbs[index] }} />
        <HSLInputs
          index={index}
          initial={hsls[index]}
          handleChangeHSL={this.props.handleChangeHSL}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div id="input-box">
        <span>Colour</span>
        <span>RGB</span>
        <span />
        <span>HSL</span>

        {this.renderSet(0, 'First')}
        {this.renderSet(1, 'Second')}
        {this.renderSet(2, 'Third')}
        {this.renderSet(3, 'Fourth')}
        {this.renderSet(4, 'Fifth')}
      </div>
    );
  }
}

export default InputBox;
