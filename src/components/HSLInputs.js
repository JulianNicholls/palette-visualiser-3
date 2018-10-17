import React from 'react';

class HSLInput extends React.Component {
  handleChange = event => {
    const { name, value } = event.target;
    const { colour, index } = this.props;

    colour[name] = value;

    this.props.handleChangeHSL(index, colour);
  };

  render() {
    const { colour } = this.props;

    return (
      <div className="hsl-inputs">
        <input
          className="hsl-input"
          type="number"
          min="0"
          max="360"
          name="h"
          value={colour.h}
          onChange={this.handleChange}
        />
        <input
          className="hsl-input"
          type="number"
          min="0"
          max="100"
          name="s"
          value={colour.s}
          onChange={this.handleChange}
        />
        <input
          className="hsl-input"
          type="number"
          min="0"
          max="100"
          name="l"
          value={colour.l}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default HSLInput;
