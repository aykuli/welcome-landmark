import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorIndicator from './error-indicator';

// There i should to use class component because of componentDidCatch that did'n still realized in functional React
class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ isWasError: true });
  }

  render() {
    const { isWasError } = this.state;
    const { children } = this.props;

    return isWasError ? <ErrorIndicator /> : children;
  }
}

export default ErrorBoundry;

ErrorBoundry.defaultProps = {
  children: null,
};

ErrorBoundry.propTypes = {
  children: PropTypes.node,
};
