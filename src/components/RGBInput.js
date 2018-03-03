import React from 'react';

class RGBInput extends React.Component {
  state = {
    value: '#336699'
  }

  handleChange = event => {
    let value = event.target.value;

    if (value[0] !== '#') value = `#${value}`;

    this.setState(() => ({ value }))
  };

  render() {
    return (
      <input className="rgb-input" type="text" value={this.state.value} onChange={this.handleChange} />
    );
  }
}

export default RGBInput;