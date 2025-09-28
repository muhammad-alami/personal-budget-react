import React from 'react';


export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(err, info) {
    console.error('ErrorBoundary caught:', err, info);
  }

  render() {
    if (this.state.hasError) {
      return <pre style={{ color: 'red' }}>{String(this.state.error)}</pre>;
    }
    return this.props.children;
  }
}
