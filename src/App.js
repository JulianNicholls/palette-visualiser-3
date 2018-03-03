import React from 'react';

import InputBox from './components/InputBox';
import ColourInfo from './components/ColourInfo';

class App extends React.Component {
  state = {
    rgbs: ["#336699", "#336699", "#336699", "#336699", "#336699"],
    hsls: [
      { h: 210, s: 50, l: 40 },
      { h: 210, s: 50, l: 40 },
      { h: 210, s: 50, l: 40 },
      { h: 210, s: 50, l: 40 },
      { h: 210, s: 50, l: 40 }
    ],
    lines: [
      { rgbs: [51, 102, 153], rlum: 0.125, hsvs: [210, 67, 60] },
      { rgbs: [51, 102, 153], rlum: 0.125, hsvs: [210, 67, 60] },
      { rgbs: [51, 102, 153], rlum: 0.125, hsvs: [210, 67, 60] },
      { rgbs: [51, 102, 153], rlum: 0.125, hsvs: [210, 67, 60] },
      { rgbs: [51, 102, 153], rlum: 0.125, hsvs: [210, 67, 60] }
    ]
  };

  render() {
    return (
      <div>
        <h1>Palette Visualiser</h1>
        <div className="container">
          <div id="top-section">
            <InputBox />
            <ColourInfo lines={this.state.lines} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
