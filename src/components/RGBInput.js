import React from 'react';

// This component has an interesting lifecycle:
// * it is initialized with an RGB value like #67AA78, which can then be edited
//   and will only update centrally when the length is 7 characters
//   (# + 6 hex digits) because the value is meaningless at other times.
//
// * Concurrently, there are a set of three HSL inputs that update the RGB
//   value, which will come through as new props,
//   triggering getDerivedStateFromProps().
//
// * During editing here, getDerivedStateFromProps() will also fire, but not
//   with a new value, so it needs to be ignored

class RGBInput extends React.Component {
  state = {
    value: undefined,
    previous: undefined,
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

  static getDerivedStateFromProps = (newProps, state) => {
    if (newProps.initial !== state.previous)
      return { value: newProps.initial, previous: newProps.initial };

    return null;
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
