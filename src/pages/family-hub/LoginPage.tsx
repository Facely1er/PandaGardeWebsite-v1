import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, UserPlus, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from './AuthWrapper';
import { useToast } from '../../hooks/useToast';
import Logo from '../../components/Logo';
import { useAgeVerification } from '../../contexts/AgeVerificationContext';

type Tab = 'signin' | 'signup';

const LoginPage: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const { success, error: showError } = useToast();
  const { verifyAge } = useAgeVerification();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from ?? '/family-hub';

  const [tab, setTab] = useState<Tab>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Sign in fields
  const [siEmail, setSiEmail] = useState('');
  const [siPassword, setSiPassword] = useState('');

  // Sign up fields
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suConfirm, setSuConfirm] = useState('');
  const [suFirstName, setSuFirstName] = useState('');
  const [suLastName, setSuLastName] = useState('');
  const [suRole, setSuRole] = useState<'parent' | 'child'>('parent');
  const [suAge, setSuAge] = useState('');
  const [suParentEmail, setSuParentEmail] = useState('');

  const isChildUnder13 = suRole === 'child' && parseInt(suAge) < 13 && suAge !== '';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await signIn(siEmail, siPassword);
      if (error) {
        showError(error.message ?? 'Sign in failed');
      } else {
        success('Welcome back!');
        navigate(from, { replace: true });
      }
    } catch {
      showError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (suPassword !== suConfirm) {
      showError('Passwords do not match');
      return;
    }
    if (suPassword.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }
    if (suRole === 'child' && !suAge) {
      showError('Please enter your age');
      return;
    }
    if (isChildUnder13 && !suParentEmail) {
      showError('A parent email is required for users under 13');
      return;
    }

    const age = suRole === 'child' ? parseInt(suAge) : undefined;

    setIsLoading(true);
    try {
      const { error } = await signUp(suEmail, suPassword, {
        firstName: suFirstName,
        lastName: suLastName,
        role: suRole,
      });

      if (error) {
        showError(error.message ?? 'Sign up failed');
        return;
      }

      // Run COPPA age verification for child accounts
      if (suRole === 'child' && age !== undefined) {
        const result = await verifyAge(age, isChildUnder13 ? suParentEmail : undefined);
        if (!result.success) {
          showError(result.error ?? 'Age verification failed');
          return;
        }
        // verifyAge handles navigation:
        // - under 13 → /parental-consent/pending
        // - 13+ → age-appropriate route
        success(
          age < 13
            ? 'Account created! A consent email has been sent to your parent.'
            : 'Account created! Welcome to PandaGarde.'
        );
      } else {
        // Parent account — go straight to family hub
        success('Account created! Welcome to PandaGarde Family Hub.');
        navigate('/family-hub', { replace: true });
      }
    } catch {
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
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16">
              <Logo />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">PandaGarde Family Hub</h2>
          <p className="mt-2 text-sm text-gray-600">Your family's digital safety companion</p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-3 text-sm font-medium focus:outline-none ${
                tab === 'signin'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LogIn className="inline w-4 h-4 mr-1" />
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-3 text-sm font-medium focus:outline-none ${
                tab === 'signup'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <UserPlus className="inline w-4 h-4 mr-1" />
              Create Account
            </button>
          </div>

          <div className="p-6">
            {tab === 'signin' ? (
              /* ── Sign In Form ── */
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={siEmail}
                    onChange={e => setSiEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={siPassword}
                      onChange={e => setSiPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            ) : (
              /* ── Sign Up Form ── */
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={suFirstName}
                      onChange={e => setSuFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="First"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={suLastName}
                      onChange={e => setSuLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Last"
                    />
                  </div>
                </div>

                {/* Role selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['parent', 'child'] as const).map(role => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => { setSuRole(role); setSuAge(''); setSuParentEmail(''); }}
                        className={`py-2 px-3 rounded-md text-sm font-medium border-2 capitalize ${
                          suRole === role
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {role === 'parent' ? '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 Parent' : '\uD83E\uDDD2 Child'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age field — only for children */}
                {suRole === 'child' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      required
                      min={5}
                      max={17}
                      value={suAge}
                      onChange={e => setSuAge(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Your age (5–17)"
                    />
                  </div>
                )}

                {/* Parent email — required for under-13 */}
                {isChildUnder13 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                    <p className="text-xs text-amber-800 font-medium mb-2">
                      Parental consent required (COPPA)
                    </p>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Email</label>
                    <input
                      type="email"
                      required
                      value={suParentEmail}
                      onChange={e => setSuParentEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="parent@example.com"
                    />
                    <p className="text-xs text-amber-700 mt-1">
                      A consent email will be sent to this address. The account will have limited access until your parent approves.
                    </p>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={suEmail}
                    onChange={e => setSuEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={suPassword}
                      onChange={e => setSuPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={suConfirm}
                    onChange={e => setSuConfirm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to main site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
