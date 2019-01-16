import React from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../context';
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

class ColourInfo extends React.Component {
  lines(rgbs) {
    return rgbs.map(rgbStr => {
      const rgb = rgbStrToObject(rgbStr);

      return {
        rgbs: rgb,
        luminance: sRGBLuminance(rgb).toFixed(3),
        hsvs: RGBtoHSV(rgb),
      };
    });
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
              {this.lines(rgbs).map((colour, index) => (
                <ColourInfoLine colour={colour} key={index} index={index} />
              ))}
            </tbody>
          </table>
        )}
      </Consumer>
    );
  }
}

export default ColourInfo;
