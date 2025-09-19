import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { useAuth } from './AuthWrapper';
import { useToast } from '../../hooks/useToast';
import Logo from '../../components/Logo';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { error: showError, success: showSuccess } = useToast();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'parent' as 'parent' | 'child'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          showError(`Sign in failed: ${error.message}`);
        } else {
          showSuccess('Welcome back!');
          navigate('/family-hub');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          showError('Passwords do not match');
          return;
        }
        
        const { error } = await signUp(formData.email, formData.password, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role
        });
        
        if (error) {
          showError(`Sign up failed: ${error.message}`);
        } else {
          showSuccess('Account created successfully!');
          navigate('/family-hub');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      showError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      role: 'parent'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16">
              <Logo />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {mode === 'signin' ? 'Welcome Back' : 'Join Family Hub'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'signin' 
              ? 'Sign in to access your family\'s privacy learning journey'
              : 'Create an account to start your family\'s privacy education'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required={mode === 'signup'}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required={mode === 'signup'}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your password"
                  minLength={6}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required={mode === 'signup'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Confirm your password"
                    minLength={6}
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                'Please wait...'
              ) : (
                <>
                  {mode === 'signin' ? (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create Account
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={switchMode}
                className="font-medium text-green-600 hover:text-green-500"
              >
                {mode === 'signin' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>

        {/* Back to main site */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to main site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;