import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const GoogleSignIn = ({ onSuccess, disabled = false }) => {
  const { signInWithGoogle, loading } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Logged in with Google successfully!');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign in cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Popup blocked. Please allow popups and try again.');
      } else {
        toast.error(error.message || 'Google sign in failed. Please try again.');
      }
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={loading || disabled}
      className="w-full flex items-center justify-center gap-3
       bg-white border-2 border-gray-200 hover:border-[#238ae9]
        hover:bg-[#f4f6f8] rounded-xl px-4 py-3.5 font-['Satoshi']
         font-semibold text-[#242424] transition-all disabled:opacity-50 
         disabled:cursor-not-allowed group shadow-sm hover:shadow-md"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#238ae9]"></div>
          <span>Signing in...</span>
        </>
      ) : (
        <>
          <FcGoogle size={24} className="group-hover:scale-110 transition-transform" />
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
};

export default GoogleSignIn;

