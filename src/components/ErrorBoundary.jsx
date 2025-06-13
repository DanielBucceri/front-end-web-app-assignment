import { Component } from 'react';
import { Link } from 'react-router-dom';

// global error boundary to catch unexpected render/runtime errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Unhandled error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>Please try again or return home.</p>
          <Link to="/">Go Home</Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
