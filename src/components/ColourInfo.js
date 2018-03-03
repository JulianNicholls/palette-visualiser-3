import React from 'react';

const ColourInfo = ({ lines }) => (
  <table id="info-table">
    <thead>
      <tr>
        <th colSpan="3">RGB</th>
        <th>Rel Lum.</th>
        <th colSpan="3">HSV</th>
      </tr>
    </thead>
    <tbody>
      {lines.map((line, idx) => (
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


export default ColourInfo;
