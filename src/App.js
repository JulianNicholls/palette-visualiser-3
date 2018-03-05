import React from 'react';

import InputBox from './components/InputBox';
import ColourInfo from './components/ColourInfo';
import ColourBlocks from './components/ColourBlocks';

import { rgbStrToArray, sRGBLuminance, RGBtoHSV, HSVtoHSL, HSLtoRGB } from './conversions';

class App extends React.Component {
  state = {
    rgbs: ['#336699', '#669933', '#996633', '#663399', '#339966'],
    hsls: [],
    lines: []
  };

  setHSLFromRGB = (index, rgbStr = null) => {
    const hsls = this.state.hsls;

    rgbStr = rgbStr || this.state.rgbs[index];

    const rgb = rgbStrToArray(rgbStr);
    const hsv = RGBtoHSV(rgb[0], rgb[1], rgb[2]);
    const hsl = HSVtoHSL(hsv[0], hsv[1], hsv[2]);

    hsls[index] = { h: hsl[0], s: hsl[1], l: hsl[2] };

    this.setState(() => ({ hsls }));
  }

  setLine = (index, rgbStr = null) => {
    const lines = this.state.lines;

    rgbStr = rgbStr || this.state.rgbs[index];

    const rgb = rgbStrToArray(rgbStr);
    const rlum = sRGBLuminance(rgb).toFixed(3);
    const hsv = RGBtoHSV(rgb[0], rgb[1], rgb[2]);

    lines[index] = { rgbs: rgb, rlum, hsvs: hsv };

    this.setState(() => ({ lines }));
  }

  setHSLsFromRGBs = () => {
    for (let idx = 0; idx < this.state.rgbs.length; ++idx) {
      this.setHSLFromRGB(idx);
    }
  }

  setLines = () => {
    for (let idx = 0; idx < this.state.rgbs.length; ++idx) {
      this.setLine(idx);
    }
  }

  componentWillMount() {
    this.setHSLsFromRGBs();
    this.setLines();
  }

  handleChangeRGB = (index, rgbStr) => {
    const rgbs = this.state.rgbs;

    rgbs[index] = rgbStr;

    if (rgbStr.length === 7) {
      this.setState(() => ({ rgbs }));

      this.setHSLFromRGB(index, rgbStr);
      this.setLine(index, rgbStr);
    }
  }

  handleChangeHSL = (index, colour) => {
    const toHexStr = dec => {
      const str = dec.toString(16).toUpperCase();

      return dec < 16 ? '0' + str : str;
    };

    const hsls = this.state.hsls;
    const rgbs = this.state.rgbs;

    const rgbArray = HSLtoRGB(colour.h, colour.s, colour.l);
    const rgbStr = '#' + rgbArray.map(value => toHexStr(value)).join('');

    hsls[index] = colour;
    rgbs[index] = rgbStr;

    this.setState(() => ({ hsls, rgbs }));

    this.setLine(index, rgbStr);
  }

  render() {
    return (
      <div>
        <h1>Palette Visualiser</h1>
        <div className="container">
          <div id="top-section">
            <InputBox rgbs={this.state.rgbs} hsls={this.state.hsls} handleChangeRGB={this.handleChangeRGB} handleChangeHSL={this.handleChangeHSL} />
            <ColourInfo lines={this.state.lines} />
          </div>
          <ColourBlocks rgbs={this.state.rgbs} />
        </div>
      </div>
    );
  }
}

export default App;
