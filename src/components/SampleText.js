import React from 'react';

const SampleText = ({ bg, fg }) => (
  <div className="sample-text" style={{ background: bg, color: fg }}>
    <h1 style={{ color: fg }}>Large Heading</h1>
    <p>
      Click on a colour combination block to show it here. That will work with both
      the sufficiently contrasted and the ones which are too close in contrast.
    </p>

    <p>
      This is another paragraph. <em>This text is emphasised, so italic, maybe</em>,{' '}
      <strong>this text is strong, so bold perhaps?</strong> and{' '}
      <i>this text is italic, probably</i>.
    </p>
  </div>
);

export default SampleText;
