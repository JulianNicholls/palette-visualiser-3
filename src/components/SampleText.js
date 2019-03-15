import React, { useContext } from 'react';

import { ColourContext } from '../context';

const SampleText = () => {
  const context = useContext(ColourContext);

  return (
    <div
      className="sample-text"
      style={{ background: context.selectedBG, color: context.selectedFG }}
    >
      <h1 style={{ color: context.selectedFG }}>Large Heading</h1>
      <p>
        Click on a colour combination block to show that combination here. That
        will work with both the sufficiently contrasted and the ones which are too
        close in contrast.
      </p>

      <p>
        This is another paragraph.{' '}
        <em>This text is emphasised, so italic, maybe?</em>,{' '}
        <strong>This text is strong, so bold perhaps?</strong>{' '}
        <i>This text should be italic.</i>.
      </p>
    </div>
  );
};

export default SampleText;
