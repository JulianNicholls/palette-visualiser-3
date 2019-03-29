import React, { useContext } from 'react';

import { ColourContext } from '../context';

const SampleText = () => {
  const context = useContext(ColourContext);

  return (
    <section
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
        This is another paragraph with differently styled text.{' '}
        <em>
          This text is &lt;em&gt;phasised, which is usually displayed as italic.
        </em>
        ,br />
        <strong>
          This text is &lt;strong&gt;, so generally it is shown as bold.
        </strong>{' '}
        <i>This part should be in &lt;i&gt;talic text.</i>.
      </p>
    </section>
  );
};

export default SampleText;
