import React from 'react';
import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';
import { Link } from 'react-router';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertTriangle className="text-red-600" size={40} />
              </div>
              <h1 className="text-2xl font-bold text-[#242424] font-['Satoshi'] mb-2">
                Something went wrong
              </h1>
              <p className="text-gray-600 font-['Satoshi']">
                We're sorry, but something unexpected happened. Please try again.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                <p className="text-xs font-mono text-red-800 break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors"
              >
                <FiRefreshCw />
                Reload Page
              </button>
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-['Satoshi'] font-semibold hover:bg-gray-50 transition-colors"
              >
                <FiHome />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

