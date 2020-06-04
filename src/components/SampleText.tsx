import React from 'react';

import { useColours } from '../context';

const SampleText = (): JSX.Element => {
  const context = useColours();

  return (
    <section
      className="sample-text"
      style={{ background: context.selectedBG, color: context.selectedFG }}
    >
      <h1 style={{ color: context.selectedFG }}>Large Heading</h1>
      <p>
        Click on a colour combination block above to show that combination here.
        That will work with both the sufficiently contrasted and the ones which are
        too close in contrast.
      </p>

      <p>
        Click on a colour name in the list below to add the colour into the list
        above.
      </p>

      <p>
        This is another sample paragraph with differently styled text.
        <br />
        <em>
          This text is &lt;em&gt;phasised, which is usually displayed as italic.
        </em>
        <br />
        <strong>
          This text is &lt;strong&gt;, so generally it is shown as bold.
        </strong>
        <br />
        <i>This part should be in &lt;i&gt;talic text.</i>.
      </p>
    </section>
  );
};

export default SampleText;
