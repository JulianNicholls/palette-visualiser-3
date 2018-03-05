import React from 'react';

class HSLInput extends React.Component {
  state = {
    colour: this.props.initial,
    index: this.props.index
  };

  handleChange = (event) => {
    const { target } = event;
    const name = target.name;
    const value = target.value;
    const { colour, index } = this.state;

    colour[name] = value;

    this.setState(() => ({ colour }));

    this.props.handleChangeHSL(index, colour);
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState(() => ({ colour: nextProps.initial }));
  }

  render() {
    return (
      <div className="hsl-inputs">
        <input className="hsl-input" type="number" name="h" value={this.state.colour.h} onChange={this.handleChange} />
        <input className="hsl-input" type="number" name="s" value={this.state.colour.s} onChange={this.handleChange} />
        <input className="hsl-input" type="number" name="l" value={this.state.colour.l} onChange={this.handleChange} />
      </div>
    );
  }
}

export default HSLInput;