import React from 'react';

import { rgbStrToArray, sRGBLuminance, RGBtoHSV } from '../conversions';

class ColourInfo extends React.Component {
  lines() {
    const lines = [];
    const { rgbs } = this.props;

    rgbs.forEach(rgbStr => {
      const rgb = rgbStrToArray(rgbStr);

      lines.push({
        rgbs: rgb,
        rlum: sRGBLuminance(rgb).toFixed(3),
        hsvs: RGBtoHSV(rgb[0], rgb[1], rgb[2])
      });
    });

    return lines;
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
              <td>{rgbs[0]}</td>
              <td>{rgbs[1]}</td>
              <td>{rgbs[2]}</td>
              <td>{rlum}</td>
              <td>{hsvs[0]}&deg;</td>
              <td>{hsvs[1]}%</td>
              <td>{hsvs[2]}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ColourInfo;
