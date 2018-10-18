import React, { Component } from 'react';

const Context = React.createContext();

export const SELECT_COLOUR = 'SELECT_COLOUR';

const reducer = (state, action) => {
  switch (action.type) {
    case SELECT_COLOUR:
      return { selectedBG: action.bg, selectedFG: action.fg };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    rgbs: ['#336699', '#669933', '#996633', '#663399', '#339966'],
    hsls: [],
    selectedBG: '#000000',
    selectedFG: '#ffffff',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
