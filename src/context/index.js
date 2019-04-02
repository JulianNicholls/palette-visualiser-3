import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  rgbStrToObject,
  rgbObjectToStr,
  RGBtoHSL,
  HSLtoRGB,
} from '../conversions';

const LS_PALETTE_KEY = 'pv31';
const DEFAULT_RGBS = ['#336699', '#669933', '#996633', '#663399', '#339966'];
const DEFAULT_SELECT = { bg: '#000000', fg: '#ffffff' };

const HSLsFromRGBs = rgbs =>
  rgbs.reduce((hsls, rgb) => {
    hsls.push(RGBtoHSL(rgbStrToObject(rgb)));

    return hsls;
  }, []);

export const ColourContext = React.createContext();

export const Provider = ({ children }) => {
  const [rgbs, setRGBs] = useState(DEFAULT_RGBS);

  const [hsls, setHSLs] = useState(HSLsFromRGBs(rgbs));
  const [selected, setSelected] = useState(DEFAULT_SELECT);

  const initialLoad = () => {
    const saveData = localStorage.getItem(LS_PALETTE_KEY);

    if (saveData) {
      const loadedRGBs = JSON.parse(saveData);

      setRGBs(loadedRGBs);
      setHSLs(HSLsFromRGBs(loadedRGBs));
    }
  };

  useEffect(initialLoad, []);

  const changeRGB = (index, value) => {
    const newRGBs = [...rgbs];
    newRGBs[index] = value;

    setRGBs(newRGBs);
    setHSLs(HSLsFromRGBs(newRGBs));
    localStorage.setItem(LS_PALETTE_KEY, JSON.stringify(newRGBs));
  };

  const changeHSL = (index, value) => {
    const rgb = HSLtoRGB(value);

    const newRGBs = [...rgbs];
    const newHSLs = [...hsls];

    newHSLs[index] = value;
    newRGBs[index] = rgbObjectToStr(rgb);

    setRGBs(newRGBs);
    setHSLs(newHSLs);

    localStorage.setItem(LS_PALETTE_KEY, JSON.stringify(newRGBs));
  };

  const selectColour = (bg, fg) => setSelected({ bg, fg });

  const state = {
    rgbs,
    hsls,
    selectedBG: selected.bg,
    selectedFG: selected.fg,
    changeRGB,
    changeHSL,
    selectColour,
  };

  return (
    <ColourContext.Provider value={state}>{children}</ColourContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.element,
};
