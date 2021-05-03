import React, { useState, useEffect } from 'react';

import ColourListLine from './ColourListLine';

import HTMLColours from '../colours/HTMLColours';
import XKCDColours from '../colours/XKCDColours';

import { rgbStrToObject, sRGBLuminance } from '../conversions';
import { useColours } from '../context';

type ListName = 'xkcd' | 'html';

type NamedColour = {
  name: string;
  value: string;
  luminance: number;
};

interface ListColour {
  name: string;
  value: string;
}

const withLuminance = ({ name, value }: ListColour): NamedColour => ({
  name,
  value,
  luminance: sRGBLuminance(rgbStrToObject(value)),
});

const HTMLColourList = (): JSX.Element => {
  const { addColour } = useColours();
  const [selected, setSelected] = useState<ListName>('html');
  const [colourList, setColourList] = useState<Array<NamedColour>>([]);
  const [sortOrder, setSortOrder] = useState<string>('name');

  const loadColours = (newSelected = selected): void => {
    const colours: Array<NamedColour> =
      newSelected === 'xkcd'
        ? [...XKCDColours].map(withLuminance)
        : [...HTMLColours].map(withLuminance);

    setColourList(colours);
  };

  useEffect(loadColours, []);

  const swapColours = (): void => {
    const newSelected: ListName = selected === 'xkcd' ? 'html' : 'xkcd';

    loadColours(newSelected);

    setSelected(newSelected);
    setSortOrder('name');
  };

  const sortByName = (): void => {
    if (sortOrder === 'name')
      return sort(
        (a: NamedColour, b: NamedColour) => b.name.localeCompare(a.name),
        'namer'
      );

    sort((a: NamedColour, b: NamedColour) => a.name.localeCompare(b.name), 'name');
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

  const insertColour = (colour: string): void => {
    addColour(colour);
  };

  return (
    <section className="html-colour-list">
      <span className="html-colour-list__title">
        {selected.toUpperCase()} Colours
      </span>
      <button
        title="Toggle between HTML colours and XKCD colour list"
        onClick={swapColours}
      >
        Swap to {selected === 'xkcd' ? 'HTML' : 'XKCD'}
      </button>

      <button
        title="Sort by name"
        className="html-colour-list__header"
        onClick={sortByName}
      >
        Colour Name {sortOrder === 'name' && '🔼'}
        {sortOrder === 'namer' && '🔽'}
      </button>
      <button
        title="Sort by hex RGB value"
        className="html-colour-list__header"
        onClick={sortByRGB}
      >
        RGB {sortOrder === 'value' && '🔼'}
        {sortOrder === 'valuer' && '🔽'}
      </button>
      <button
        title="Sort by luminance"
        className="html-colour-list__header"
        onClick={sortByLuminance}
      >
        Luminance {sortOrder === 'luminance' && '🔼'}
        {sortOrder === 'luminancer' && '🔽'}
      </button>
      <div>Black Contrast Ratio</div>
      <div>White Contrast Ratio</div>

      {colourList.map(({ name, value, luminance }: NamedColour) => (
        <ColourListLine
          key={`${name}-${value}-line`}
          name={name}
          value={value}
          luminance={luminance}
          click={insertColour}
        />
      ))}
    </section>
  );
};

export default HTMLColourList;
