import React from 'react';
import PropTypes from 'prop-types';

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

export default ColourInfoLine;
