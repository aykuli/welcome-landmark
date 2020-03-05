import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator';

class ErrorBoundry extends Component {
    state = {
        isWasError: false,
    }

    componentDidCatch() {
        this.setState({ isWasError : true });
    }

    render() {
        return this.state.isWasError ? <ErrorIndicator /> : this.props.children;
    }
}

export default ErrorBoundry;