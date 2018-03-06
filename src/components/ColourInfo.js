import React from 'react';

import { rgbStrToArray, sRGBLuminance, RGBtoHSV } from '../conversions';

class ColourInfo extends React.Component {
  lines = () => {
    const lines = [];
    const { rgbs } = this.props;
    const numLines = rgbs.length;

    for (let idx = 0; idx < numLines; ++idx) {
      const rgb = rgbStrToArray(rgbs[idx]);

      lines[idx] = {
        rgbs: rgb,
        rlum: sRGBLuminance(rgb).toFixed(3),
        hsvs: RGBtoHSV(rgb[0], rgb[1], rgb[2])
      };
    }

    return lines;
  };

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
          {this.lines().map((line, idx) => (
            <tr key={idx}>
              <td>{line.rgbs[0]}</td>
              <td>{line.rgbs[1]}</td>
              <td>{line.rgbs[2]}</td>
              <td>{line.rlum}</td>
              <td>{line.hsvs[0]}&deg;</td>
              <td>{line.hsvs[1]}%</td>
              <td>{line.hsvs[2]}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ColourInfo;
