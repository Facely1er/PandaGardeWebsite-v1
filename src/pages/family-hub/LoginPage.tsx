import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from './AuthWrapper';
import { useToast } from '../../hooks/useToast';
import Logo from '../../components/Logo';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: 'parent' | 'child';
}

const LoginPage: React.FC = () => {
  const { redirectToFamilyHub } = useAuth();
  const { success, error: showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = async () => {
    setIsLoading(true);
    try {
      // In frontend-only mode, redirect to external family hub
      success('Redirecting to Family Hub for authentication...');
      setTimeout(() => {
        redirectToFamilyHub();
      }, 1000);
    } catch (error: any) {
      console.error('Auth error:', error);
      showError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
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
            Redirecting to Family Hub
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Authentication and family management are handled by our dedicated Family Hub project.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            You will be redirected automatically for secure authentication.
          </p>
        </div>

        {/* Redirect Message */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Redirecting to Family Hub
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              For security and better user experience, authentication is handled by our dedicated Family Hub project.
            </p>
          </div>

          <button
            onClick={handleRedirect}
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              'Redirecting...'
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Go to Family Hub
              </>
            )}
          </button>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              This ensures secure authentication and proper family management.
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