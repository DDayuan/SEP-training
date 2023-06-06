import React from 'react';
import { ReduxContext } from './ReduxContext';

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {

  class ConnectedComponent extends React.Component {

    static contextType = ReduxContext;

    componentDidMount() {
      const { subscribe } = this.context;
      this.unsubscribe = subscribe(this.handleStoreChange);
      this.handleStoreChange();
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }

    handleStoreChange = () => {
      const { getState } = this.context;
      const stateProps = mapStateToProps(getState());
      this.setState(stateProps);
    };

    render() {
      const { dispatch } = this.context;
      const dispatchProps =
        typeof mapDispatchToProps === 'function'
          ? mapDispatchToProps(dispatch)
          : bindActionCreators(mapDispatchToProps, dispatch);

      return <WrappedComponent {...this.props} {...this.state} {...dispatchProps} />;
    }
  }

  return ConnectedComponent;
};

export default connect;
