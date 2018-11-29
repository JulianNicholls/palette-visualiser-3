import React from 'react';

// This component has an interesting lifecycle:
// * it is initialized with an RGB value like #67AA78, which can then be edited
//   and will only update centrally when the length is 7 characters
//   (# + 6 hex digits) because the value is meaningless at other times.
//
// * Concurrently, there are a set of three HSL inputs that update the RGB value,
//   that will now cause a re-rendering of this component, negating the need for
//   getDerivedStateFromProps()

class RGBInput extends React.Component {
  state = {
    value: this.props.rgb
  };

  handleChange = () => {
    const { handleChangeRGB, index } = this.props;

    let value = this.valueRef.value.toLowerCase();

    if (value[0] !== '#') value = `#${value}`;

    if (/^#[0-9a-f]{0,6}$/.test(value)) {
      this.setState(() => ({ value }));

      if (value.length === 7) handleChangeRGB(index, value);
    }
  };

  render() {
    return (
      <input
        type="text"
        className="rgb-input"
        value={this.state.value}
        onChange={this.handleChange}
        ref={r => (this.valueRef = r)}
      />
    );
  }
}

export default RGBInput;
