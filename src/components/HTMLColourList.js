import React from 'react';

import HTMLColours from '../HTMLColours';
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
    colourList: [],
    sortOrder: 'name'
  };

  componentDidMount() {
    const colours = [...HTMLColours];

    colours.forEach(colour => {
      colour.rgb = rgbStrToObject(colour.value);
      const luminance = sRGBLuminance(colour.rgb);
      colour.luminance = luminance;
    });

    this.setState(() => ({ colourList: colours }));
  }

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

  sortByLuminance = () => {
    const { colourList, sortOrder } = this.state;
    const colours = [...colourList];

    if (sortOrder === 'luminance') {
      colours.sort((a, b) => (a.luminance > b.luminance ? -1 : 1));

      return this.setState(() => ({
        colourList: colours,
        sortOrder: 'luminancer'
      }));
    }

    colours.sort((a, b) => (a.luminance < b.luminance ? -1 : 1));

    this.setState(() => ({ colourList: colours, sortOrder: 'luminance' }));
  };

  render() {
    return (
      <div className="html-colour-list">
        <button onClick={this.sortByName}>Colour Name</button>
        <div>RGB</div>
        <button onClick={this.sortByLuminance}>Luminance</button>
        <div>Black Contrast Ratio</div>
        <div>White Contrast Ratio</div>

        {this.state.colourList.map(({ name, value, rgb, luminance }) => {
          const blackRatio = contrastRatio(rgb, black);
          const whiteRatio = contrastRatio(rgb, white);

          const nameColour = blackRatio > whiteRatio ? 'black' : 'white';
          const blackColour = blackRatio > ratioThreshold ? 'black' : '#7f7f7f';
          const whiteColour = whiteRatio > ratioThreshold ? 'white' : '#7f7f7f';

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
