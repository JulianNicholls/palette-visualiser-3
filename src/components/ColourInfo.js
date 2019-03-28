import React, { useContext } from 'react';

import ColourInfoLine from './ColourInfoLine';

import { ColourContext } from '../context';
import { rgbStrToObject, sRGBLuminance, RGBtoHSV } from '../conversions';

const ColourInfo = () => {
  const { rgbs } = useContext(ColourContext);

  const lines = () => {
    return rgbs.map(rgbStr => {
      const rgb = rgbStrToObject(rgbStr);

      return {
        rgbs: rgb,
        luminance: sRGBLuminance(rgb).toFixed(3),
        hsvs: RGBtoHSV(rgb),
      };
    });
  };

  return (
    <table id="info-table">
      <thead>
        <tr>
          <th colSpan="3">RGB</th>
          <th className="luminance">sRGB Lum</th>
          <th colSpan="3">HSV</th>
        </tr>
      </thead>
      <tbody>
        {lines().map((colour, index) => (
          <ColourInfoLine colour={colour} key={index} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default ColourInfo;
