import React from 'react';

class RGBInput extends React.Component {
  state = {
    value: this.props.initial,
    index: this.props.index
  };

  handleChange = event => {
    let value = event.target.value;

    if (value[0] !== '#') value = `#${value}`;

    this.setState(() => ({ value }));

    this.props.handleChangeRGB(this.state.index, value);
  };

  componentWillReceiveProps = newProps => {
    this.setState(() => ({ value: newProps.initial }));
  };

  render() {
    const { index } = this.props;

    return (
      <input
        type="text"
        className="rgb-input"
        value={this.state.value}
        onChange={this.handleChange}
        autoFocus={index === 0}
      />
    );
  }
}

export default RGBInput;
