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
    if (sortOrder === 'name')
      return sort((a, b) => (a.name > b.name ? -1 : 1), 'namer');

    sort((a, b) => (a.name < b.name ? -1 : 1), 'name');
  };

  const sortByRGB = () => {
    if (sortOrder === 'value')
      return sort((a, b) => (a.value > b.value ? -1 : 1), 'valuer');

    sort((a, b) => (a.value < b.value ? -1 : 1), 'value');
  };

  const sortByLuminance = () => {
    if (sortOrder === 'luminancer')
      return sort((a, b) => (a.luminance < b.luminance ? -1 : 1), 'luminance');

    sort((a, b) => (a.luminance > b.luminance ? -1 : 1), 'luminancer');
  };

  const sort = (compare, order) => {
    const colours = [...colourList].sort(compare);

    setColourList(colours);
    setSortOrder(order);
  };

  return (
    <div className="html-colour-list">
      <span className="html-colour-list__title">
        {selected.toUpperCase()} Colours
      </span>
      <button onClick={swapColours}>
        Swap to {selected === 'xkcd' ? 'HTML' : 'XKCD'}
      </button>

      <button onClick={sortByName}>
        Colour Name {sortOrder === 'name' && '⬆️'}
        {sortOrder === 'namer' && '⬇️'}
      </button>
      <button onClick={sortByRGB}>
        RGB {sortOrder === 'value' && '⬆️'}
        {sortOrder === 'valuer' && '⬇️'}
      </button>
      <button onClick={sortByLuminance}>
        Luminance {sortOrder === 'luminance' && '⬆️'}
        {sortOrder === 'luminancer' && '⬇️'}
      </button>
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
