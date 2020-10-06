import React, { useState, useContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

import {
  rgbStrToObject,
  rgbObjectToStr,
  RGBtoHSL,
  HSLtoRGB,
} from '../conversions';

const LS_PALETTE_KEY = 'pv33';
const DEFAULT_RGBS = ['#336699', '#669933', '#996633', '#663399', '#339966'];
const DEFAULT_SELECT: SelectedColour = { bg: '#000000', fg: '#ffffff' };

const HSLsFromRGBs = (rgbs: Array<string>): Array<HSL> =>
  rgbs.reduce((hsls: Array<HSL>, rgb: string) => {
    return hsls.concat(RGBtoHSL(rgbStrToObject(rgb)));
  }, []);

interface ColourState {
  rgbs: Array<string>;
  hsls: Array<HSL>;
  selectedBG: string;
  selectedFG: string;
  rgbHexMode: boolean;
  compactMode: boolean;
  changeRGB: (index: number, value: string) => void;
  changeHSL: (index: number, value: HSL) => void;
  selectColour: (bg: string, fg: string) => void;
  addColour: (colour: string) => void;
  removeColour: (index: number) => void;
  toggleHexMode: () => void;
  toggleCompactMode: () => void;
}

const ColourContext = React.createContext<ColourState>({} as ColourState);

export const ColourProvider = ({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element => {
  const [rgbs, setRGBs] = useLocalStorage<Array<string>>(
    LS_PALETTE_KEY,
    DEFAULT_RGBS
  );
  const [hsls, setHSLs] = useState<Array<HSL>>(HSLsFromRGBs(rgbs));
  const [selected, setSelected] = useState<SelectedColour>(DEFAULT_SELECT);
  const [rgbHexMode, setHexMode] = useState<boolean>(true);
  const [compactMode, setCompactMode] = useState<boolean>(false);

  const changeRGB = (index: number, value: string): void => {
    const newRGBs = [...rgbs];
    newRGBs[index] = value;

    setRGBs(newRGBs);
    setHSLs(HSLsFromRGBs(newRGBs));
  };

  const changeHSL = (index: number, value: HSL): void => {
    const rgb = HSLtoRGB(value);

    const newRGBs = [...rgbs];
    const newHSLs = [...hsls];

    newHSLs[index] = value;
    newRGBs[index] = rgbObjectToStr(rgb);

    setRGBs(newRGBs);
    setHSLs(newHSLs);
  };

  const selectColour = (bg: string, fg: string) => setSelected({ bg, fg });

  const addColour = (colour: string): void => {
    setRGBs(rgbs.concat(colour));
    setHSLs(hsls.concat(RGBtoHSL(rgbStrToObject(colour))));
  };

  const removeColour = (idx: number): void => {
    const newRGBs = [...rgbs];
    const newHSLs = [...hsls];

    newRGBs.splice(idx, 1);
    newHSLs.splice(idx, 1);

    setRGBs(newRGBs);
    setHSLs(newHSLs);
  };

  const toggleHexMode = () => setHexMode(!rgbHexMode);
  const toggleCompactMode = () => setCompactMode(!compactMode);

  const state: ColourState = {
    rgbs,
    hsls,
    selectedBG: selected.bg,
    selectedFG: selected.fg,
    rgbHexMode,
    compactMode,
    changeRGB,
    changeHSL,
    selectColour,
    addColour,
    removeColour,
    toggleHexMode,
    toggleCompactMode,
  };

  return <ColourContext.Provider value={state}>{children}</ColourContext.Provider>;
};

export const useColours = (): ColourState => {
  const context = useContext(ColourContext);

  if (context === undefined)
    throw new Error('useColours() must be used within a ColourProvider block');

  return context;
};
