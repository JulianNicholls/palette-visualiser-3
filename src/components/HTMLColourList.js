import React, { useState, useEffect } from 'react';

import ColourListLine from './ColourListLine';

import HTMLColours from '../HTMLColours';
import XKCDColours from '../XKCDColours';

import { rgbStrToObject, sRGBLuminance } from '../conversions';

const HTMLColourList = () => {
  const [selected, setSelected] = useState('html');
  const [colourList, setColourList] = useState([]);
  const [sortOrder, setSortOrder] = useState('name');

  const loadColours = (newSelected = selected) => {
    const colours = newSelected === 'xkcd' ? [...XKCDColours] : [...HTMLColours];

    colours.forEach(colour => {
      colour.luminance = sRGBLuminance(rgbStrToObject(colour.value));
    });

    setColourList(colours);
  };

  useEffect(loadColours, []);

  const swapColours = () => {
    const newSelected = selected === 'xkcd' ? 'html' : 'xkcd';

    loadColours(newSelected);

    setSelected(newSelected);
    setSortOrder('name');
  };

  const sortByName = () => {
    const colours = [...colourList];

    if (sortOrder === 'name') {
      colours.sort((a, b) => (a.name > b.name ? -1 : 1));

      setColourList(colours);
      return setSortOrder('namer');
    }

    colours.sort((a, b) => (a.name < b.name ? -1 : 1));

    setColourList(colours);
    setSortOrder('name');
  };

  const sortByRGB = () => {
    const colours = [...colourList];

    if (sortOrder === 'value') {
      colours.sort((a, b) => (a.value > b.value ? -1 : 1));

      setColourList(colours);
      return setSortOrder('valuer');
    }

    colours.sort((a, b) => (a.value < b.value ? -1 : 1));

    setColourList(colours);
    setSortOrder('value');
  };

  const sortByLuminance = () => {
    const colours = [...colourList];

    if (sortOrder === 'luminancer') {
      colours.sort((a, b) => (a.luminance < b.luminance ? -1 : 1));

      setColourList(colours);
      return setSortOrder('luminance');
    }

    colours.sort((a, b) => (a.luminance > b.luminance ? -1 : 1));

    setColourList(colours);
    setSortOrder('luminancer');
  };

  return (
    <div className="html-colour-list">
      <span className="html-colour-list__title">
        {selected.toUpperCase()} Colours
      </span>
      <button onClick={swapColours}>
        Swap to {selected === 'xkcd' ? 'HTML' : 'XKCD'}
      </button>

      <button onClick={sortByName}>Colour Name</button>
      <button onClick={sortByRGB}>RGB</button>
      <button onClick={sortByLuminance}>Luminance</button>
      <div>Black Contrast Ratio</div>
      <div>White Contrast Ratio</div>

      {colourList.map(({ name, value, luminance }) => (
        <ColourListLine
          key={`${name}-${value}-line`}
          name={name}
          value={value}
          luminance={luminance}
        />
      ))}
    </div>
  );
};

export default HTMLColourList;
