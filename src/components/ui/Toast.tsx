import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  action
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
        return <Info size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: '#f0f9ff',
          border: '#10b981',
          icon: '#10b981',
          text: '#065f46'
        };
      case 'error':
        return {
          bg: '#fef2f2',
          border: '#ef4444',
          icon: '#ef4444',
          text: '#991b1b'
        };
      case 'warning':
        return {
          bg: '#fffbeb',
          border: '#f59e0b',
          icon: '#f59e0b',
          text: '#92400e'
        };
      case 'info':
        return {
          bg: '#eff6ff',
          border: '#3b82f6',
          icon: '#3b82f6',
          text: '#1e40af'
        };
      default:
        return {
          bg: '#f9fafb',
          border: '#6b7280',
          icon: '#6b7280',
          text: '#374151'
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`toast ${isVisible ? 'toast-visible' : ''} ${isLeaving ? 'toast-leaving' : ''}`}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text
      }}
    >
      <div className="toast-content">
        <div className="toast-icon" style={{ color: colors.icon }}>
          {getIcon()}
        </div>
        <div className="toast-body">
          <div className="toast-title">{title}</div>
          {message && <div className="toast-message">{message}</div>}
          {action && (
            <button
              className="toast-action"
              onClick={action.onClick}
              style={{ color: colors.icon }}
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          className="toast-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
      <div className="toast-progress">
        <div
          className="toast-progress-bar"
          style={{
            backgroundColor: colors.border,
            animationDuration: `${duration}ms`
          }}
        />
      </div>
    </div>
  );
};

export default Toast;