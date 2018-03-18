import React from 'react';

import { rgbStrToObject, sRGBLuminance, RGBtoHSV } from '../conversions';

class ColourInfo extends React.Component {
  lines() {
    const { rgbs } = this.props;

    return rgbs.map(rgbStr => {
      const rgb = rgbStrToObject(rgbStr);

      return {
        rgbs: rgb,
        rlum: sRGBLuminance(rgb).toFixed(3),
        hsvs: RGBtoHSV(rgb)
      };
    });
  }

  render() {
    return (
      <table id="info-table">
        <thead>
          <tr>
            <th colSpan="3">RGB</th>
            <th>sRGB Lum.</th>
            <th colSpan="3">HSV</th>
          </tr>
        </thead>
        <tbody>
          {this.lines().map(({ rgbs, rlum, hsvs }, idx) => (
            <tr key={idx}>
              <td>{rgbs.r}</td>
              <td>{rgbs.g}</td>
              <td>{rgbs.b}</td>
              <td>{rlum}</td>
              <td>{hsvs.h}&deg;</td>
              <td>{hsvs.s}%</td>
              <td>{hsvs.v}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ColourInfo;
