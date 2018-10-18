import React from 'react';

import { Consumer } from '../context';
import { rgbStrToObject, sRGBLuminance, RGBtoHSV } from '../conversions';

class ColourInfo extends React.Component {
  lines(rgbs) {
    return rgbs.map(rgbStr => {
      const rgb = rgbStrToObject(rgbStr);

      return {
        rgbs: rgb,
        rlum: sRGBLuminance(rgb).toFixed(3),
        hsvs: RGBtoHSV(rgb)
      };
    });
  }

  line({ rgbs, rlum, hsvs }, idx) {
    return (
      <tr key={idx}>
        <td>{rgbs.r}</td>
        <td>{rgbs.g}</td>
        <td>{rgbs.b}</td>
        <td className="luminance">{rlum}</td>
        <td>{hsvs.h}&deg;</td>
        <td>{hsvs.s}%</td>
        <td>{hsvs.v}%</td>
      </tr>
    );
  }

  render() {
    return (
      <Consumer>
        {({ rgbs }) => (
          <table id="info-table">
            <thead>
              <tr>
                <th colSpan="3">RGB</th>
                <th className="luminance">sRGB Lum</th>
                <th colSpan="3">HSV</th>
              </tr>
            </thead>
            <tbody>
              {this.lines(rgbs).map((colour, idx) => this.line(colour, idx))}
            </tbody>
          </table>
        )}
      </Consumer>
    );
  }
}

export default ColourInfo;
