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

  const from = location.state?.from?.pathname || '/';

  // If user already logged in, redirect
  if (user) return <Navigate to={from} replace={true} />;

  // Email/Password Login
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

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
      <div className="flex justify-center items-center min-h-screen bg-[#f4f6f8]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-[#238ae9] to-[#1e7acc]
             rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white text-3xl font-bold font-['Satoshi']">C</span>
            </div>
            <div className="absolute -inset-1 border-4 border-[#238ae9] border-t-transparent rounded-2xl animate-spin"></div>
          </div>
          <p className="font-['Satoshi'] text-[#242424] font-medium text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        {/* Logo & Header */}
        <div className="text-center mb-8" data-aos="fade-down" data-aos-duration="600">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={true} />
          </div>
          <h2 className="font-['Satoshi'] text-3xl font-bold text-[#242424] mb-2">
            Welcome Back
          </h2>
          <p className="font-['Satoshi'] text-sm text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Login Card */}
        <div 
          className="bg-white rounded-2xl shadow-lg p-8" 
          data-aos="fade-up" 
          data-aos-duration="600" 
          data-aos-delay="200"
        >
          
          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading || isSubmitting}
            className="w-full flex items-center justify-center gap-3
             bg-white border-2 border-gray-200 hover:border-[#238ae9] 
             hover:bg-[#f4f6f8] rounded-xl px-4 py-3.5 font-['Satoshi'] 
             font-semibold text-[#242424] transition-all mb-6 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="font-['Satoshi'] text-sm text-gray-500 font-medium">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block font-['Satoshi'] font-semibold text-sm text-[#242424] mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <FiMail 
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" 
                  size={20} 
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f4f6f8] border-2
                   border-transparent rounded-xl font-['Satoshi'] text-[#242424] placeholder-gray-400
                    focus:outline-none focus:border-[#238ae9] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block font-['Satoshi'] font-semibold text-sm text-[#242424] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <FiLock 
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" 
                  size={20} 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  required
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 bg-[#f4f6f8] border-2
                   border-transparent rounded-xl font-['Satoshi'] text-[#242424]
                    placeholder-gray-400 focus:outline-none focus:border-[#238ae9]
                     focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#238ae9] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#238ae9] focus:ring-[#238ae9] cursor-pointer"
                />
                <span className="font-['Satoshi'] text-sm text-gray-600 group-hover:text-[#242424] transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="font-['Satoshi'] text-sm text-[#238ae9] hover:text-[#1e7acc] font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gradient-to-r from-[#238ae9] to-[#1e7acc] hover:from-[#1e7acc]
               hover:to-[#238ae9] text-white font-['Satoshi'] font-bold py-3.5 rounded-xl shadow-md 
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

          {/* Sign Up Link */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-center font-['Satoshi'] text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                state={{ from: location.state?.from }}
                className="text-[#238ae9] hover:text-[#1e7acc] font-bold transition-colors"
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
            className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] 
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