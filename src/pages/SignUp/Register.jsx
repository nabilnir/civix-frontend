import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';

import { toast } from 'react-hot-toast';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiImage } from 'react-icons/fi';
import { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { uploadImage as uploadImageUtil } from '../../Utils/imageUpload';
import { validatePassword } from '../../Utils/passwordValidation';
import Logo from '../../components/Shared/Logo';

const Register = () => {
  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,
    loading,
    setLoading,
    saveUserToDatabase
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const from = location.state?.from?.pathname || '/';

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to ImgBB (returns default avatar on error)
  const uploadImage = async (imageFile) => {
    if (!imageFile) {
      return 'https://i.ibb.co/2W8Py4W/default-avatar.png';
    }

    try {
      return await uploadImageUtil(imageFile);
    } catch (error) {
      console.error('Image upload failed:', error);
      return 'https://i.ibb.co/2W8Py4W/default-avatar.png'; // Default avatar
    }
  };

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.image.files[0];

    // Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message);
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Upload image
      let photoURL = 'https://i.ibb.co/2W8Py4W/default-avatar.png';
      if (imageFile) {
        toast.loading('Uploading image...');
        photoURL = await uploadImage(imageFile);
        toast.dismiss();
      }

      // 2. Create user in Firebase
      await createUser(email, password);

      // 3. Update profile with name & photo
      await updateUserProfile(name, photoURL);

      // 4. Save user to MongoDB
      await saveUserToDatabase({
        name,
        email,
        photoURL,
        role: 'citizen',
        isPremium: false,
        isBlocked: false,
        issueCount: 0
      });

      navigate(from, { replace: true });
      toast.success('Welcome to Civix! 🎉');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        toast.error('Email already registered');
      } else {
        toast.error(err.message || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google Signin
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

      navigate(from, { replace: true });
      toast.success('Welcome to Civix! 🎉');
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error('Google sign-up failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-primary-content text-3xl font-bold font-['Satoshi']">C</span>
            </div>
            <div className="absolute -inset-1 border-4 border-primary border-t-transparent rounded-2xl animate-spin"></div>
          </div>
          <p className="font-['Satoshi'] text-base-content font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">

        {/* Logo & Header */}
        <div className="text-center mb-8" data-aos="fade-down">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={true} />
          </div>
          <h2 className="font-['Satoshi'] text-3xl font-bold text-base-content mb-2">
            Create Account
          </h2>
          <p className="font-['Satoshi'] text-sm text-base-content/70">
            Join us in building better communities
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-8" data-aos="fade-up">

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-base-100 border-2 border-base-300 hover:border-primary hover:bg-base-200 rounded-xl px-4 py-3 font-['Satoshi'] font-medium text-base-content transition-all mb-6"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-base-300"></div>
            <span className="font-['Satoshi'] text-sm text-base-content/50">or sign up with email</span>
            <div className="flex-1 h-px bg-base-300"></div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block font-['Satoshi'] font-semibold text-sm text-base-content mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-base-200 border-2 border-transparent rounded-xl font-['Satoshi'] text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary focus:bg-base-100 transition-all"
                />
              </div>
            </div>

            {/* Profile Image Upload */}
            <div>
              <label htmlFor="image" className="block font-['Satoshi'] font-semibold text-sm text-base-content mb-2">
                Profile Photo (Optional)
              </label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-xl object-cover border-2 border-primary"
                  />
                )}
                <label
                  htmlFor="image"
                  className="flex-1 flex items-center justify-center gap-2 bg-base-200 border-2 border-dashed border-base-300 hover:border-primary rounded-xl px-4 py-3 cursor-pointer transition-all group"
                >
                  <FiImage className="text-base-content/40 group-hover:text-primary transition-colors" size={20} />
                  <span className="font-['Satoshi'] text-sm text-base-content/70 group-hover:text-primary transition-colors">
                    Choose Image
                  </span>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="font-['Satoshi'] text-xs text-base-content/50 mt-1">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-['Satoshi'] font-semibold text-sm text-base-content mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-base-200 border-2 border-transparent rounded-xl font-['Satoshi'] text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary focus:bg-base-100 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-['Satoshi'] font-semibold text-sm text-base-content mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  required
                  placeholder="Enter a strong password"
                  minLength={8}
                  className="w-full pl-11 pr-12 py-3 bg-base-200 border-2 border-transparent rounded-xl font-['Satoshi'] text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary focus:bg-base-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              <p className="font-['Satoshi'] text-xs text-base-content/50 mt-1">
                Must be 8+ characters with uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary text-primary-content font-['Satoshi'] font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 font-['Satoshi'] text-sm text-base-content/70">
            Already have an account?{' '}
            <Link
              to="/login"
              state={{ from: location.state?.from }}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;