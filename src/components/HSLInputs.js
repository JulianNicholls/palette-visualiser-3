import React from 'react';

class RGBInput extends React.Component {
  state = {
    h: '100',
    s: '123',
    l: '201'
  };

  handleChange = (event) => {
    const { target } = event;
    const name = target.name
    const value = target.value;

    this.setState(() => ({ [name]: value }));
  };

  render() {
    return (
      <div className="hsl-inputs">
        <input className="hsl-input" type="number" name="h" value={this.state.h} onChange={this.handleChange} />
        <input className="hsl-input" type="number" name="s" value={this.state.s} onChange={this.handleChange} />
        <input className="hsl-input" type="number" name="l" value={this.state.l} onChange={this.handleChange} />
      </div>
    );
  }
}

export default RGBInput;