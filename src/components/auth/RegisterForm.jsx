import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import FormInput from '../Shared/FormInput';

const RegisterForm = ({ onSuccess }) => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      // Create user with email and password
      const userCredential = await createUser(data.email, data.password);

      // Update profile with name
      if (data.name) {
        await updateUserProfile(data.name, null);
      }

      toast.success('Account created successfully!');
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already registered. Please sign in instead.');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password is too weak. Please use a stronger password.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address.');
      } else {
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormInput
        label="Full Name"
        name="name"
        type="text"
        placeholder="Enter your full name"
        register={register}
        validation={{
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        }}
        error={errors.name?.message}
        icon={FiUser}
        required
      />

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
          className="absolute right-3 top-10 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      <div className="relative">
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          register={register}
          validation={{
            required: 'Please confirm your password',
            validate: (value) =>
              value === password || 'Passwords do not match',
          }}
          error={errors.confirmPassword?.message}
          icon={FiLock}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-10 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
        >
          {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          {...register('terms', {
            required: 'You must agree to the terms and conditions',
          })}
          className="mt-1 rounded border-gray-300"
        />
        <label htmlFor="terms" className="text-sm text-gray-600 font-['Satoshi']">
          I agree to the{' '}
          <Link to="/terms" className="text-[#238ae9] hover:underline">
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-[#238ae9] hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-sm font-['Satoshi']">{errors.terms.message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-[#238ae9] text-white rounded-lg
         font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <p className="text-center text-sm text-gray-600 font-['Satoshi']">
        Already have an account?{' '}
        <Link to="/login" className="text-[#238ae9] hover:underline font-semibold">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;

