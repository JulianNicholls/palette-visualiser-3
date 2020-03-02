import React from 'react';

interface CILProps {
  colour: ColourInfoData;
  index: number;
}

const ColourInfoLine = ({
  colour: { rgbs, luminance, hsvs },
  index,
}: CILProps): JSX.Element => (
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

export default ColourInfoLine;
