import React from 'react';

import InputBox from './components/InputBox';
import ColourInfo from './components/ColourInfo';
import ColourBlocks from './components/ColourBlocks';
import SampleText from './components/SampleText';
import HTMLColourList from './components/HTMLColourList';

const App = () => (
  <main>
    <h1>Palette Visualiser</h1>
    <div className="container">
      <section id="top-section">
        <InputBox />
        {/* <ColourInfo /> */}
      </section>
      <ColourBlocks />
      <SampleText />
      <HTMLColourList />
    </div>
  </main>
);

export default App;
