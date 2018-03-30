import React from 'react';

import InputBox from './components/InputBox';
import ColourInfo from './components/ColourInfo';
import ColourBlocks from './components/ColourBlocks';
import SampleText from './components/SampleText';

import {
  rgbStrToObject,
  rgbObjectToStr,
  RGBtoHSV,
  HSVtoHSL,
  HSLtoRGB
} from './conversions';

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

    this.state.hsls = this.HSLsFromRGBs();
  }

  setHSLFromRGB = (index, rgbStr = null) => {
    const { rgbs, hsls } = this.state;

    rgbStr = rgbStr || rgbs[index];

    hsls[index] = this.HSLFromRGB(rgbStr);

    this.setState(() => ({ hsls }));
  };

  HSLsFromRGBs() {
    const { rgbs } = this.state;
    const hsls = [];

    for (let idx = 0; idx < this.state.rgbs.length; ++idx) {
      hsls[idx] = this.HSLFromRGB(rgbs[idx]);
    }

    return hsls;
  }

  HSLFromRGB(rgbStr) {
    const rgb = rgbStrToObject(rgbStr);
    const hsv = RGBtoHSV(rgb);

    return HSVtoHSL(hsv);
  }

  handleChangeRGB = (index, rgbStr) => {
    const { rgbs } = this.state;

    rgbs[index] = rgbStr;
    localStorage.setItem(LS_KEY, JSON.stringify(rgbs));

    this.setState(() => ({ rgbs }));

    this.setHSLFromRGB(index, rgbStr);
  };

  handleChangeHSL = (index, colour) => {
    const { rgbs, hsls } = this.state;

    const rgb = HSLtoRGB(colour);

    hsls[index] = colour;
    rgbs[index] = rgbObjectToStr(rgb);

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
