import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import { authService } from '../../lib/database';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await authService.signIn(formData.email, formData.password);
      
      if (error) {
        showError('Login Failed', error.message);
        return;
      }

      showSuccess('Welcome Back!', 'You have successfully logged in.');
      onSuccess();
    } catch (error) {
      showError('Login Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
          Welcome Back
        </h2>
        <p style={{ color: 'var(--gray-600)' }}>
          Sign in to continue your privacy learning journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          leftIcon={<Mail size={20} />}
          placeholder="Enter your email"
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            leftIcon={<Lock size={20} />}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full"
        >
          <LogIn size={20} className="mr-2" />
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p style={{ color: 'var(--gray-600)' }}>
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-green-600 hover:text-green-700 font-semibold"
            style={{ color: 'var(--primary-light)' }}
          >
            Create one here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;