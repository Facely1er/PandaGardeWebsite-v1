import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';
import { reportError } from '../lib/sentry';

interface FeatureErrorBoundaryProps {
  children: ReactNode;
  featureName: string;
  onReset?: () => void;
  onClose?: () => void;
  fallback?: ReactNode;
}

interface FeatureErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class FeatureErrorBoundary extends Component<FeatureErrorBoundaryProps, FeatureErrorBoundaryState> {
  constructor(props: FeatureErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): FeatureErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Report to Sentry with feature context
    reportError(error, {
      feature: this.props.featureName,
      componentStack: errorInfo.componentStack,
    });

    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    this.props.onReset?.();
  };

  handleClose = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    this.props.onClose?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="feature-error-container">
          <div className="feature-error-content">
            <div className="feature-error-icon">
              <AlertTriangle size={48} className="text-amber-500" />
            </div>

            <h3 className="feature-error-title">
              Oops! Something went wrong
            </h3>

            <p className="feature-error-message">
              The {this.props.featureName} encountered an unexpected error.
              Don't worry - your progress is saved!
            </p>

            <div className="feature-error-actions">
              <button
                onClick={this.handleRetry}
                className="feature-error-retry"
              >
                <RefreshCw size={16} />
                Try Again
              </button>

              {this.props.onClose && (
                <button
                  onClick={this.handleClose}
                  className="feature-error-close"
                >
                  <X size={16} />
                  Close
                </button>
              )}
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="feature-error-details">
                <summary>Error Details (Development)</summary>
                <pre>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>

          <style>{`
            .feature-error-container {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 300px;
              padding: 20px;
              background: rgba(0, 0, 0, 0.05);
              border-radius: 8px;
            }

            .feature-error-content {
              text-align: center;
              max-width: 400px;
              padding: 24px;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }

            .feature-error-icon {
              margin-bottom: 16px;
            }

            .feature-error-icon svg {
              color: #f59e0b;
            }

            .feature-error-title {
              font-size: 18px;
              font-weight: 600;
              color: #1f2937;
              margin: 0 0 8px 0;
            }

            .feature-error-message {
              font-size: 14px;
              color: #6b7280;
              margin: 0 0 20px 0;
              line-height: 1.5;
            }

            .feature-error-actions {
              display: flex;
              gap: 12px;
              justify-content: center;
            }

            .feature-error-retry {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 10px 20px;
              background: #4CAF50;
              color: white;
              border: none;
              border-radius: 6px;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: background 0.2s;
            }

            .feature-error-retry:hover {
              background: #45a049;
            }

            .feature-error-close {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 10px 20px;
              background: #f3f4f6;
              color: #4b5563;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: background 0.2s;
            }

            .feature-error-close:hover {
              background: #e5e7eb;
            }

            .feature-error-details {
              margin-top: 20px;
              text-align: left;
            }

            .feature-error-details summary {
              cursor: pointer;
              font-size: 12px;
              color: #9ca3af;
              margin-bottom: 8px;
            }

            .feature-error-details pre {
              font-size: 10px;
              background: #f9fafb;
              padding: 12px;
              border-radius: 4px;
              overflow: auto;
              max-height: 150px;
              color: #ef4444;
            }

            @media (prefers-color-scheme: dark) {
              .feature-error-content {
                background: #1f2937;
              }

              .feature-error-title {
                color: #f9fafb;
              }

              .feature-error-message {
                color: #9ca3af;
              }

              .feature-error-details pre {
                background: #111827;
              }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default FeatureErrorBoundary;
