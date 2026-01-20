import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Logo from '../../components/Shared/Logo';

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading, saveUserToDatabase } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const from = location.state?.from?.pathname || '/';

  // If user already logged in, redirect
  if (user) return <Navigate to={from} replace={true} />;

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  // Demo login handlers - only fills credentials
  const handleDemoLogin = (email, password) => {
    setPasswordError('');

    // Auto-fill form fields
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;

    toast.success('Demo credentials filled. Click Sign In to continue.');
  };

  // Email/Password Login
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setPasswordError('');

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Validate password
    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      await signIn(email, password);
      toast.success('Welcome back to Civix!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);

      // User-friendly error messages
      if (err.code === 'auth/user-not-found') {
        toast.error('No account found with this email');
      } else if (err.code === 'auth/wrong-password') {
        toast.error('Incorrect password');
      } else if (err.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Too many failed attempts. Try again later');
      } else {
        toast.error('Login failed. Please try again');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();

      // Save user to database 
      await saveUserToDatabase({
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: 'citizen',
        isPremium: false,
        isBlocked: false,
        issueCount: 0
      });

      toast.success('Welcome to Civix!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Google login error:', err);
      setLoading(false);

      if (err.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in cancelled');
      } else if (err.code === 'auth/popup-blocked') {
        toast.error('Please allow popups for this site');
      } else {
        toast.error('Google sign-in failed');
      }
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80
             rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-primary-content text-3xl font-bold font-['Satoshi']">C</span>
            </div>
            <div className="absolute -inset-1 border-4 border-primary border-t-transparent rounded-2xl animate-spin"></div>
          </div>
          <p className="font-['Satoshi'] text-base-content font-medium text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">

        {/* Logo & Header */}
        <div className="text-center mb-8" data-aos="fade-down" data-aos-duration="600">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={true} />
          </div>
          <h2 className="font-['Satoshi'] text-3xl font-bold text-base-content mb-2">
            Welcome Back
          </h2>
          <p className="font-['Satoshi'] text-sm text-base-content/70">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Login Card */}
        <div
          className="bg-base-100 rounded-2xl shadow-lg p-8"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="200"
        >

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading || isSubmitting}
            className="w-full flex items-center justify-center gap-3
             bg-base-100 border-2 border-base-300 hover:border-primary 
             hover:bg-base-200 rounded-xl px-4 py-3.5 font-['Satoshi'] 
             font-semibold text-base-content transition-all mb-6 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-base-300"></div>
            <span className="font-['Satoshi'] text-sm text-base-content/50 font-medium">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-base-300"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block font-['Satoshi'] font-semibold text-sm text-base-content mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-base-200 border-2
                   border-transparent rounded-xl font-['Satoshi'] text-base-content placeholder-base-content/40
                    focus:outline-none focus:border-primary focus:bg-base-100 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block font-['Satoshi'] font-semibold text-sm text-base-content mb-2"
              >
                Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40"
                  size={20}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  required
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 bg-base-200 border-2
                   border-transparent rounded-xl font-['Satoshi'] text-base-content
                    placeholder-base-content/40 focus:outline-none focus:border-primary
                     focus:bg-base-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-error font-['Satoshi']">
                  {passwordError}
                </p>
              )}
              <p className="mt-2 text-xs text-base-content/50 font-['Satoshi']">
                Must be 8+ characters with uppercase, lowercase, number, and symbol
              </p>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-base-300 text-primary focus:ring-primary cursor-pointer"
                />
                <span className="font-['Satoshi'] text-sm text-base-content/70 group-hover:text-base-content transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="font-['Satoshi'] text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80
               hover:to-primary text-primary-content font-['Satoshi'] font-bold py-3.5 rounded-xl shadow-md 
               hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-6 pt-6 border-t border-base-200">
            <p className="text-center font-['Satoshi'] text-sm text-base-content/70 mb-4">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemoLogin('user@civix.com', 'User@123')}
                disabled={isSubmitting || loading}
                className="px-4 py-2.5 bg-info/10 text-info border-2 border-info/30 hover:bg-info/20 rounded-lg font-['Satoshi'] font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Demo User
              </button>
              <button
                onClick={() => handleDemoLogin('admin@civix.com', 'Uptod0Wn@')}
                disabled={isSubmitting || loading}
                className="px-4 py-2.5 bg-secondary/10 text-secondary border-2 border-secondary/30 hover:bg-secondary/20 rounded-lg font-['Satoshi'] font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Demo Admin
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 pt-6 border-t border-base-200">
            <p className="text-center font-['Satoshi'] text-sm text-base-content/70">
              Don't have an account?{' '}
              <Link
                to="/register"
                state={{ from: location.state?.from }}
                className="text-primary hover:text-primary/80 font-bold transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary 
            font-medium transition-colors inline-flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to home</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;