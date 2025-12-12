import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiGithub, FiFacebook } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const SocialLogin = ({ onSuccess, disabled = false }) => {
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
      toast.error(error.message || 'Google sign in failed');
    }
  };

  const handleGithubSignIn = () => {
    toast.error('GitHub sign in is not available yet');
  };

  const handleFacebookSignIn = () => {
    toast.error('Facebook sign in is not available yet');
  };

  const socialButtons = [
    {
      id: 'google',
      icon: <FcGoogle size={24} />,
      label: 'Google',
      onClick: handleGoogleSignIn,
      available: true,
    },
    {
      id: 'github',
      icon: <FiGithub size={24} className="text-[#242424]" />,
      label: 'GitHub',
      onClick: handleGithubSignIn,
      available: false,
    },
    {
      id: 'facebook',
      icon: <FiFacebook size={24} className="text-blue-600" />,
      label: 'Facebook',
      onClick: handleFacebookSignIn,
      available: false,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-500 font-['Satoshi']">Or continue with</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {socialButtons.map((button) => (
          <button
            key={button.id}
            onClick={button.onClick}
            disabled={loading || disabled || !button.available}
            className={`
              flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2
              transition-all font-['Satoshi'] text-sm
              ${
                button.available
                  ? 'border-gray-200 hover:border-[#238ae9] hover:bg-[#f4f6f8] cursor-pointer'
                  : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            title={button.available ? `Sign in with ${button.label}` : 'Coming soon'}
          >
            {button.icon}
            <span className="text-xs text-gray-600">{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;

