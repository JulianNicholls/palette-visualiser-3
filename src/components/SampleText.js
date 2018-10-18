import React from 'react';

import { Consumer } from '../context';

const SampleText = () => (
  <Consumer>
    {({ selectedBG, selectedFG }) => (
      <div
        className="sample-text"
        style={{ background: selectedBG, color: selectedFG }}
      >
        <h1 style={{ color: selectedFG }}>Large Heading</h1>
        <p>
          Click on a colour combination block to show that combination here. That
          will work with both the sufficiently contrasted and the ones which are
          too close in contrast.
        </p>

        <p>
          This is another paragraph.{' '}
          <em>This text is emphasised, so italic, maybe?</em>,{' '}
          <strong>This text is strong, so bold perhaps?</strong>{' '}
          <i>This text should be italic.</i>.
        </p>
      </div>
    )}
  </Consumer>
);

export default SampleText;
