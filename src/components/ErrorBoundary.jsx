import { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/errorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BC Eats error boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <div className="error-boundary__panel">
            <span className="error-boundary__badge">BC Eats</span>
            <h1 className="error-boundary__title">Something went wrong</h1>
            <p className="error-boundary__text">
              We hit a snag while loading your food experience. Please try again or head back to the menu.
            </p>

            <div className="error-boundary__actions">
              <button type="button" className="error-boundary__button error-boundary__button--primary" onClick={this.handleReset}>
                Try again
              </button>
              <Link to="/" className="error-boundary__button error-boundary__button--ghost">
                Back to menu
              </Link>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
