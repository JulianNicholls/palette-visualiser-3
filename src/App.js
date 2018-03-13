import React from 'react';

import InputBox from './components/InputBox';
import ColourInfo from './components/ColourInfo';
import ColourBlocks from './components/ColourBlocks';
import SampleText from './components/SampleText';

import { rgbStrToArray, RGBtoHSV, HSVtoHSL, HSLtoRGB } from './conversions';

const LS_KEY = 'pv30';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rgbs: ['#336699', '#669933', '#996633', '#663399', '#339966'],
      hsls: [],
      selectedBG: '#000000',
      selectedFG: '#ffffff'
    };

    const saveData = localStorage.getItem(LS_KEY);

    if (saveData) {
      this.state.rgbs = JSON.parse(saveData);
    }
  }

  componentWillMount() {
    this.setHSLsFromRGBs();
  }

  setHSLFromRGB = (index, rgbStr = null) => {
    const hsls = this.state.hsls;

    rgbStr = rgbStr || this.state.rgbs[index];

    const rgb = rgbStrToArray(rgbStr);
    const hsv = RGBtoHSV(rgb[0], rgb[1], rgb[2]);
    const hsl = HSVtoHSL(hsv[0], hsv[1], hsv[2]);

    hsls[index] = { h: hsl[0], s: hsl[1], l: hsl[2] };

    this.setState(() => ({ hsls }));
  };

  setHSLsFromRGBs = () => {
    for (let idx = 0; idx < this.state.rgbs.length; ++idx) {
      this.setHSLFromRGB(idx);
    }
  };

  handleChangeRGB = (index, rgbStr) => {
    const { rgbs } = this.state;

    rgbs[index] = rgbStr;
    localStorage.setItem(LS_KEY, JSON.stringify(rgbs));

    this.setState(() => ({ rgbs }));

    this.setHSLFromRGB(index, rgbStr);
  };

  handleChangeHSL = (index, colour) => {
    const toHexStr = dec => {
      const str = dec.toString(16).toUpperCase();

      return dec < 16 ? '0' + str : str;
    };

    const { rgbs, hsls } = this.state;

    const rgbArray = HSLtoRGB(colour.h, colour.s, colour.l);
    const rgbStr = '#' + rgbArray.map(value => toHexStr(value)).join('');

    hsls[index] = colour;
    rgbs[index] = rgbStr;

    localStorage.setItem(LS_KEY, JSON.stringify(rgbs));

    this.setState(() => ({ hsls, rgbs }));
  };

  selectColour = (bg, fg) => {
    this.setState(() => ({ selectedBG: bg, selectedFG: fg }));
  };

  render() {
    const { rgbs, hsls, selectedBG, selectedFG } = this.state;

    return (
      <div>
        <h1>Palette Visualiser</h1>
        <div className="container">
          <div id="top-section">
            <InputBox
              rgbs={rgbs}
              hsls={hsls}
              handleChangeRGB={this.handleChangeRGB}
              handleChangeHSL={this.handleChangeHSL}
            />
            <ColourInfo rgbs={rgbs} />
          </div>
          <ColourBlocks rgbs={rgbs} selectColour={this.selectColour} />
          <SampleText bg={selectedBG} fg={selectedFG} />
        </div>
      </div>
    );
  }
}

export default App;
