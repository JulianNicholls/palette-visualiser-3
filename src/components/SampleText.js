import React from 'react';

const SampleText = ({ bg, fg }) => (
  <div className="sample-text" style={{ background: bg, color: fg }}>
    <h1 style={{ color: fg }}>Large Heading</h1>
    <p>
      Click on a colour combination block to show combination here. That will work
      with both the sufficiently contrasted and the ones which are too close in
      contrast.
    </p>

    <p>
      This is another paragraph. <em>This text is emphasised, so italic, maybe?</em>,{' '}
      <strong>This text is strong, so bold perhaps?</strong>{' '}
      <i>This text should be italic.</i>.
    </p>
  </div>
);

export default SampleText;
