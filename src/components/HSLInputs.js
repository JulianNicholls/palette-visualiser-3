import React from 'react';

class HSLInput extends React.Component {
  state = {
    colour: this.props.initial,
    index: this.props.index
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { colour, index } = this.state;

    colour[name] = value;

    this.setState(() => ({ colour }));

    this.props.handleChangeHSL(index, colour);
  };

  static getDerivedStateFromProps = nextProps => {
    return { colour: nextProps.initial };
  };

  render() {
    return (
      <div className="hsl-inputs">
        <input
          className="hsl-input"
          type="number"
          min="0"
          max="360"
          name="h"
          value={this.state.colour.h}
          onChange={this.handleChange}
        />
        <input
          className="hsl-input"
          type="number"
          min="0"
          max="100"
          name="s"
          value={this.state.colour.s}
          onChange={this.handleChange}
        />
        <input
          className="hsl-input"
          type="number"
          min="0"
          max="100"
          name="l"
          value={this.state.colour.l}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default HSLInput;
