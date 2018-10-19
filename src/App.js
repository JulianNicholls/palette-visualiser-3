import React from 'react';

import InputBox from './components/InputBox';
import ColourInfo from './components/ColourInfo';
import ColourBlocks from './components/ColourBlocks';
import SampleText from './components/SampleText';
import HTMLColourList from './components/HTMLColourList';

const App = () => (
  <div>
    <h1>Palette Visualiser</h1>
    <div className="container">
      <div id="top-section">
        <InputBox />
        <ColourInfo />
      </div>
      <ColourBlocks />
      <SampleText />
      <HTMLColourList />
    </div>
  </div>
);

export default App;
