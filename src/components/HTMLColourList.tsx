import React, { useState, useEffect } from 'react';

import ColourListLine from './ColourListLine';

import HTMLColours from '../colours/HTMLColours';
import XKCDColours from '../colours/XKCDColours';

import { rgbStrToObject, sRGBLuminance } from '../conversions';

interface NamedColour {
  name: string;
  value: string;
  luminance?: number;
}

const HTMLColourList = (): JSX.Element => {
  const [selected, setSelected] = useState<string>('html');
  const [colourList, setColourList] = useState<Array<NamedColour>>([]);
  const [sortOrder, setSortOrder] = useState<string>('name');

  const loadColours = (newSelected = selected): void => {
    const colours: Array<NamedColour> =
      newSelected === 'xkcd' ? [...XKCDColours] : [...HTMLColours];

    colours.forEach(colour => {
      colour.luminance = sRGBLuminance(rgbStrToObject(colour.value));
    });

    setColourList(colours);
  };

  useEffect(loadColours, []);

  const swapColours = (): void => {
    const newSelected: string = selected === 'xkcd' ? 'html' : 'xkcd';

    loadColours(newSelected);

    setSelected(newSelected);
    setSortOrder('name');
  };

  const sortByName = (): void => {
    if (sortOrder === 'name')
      return sort(
        (a: NamedColour, b: NamedColour) => (a.name > b.name ? -1 : 1),
        'namer'
      );

    sort((a: NamedColour, b: NamedColour) => (a.name < b.name ? -1 : 1), 'name');
  };

  const sortByRGB = (): void => {
    if (sortOrder === 'value')
      return sort(
        (a: NamedColour, b: NamedColour) => (a.value > b.value ? -1 : 1),
        'valuer'
      );

    sort(
      (a: NamedColour, b: NamedColour) => (a.value < b.value ? -1 : 1),
      'value'
    );
  };

  const sortByLuminance = (): void => {
    if (sortOrder === 'luminancer')
      return sort(
        (a: NamedColour, b: NamedColour) => (a.luminance < b.luminance ? -1 : 1),
        'luminance'
      );

    sort(
      (a: NamedColour, b: NamedColour) => (a.luminance > b.luminance ? -1 : 1),
      'luminancer'
    );
  };

  const sort = (
    compare: (a: NamedColour, b: NamedColour) => number,
    order: string
  ): void => {
    const colours = [...colourList].sort(compare);

    setColourList(colours);
    setSortOrder(order);
  };

  return (
    <section className="html-colour-list">
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

      {colourList.map(({ name, value, luminance }: NamedColour) => (
        <ColourListLine
          key={`${name}-${value}-line`}
          name={name}
          value={value}
          luminance={luminance}
        />
      ))}
    </section>
  );
};

export default HTMLColourList;
