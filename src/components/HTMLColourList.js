import React from 'react';
import PropTypes from 'prop-types';

import HTMLColours from '../HTMLColours';
import XKCDColours from '../XKCDColours';

import { ratioThreshold, rgbStrToObject, sRGBLuminance } from '../conversions';

// Luminance of Black and White + 0.05 for the contrast calculation
const BLACK = 0.05;
const WHITE = 1.05;

const ColourListLine = ({ name, value, luminance }) => {
  const blackRatio = (luminance + 0.05) / BLACK;
  const whiteRatio = WHITE / (luminance + 0.05);

  // Choose the colour for the name based on the better ratio
  const nameColour = blackRatio > whiteRatio ? 'black' : 'white';

  // Display black and white on the colour, if the ratio is good then use
  // black or white, otherwise use a mid-grey, biased toward the opposite
  const blackColour = blackRatio > ratioThreshold ? 'black' : '#b0b0b0';
  const whiteColour = whiteRatio > ratioThreshold ? 'white' : '#505050';

  const baseStyle = { background: value, color: nameColour };

  return [
    <div key={name} style={baseStyle}>
      {name}
    </div>,
    <div key={value} style={baseStyle}>
      {value}
    </div>,
    <div key={`${name}-luminance`} style={baseStyle}>
      {luminance.toFixed(3)}
    </div>,
    <div
      key={`${name}-black-ratio`}
      style={{ background: value, color: blackColour }}
    >
      Black {blackRatio.toFixed(2)}:1
    </div>,
    <div
      key={`${name}-white-ratio`}
      style={{ background: value, color: whiteColour }}
    >
      White {whiteRatio.toFixed(2)}:1
    </div>,
  ];
};

ColourListLine.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  luminance: PropTypes.number.isRequired,
};

class HTMLColourList extends React.Component {
  state = {
    selected: 'html',
    colourList: [],
    sortOrder: 'name',
  };

  componentDidMount() {
    this.loadColours();
  }

  loadColours = (selected = this.state.selected) => {
    const colours = selected === 'xkcd' ? [...XKCDColours] : [...HTMLColours];

    colours.forEach(colour => {
      colour.luminance = sRGBLuminance(rgbStrToObject(colour.value));
    });

    this.setState(() => ({ colourList: colours }));
  };

  sortByName = () => {
    const { colourList, sortOrder } = this.state;
    const colours = [...colourList];

    if (sortOrder === 'name') {
      colours.sort((a, b) => (a.name > b.name ? -1 : 1));

      return this.setState(() => ({ colourList: colours, sortOrder: 'namer' }));
    }

    colours.sort((a, b) => (a.name < b.name ? -1 : 1));

    this.setState(() => ({ colourList: colours, sortOrder: 'name' }));
  };

  sortByRGB = () => {
    const { colourList, sortOrder } = this.state;
    const colours = [...colourList];

    if (sortOrder === 'value') {
      colours.sort((a, b) => (a.value > b.value ? -1 : 1));

      return this.setState(() => ({ colourList: colours, sortOrder: 'valuer' }));
    }

    colours.sort((a, b) => (a.value < b.value ? -1 : 1));

    this.setState(() => ({ colourList: colours, sortOrder: 'value' }));
  };

  sortByLuminance = () => {
    const { colourList, sortOrder } = this.state;
    const colours = [...colourList];

    if (sortOrder === 'luminancer') {
      colours.sort((a, b) => (a.luminance < b.luminance ? -1 : 1));

      return this.setState(() => ({
        colourList: colours,
        sortOrder: 'luminance',
      }));
    }

    colours.sort((a, b) => (a.luminance > b.luminance ? -1 : 1));

    this.setState(() => ({ colourList: colours, sortOrder: 'luminancer' }));
  };

  swapColours = () => {
    const newSelected = this.state.selected === 'xkcd' ? 'html' : 'xkcd';

    this.loadColours(newSelected);

    this.setState({ selected: newSelected });
  };

  render() {
    const { selected, colourList } = this.state;

    return (
      <div className="html-colour-list">
        <span className="html-colour-list__title">
          {selected.toUpperCase()} Colours
        </span>
        <button onClick={this.swapColours}>
          Swap to {selected === 'xkcd' ? 'HTML' : 'XKCD'}
        </button>

        <button onClick={this.sortByName}>Colour Name</button>
        <button onClick={this.sortByRGB}>RGB</button>
        <button onClick={this.sortByLuminance}>Luminance</button>
        <div>Black Contrast Ratio</div>
        <div>White Contrast Ratio</div>

        {colourList.map(({ name, value, luminance }) => (
          <ColourListLine
            key={`${name}-line`}
            name={name}
            value={value}
            luminance={luminance}
          />
        ))}
      </div>
    );
  }
}

export default HTMLColourList;
