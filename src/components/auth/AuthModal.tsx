import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const result = await signIn(email, password);
        if (result.success) {
          onClose();
        }
      } else {
        if (password !== confirmPassword) {
          showError('Password Mismatch', 'Passwords do not match');
          return;
        }
        const result = await signUp(email, password);
        if (result.success) {
          onClose();
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  if (!isOpen) {return null;}

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="auth-modal-header">
          <h2>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <Lock size={16} />
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                <Lock size={16} />
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="auth-submit-button"
          >
            {isLoading ? 'Please wait...' : (mode === 'signin' ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-modal-footer">
          <p>
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={switchMode} className="switch-mode-button">
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <style jsx>{`
          .auth-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .auth-modal {
            background: white;
            border-radius: 12px;
            width: 100%;
            max-width: 400px;
            margin: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          .auth-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e0e0e0;
          }

          .auth-modal-header h2 {
            margin: 0;
            color: #2C3E50;
            font-size: 24px;
          }

          .close-button {
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            padding: 4px;
          }

          .auth-form {
            padding: 20px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            color: #2C3E50;
            margin-bottom: 8px;
            font-size: 14px;
          }

          .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.2s;
          }

          .form-input:focus {
            outline: none;
            border-color: #4CAF50;
          }

          .password-input-container {
            position: relative;
          }

          .password-toggle {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            padding: 4px;
          }

          .auth-submit-button {
            width: 100%;
            background: #4CAF50;
            color: white;
            border: none;
            padding: 16px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }

          .auth-submit-button:hover:not(:disabled) {
            background: #45a049;
          }

          .auth-submit-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .auth-modal-footer {
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
          }

          .auth-modal-footer p {
            margin: 0;
            color: #666;
          }

          .switch-mode-button {
            background: none;
            border: none;
            color: #4CAF50;
            cursor: pointer;
            font-weight: 600;
            text-decoration: underline;
          }

          .switch-mode-button:hover {
            color: #45a049;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AuthModal;