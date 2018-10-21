import React from 'react';

import HTMLColours from '../HTMLColours';
import XKCDColours from '../XKCDColours';

import {
  ratioThreshold,
  rgbStrToObject,
  sRGBLuminance,
  contrastRatio
} from '../conversions';

const black = { r: 0, g: 0, b: 0 };
const white = { r: 255, g: 255, b: 255 };

class HTMLColourList extends React.Component {
  state = {
    selected: 'html',
    colourList: [],
    sortOrder: 'name'
  };

  componentDidMount() {
    this.loadColours();
  }

  loadColours = (selected = this.state.selected) => {
    const colours = selected === 'xkcd' ? [...XKCDColours] : [...HTMLColours];

    colours.forEach(colour => {
      colour.rgb = rgbStrToObject(colour.value);
      colour.luminance = sRGBLuminance(colour.rgb);
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
        sortOrder: 'luminance'
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

        {colourList.map(({ name, value, rgb, luminance }) => {
          const blackRatio = contrastRatio(rgb, black);
          const whiteRatio = contrastRatio(rgb, white);

          // Choose the colour for the name based on the better ratio
          const nameColour = blackRatio > whiteRatio ? 'black' : 'white';

          // Display black and white on the colour, if the ratio is good then use
          // black or white, otherwise use a mid-grey biased toward the opposite
          const blackColour = blackRatio > ratioThreshold ? 'black' : '#a0a0a0';
          const whiteColour = whiteRatio > ratioThreshold ? 'white' : '#606060';

          return [
            <div key={name} style={{ background: value, color: nameColour }}>
              {name}
            </div>,
            <div key={value} style={{ background: value, color: nameColour }}>
              {value}
            </div>,
            <div
              key={`${name}-luminance`}
              style={{ background: value, color: nameColour }}
            >
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
            </div>
          ];
        })}
      </div>
    );
  }
}

export default HTMLColourList;
