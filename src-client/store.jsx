/* eslint-disable react/no-multi-comp */
import React from 'react';

const StoreContext = React.createContext();
const createStore = (WrappedComponent) => (
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // eslint-disable-next-line react/destructuring-assignment
        get: (key) => this.state[key],
        set: (key, value) => {
          this.setState({ [key]: value });
        },
        remove: (key) => {
          this.setState({ [key]: undefined });
        }
      };
    }

    render() {
      return (
        <StoreContext.Provider value={this.state}>
          <WrappedComponent store={this.state} {...this.props} />
        </StoreContext.Provider>
      );
    }
  });

const withStore = (WrappedComponent) => (
  function Wrapper(props) {
    return (
      <StoreContext.Consumer>
        {(context) => <WrappedComponent store={context} {...props} />}
      </StoreContext.Consumer>
    );
  }
);

export { StoreContext, createStore, withStore };
