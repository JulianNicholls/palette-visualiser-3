import React, { useState, useEffect, useContext } from 'react';

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
  rgbs.reduce((hsls, rgb) => {
    return hsls.concat(RGBtoHSL(rgbStrToObject(rgb)));
  }, []);

interface ColourState {
  rgbs: Array<string>;
  hsls: Array<HSL>;
  selectedBG: string;
  selectedFG: string;
  changeRGB: (index: number, value: string) => void;
  changeHSL: (index: number, value: HSL) => void;
  selectColour: (bg: string, fg: string) => void;
}

const ColourContext = React.createContext<ColourState>({} as ColourState);

interface ColourProviderProps {
  children: JSX.Element;
}

export const ColourProvider = ({ children }: ColourProviderProps): JSX.Element => {
  const [rgbs, setRGBs] = useState<Array<string>>(DEFAULT_RGBS);
  const [hsls, setHSLs] = useState<Array<HSL>>(HSLsFromRGBs(rgbs));
  const [selected, setSelected] = useState<SelectedColour>(DEFAULT_SELECT);

  const initialLoad = (): void => {
    const saveData = localStorage.getItem(LS_PALETTE_KEY);

    if (saveData) {
      const loadedRGBs = JSON.parse(saveData);

      setRGBs(loadedRGBs);
      setHSLs(HSLsFromRGBs(loadedRGBs));
    }
  };

  useEffect(initialLoad, []);

  const changeRGB = (index: number, value: string): void => {
    const newRGBs = [...rgbs];
    newRGBs[index] = value;

    setRGBs(newRGBs);
    setHSLs(HSLsFromRGBs(newRGBs));

    localStorage.setItem(LS_PALETTE_KEY, JSON.stringify(newRGBs));
  };

  const changeHSL = (index: number, value: HSL): void => {
    const rgb = HSLtoRGB(value);

    const newRGBs = [...rgbs];
    const newHSLs = [...hsls];

    newHSLs[index] = value;
    newRGBs[index] = rgbObjectToStr(rgb);

    setRGBs(newRGBs);
    setHSLs(newHSLs);

    localStorage.setItem(LS_PALETTE_KEY, JSON.stringify(newRGBs));
  };

  const selectColour = (bg: string, fg: string) => setSelected({ bg, fg });

  const state: ColourState = {
    rgbs,
    hsls,
    selectedBG: selected.bg,
    selectedFG: selected.fg,
    changeRGB,
    changeHSL,
    selectColour,
  };

  return <ColourContext.Provider value={state}>{children}</ColourContext.Provider>;
};

export const useColours = (): ColourState => {
  const context = useContext(ColourContext);

  if (context === undefined)
    throw new Error('useColours() must be used within a ColourProvider block');

  return context;
};
