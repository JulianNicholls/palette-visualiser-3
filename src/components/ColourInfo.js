import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { ColourContext } from '../context';
import { rgbStrToObject, sRGBLuminance, RGBtoHSV } from '../conversions';

const ColourInfoLine = ({ colour: { rgbs, luminance, hsvs }, index }) => (
  <tr className={index % 2 ? 'odd' : 'even'}>
    <td>{rgbs.r}</td>
    <td>{rgbs.g}</td>
    <td>{rgbs.b}</td>
    <td className="luminance">{luminance}</td>
    <td>{hsvs.h}&deg;</td>
    <td>{hsvs.s}%</td>
    <td>{hsvs.v}%</td>
  </tr>
);

ColourInfoLine.propTypes = {
  colour: PropTypes.shape({
    rgbs: PropTypes.shape({
      r: PropTypes.number.isRequired,
      g: PropTypes.number.isRequired,
      b: PropTypes.number.isRequired,
    }).isRequired,
    luminance: PropTypes.string.isRequired,
    hsvs: PropTypes.shape({
      h: PropTypes.number.isRequired,
      s: PropTypes.number.isRequired,
      v: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

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
