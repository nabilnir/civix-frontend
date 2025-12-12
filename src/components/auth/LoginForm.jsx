import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import FormInput from '../Shared/FormInput';

const LoginForm = ({ onSuccess }) => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success('Logged in successfully!');
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        toast.error('User not found. Please check your email.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address.');
      } else {
        toast.error(error.message || 'Login failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email"
        register={register}
        validation={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address',
          },
        }}
        error={errors.email?.message}
        icon={FiMail}
        required
      />

      <div className="relative">
        <FormInput
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          register={register}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          error={errors.password?.message}
          icon={FiLock}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded border-gray-300" />
          <span className="text-gray-600 font-['Satoshi']">Remember me</span>
        </label>
        <Link
          to="/forgot-password"
          className="text-[#238ae9] hover:underline font-['Satoshi']"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <p className="text-center text-sm text-gray-600 font-['Satoshi']">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#238ae9] hover:underline font-semibold">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

