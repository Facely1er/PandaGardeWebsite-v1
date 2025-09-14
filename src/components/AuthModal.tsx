import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import PasswordResetForm from './forms/PasswordResetForm';

type AuthMode = 'login' | 'register' | 'reset';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'login',
  onSuccess 
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
  };

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToRegister={() => handleModeChange('register')}
            onForgotPassword={() => handleModeChange('reset')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => handleModeChange('login')}
          />
        );
      case 'reset':
        return (
          <PasswordResetForm
            onSuccess={handleSuccess}
            onBackToLogin={() => handleModeChange('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="p-6">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;