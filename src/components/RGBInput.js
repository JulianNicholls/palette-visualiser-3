import React from 'react';

class RGBInput extends React.Component {
  state = {
    value: this.props.initial,
    index: this.props.index
  };

  handleChange = () => {
    let value = this.valueRef.value.toUpperCase();

    if (value[0] !== '#') value = `#${value}`;

    if (/^#[0-9A-F]{0,6}$/.test(value)) {
      this.setState(() => ({ value }));

      if (value.length === 7) this.props.handleChangeRGB(this.state.index, value);
    }
  };

  static getDerivedStateFromProps = newProps => {
    return { value: newProps.initial };
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
        ref={r => (this.valueRef = r)}
      />
    );
  }
}

export default RGBInput;
