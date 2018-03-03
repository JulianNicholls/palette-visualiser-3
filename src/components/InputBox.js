import React from 'react';

import RGBInput from './RGBInput';
import HSLInputs from './HSLInputs';

class InputBox extends React.Component {
  render() {
    return (
      <div id="input-box">
        <span>Colour</span><span>RGB</span><span>HSL</span>
        <label htmlFor="rgb-1">First</label><RGBInput index={1} /><HSLInputs index={1} />
        <label htmlFor="rgb-2">Second</label><RGBInput index={2} /><HSLInputs index={2} />
        <label htmlFor="rgb-3">Third</label><RGBInput index={3} /><HSLInputs index={3} />
        <label htmlFor="rgb-4">Fourth</label><RGBInput index={4} /><HSLInputs index={4} />
        <label htmlFor="rgb-5">Fifth</label><RGBInput index={5} /><HSLInputs index={5} />
      </div>
    )
  }
}

export default InputBox;
