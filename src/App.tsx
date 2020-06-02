import React from 'react';

import InputBox from './components/InputBox';
import ColourBlocks from './components/ColourBlocks';
import SampleText from './components/SampleText';
import HTMLColourList from './components/HTMLColourList';

const App = () => (
  <main>
    <h1>Palette Visualiser</h1>
    <div className="container">
      <InputBox />
      <ColourBlocks />
      <SampleText />
      <HTMLColourList />
    </div>
  </main>
);

export default App;
