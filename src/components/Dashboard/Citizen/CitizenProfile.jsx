import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiUser, FiMail, FiCamera, FiAlertTriangle } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';
import { uploadImage as uploadImageUtil, validateImage } from '../../../Utils/imageUpload';
import SubscriptionCard from './SubscriptionCard';

const CitizenProfile = () => {
  const { user, updateUserProfile, logOut } = useAuth();
  const { role, isPremium, isBlocked, userData } = useRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Fetch user data
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      try {
        const res = await axiosSecure.get(`/api/auth/users/${user.email}`);
        return res.data.data || {};
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return {};
      }
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.name || user?.displayName || '',
        photoURL: profileData.photoURL || user?.photoURL || '',
      });
    }
  }, [profileData, user, reset]);

  // Upload image using centralized utility
  const uploadImage = async (file) => {
    // Validate before upload
    const validation = validateImage(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    return await uploadImageUtil(file);
  };

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      let photoURL = profileData?.photoURL || user?.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png';

      // Upload image if a new one is selected
      if (imageFile) {
        const loadingToast = toast.loading('Uploading image...');
        try {
          photoURL = await uploadImage(imageFile);
          toast.dismiss(loadingToast);
          toast.success('Image uploaded successfully');
        } catch (error) {
          toast.dismiss(loadingToast);
          // Keep existing photoURL if upload fails
          throw error;
        }
      }

      // Update Firebase profile if name or photo changed
      const nameChanged = data.name !== user?.displayName;
      const photoChanged = imageFile && photoURL !== user?.photoURL;

      if (nameChanged || photoChanged) {
        try {
          await updateUserProfile(data.name, photoURL);
        } catch (error) {
          console.error('Firebase profile update error:', error);
          // Continue with database update even if Firebase fails
        }
      }

      // Update database
      const res = await axiosSecure.patch(`/api/auth/users/${user.email}`, {
        name: data.name,
        photoURL: photoURL,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
      queryClient.invalidateQueries(['userRole']);
      queryClient.invalidateQueries(['userStats']);
      toast.success('Profile updated successfully');
      setImageFile(null);
      setImagePreview(null);
    },
    onError: (error) => {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to update profile. Please try again.');
    },
  });

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  // Create Stripe checkout session mutation
  const createCheckoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post('/api/payments/create-checkout-session', {
        amount: 1000,
        type: 'premium_subscription',
      });
      return res.data;
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to create checkout session');
      }
    },
    onError: (error) => {
      console.error('Checkout session error:', error);
      toast.error(error.response?.data?.message || 'Failed to create checkout session. Please try again.');
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubscribe = () => {
    Swal.fire({
      title: 'Subscribe to Premium?',
      text: 'Pay 1000tk to unlock unlimited issue reports and premium features. You will be redirected to Stripe to complete the payment.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#238ae9',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Pay 1000tk',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        createCheckoutMutation.mutate();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-base-content font-['Satoshi'] mb-2">
          My Profile
        </h1>
        <p className="text-sm md:text-base text-base-content/70 font-['Satoshi']">
          Manage your account information and subscription
        </p>
      </div>

      {/* Blocked Warning */}
      {isBlocked && (
        <div className="bg-error/10 border border-error/20 rounded-xl p-3 md:p-4 flex items-start gap-2 md:gap-3">
          <FiAlertTriangle className="text-error text-lg md:text-xl flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h3 className="font-bold text-error font-['Satoshi'] mb-1 text-sm md:text-base">
              Account Blocked
            </h3>
            <p className="text-error/80 text-xs md:text-sm font-['Satoshi']">
              Your account has been blocked by the administrator. Please contact the authorities for assistance.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Profile Form */}
        <div className="lg:col-span-2 bg-base-100 rounded-xl p-4 md:p-6 shadow-sm border border-base-300">
          <h2 className="text-lg md:text-xl font-bold text-base-content font-['Satoshi'] mb-4 md:mb-6">
            Personal Information
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              <div className="relative flex-shrink-0">
                <img
                  src={imagePreview || profileData?.photoURL || user?.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
                  alt="Profile"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover object-top border-4 border-primary"
                  style={{ objectPosition: 'center top' }}
                />
                <label className="absolute bottom-0 right-0 p-1.5 md:p-2 bg-primary text-primary-content rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                  <FiCamera size={14} className="md:w-4 md:h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex-1 text-center sm:text-left min-w-0">
                <p className="font-['Satoshi'] font-semibold text-base-content text-base md:text-lg truncate">
                  {profileData?.name || user?.displayName || 'User'}
                </p>
                <p className="font-['Satoshi'] text-xs md:text-sm text-base-content/60 break-all">
                  {user?.email}
                </p>
                {isPremium && (
                  <span className="inline-flex items-center gap-1 mt-2 px-2 md:px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs font-bold font-['Satoshi']">
                    <FaCrown size={10} className="md:w-3 md:h-3" /> Premium Member
                  </span>
                )}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-base-content font-['Satoshi'] mb-2">
                Full Name *
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-base-300 bg-base-100 text-base-content rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isBlocked}
              />
              {errors.name && (
                <p className="text-error text-xs md:text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-base-content font-['Satoshi'] mb-2">
                Email
              </label>
              <div className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-base-200 border border-base-300 rounded-lg min-w-0">
                <FiMail className="text-base-content/50 flex-shrink-0" size={18} />
                <span className="font-['Satoshi'] text-base-content/80 text-xs md:text-sm break-all">{user?.email}</span>
              </div>
              <p className="text-xs text-base-content/50 mt-1">Email cannot be changed</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isBlocked || updateMutation.isPending}
              className="w-full px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-content rounded-lg font-['Satoshi'] font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending ? 'Updating...' : 'Update Profile'}
            </button>

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base border border-error/50 text-error rounded-lg font-['Satoshi'] font-semibold hover:bg-error/10 transition-colors"
            >
              Log Out
            </button>
          </form>
        </div>

        {/* Subscription Card */}
        <div className="space-y-4 md:space-y-6">
          <SubscriptionCard
            isPremium={isPremium}
            isBlocked={isBlocked}
            issueCount={profileData?.issueCount || 0}
            onSubscribe={handleSubscribe}
            isLoading={createCheckoutMutation.isPending}
          />

          {/* Account Stats */}
          <div className="bg-base-100 rounded-xl p-4 md:p-6 shadow-sm border border-base-300">
            <h3 className="text-base md:text-lg font-bold text-base-content font-['Satoshi'] mb-3 md:mb-4">
              Account Statistics
            </h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-['Satoshi'] text-sm md:text-base text-base-content/70">Total Issues</span>
                <span className="font-['Satoshi'] text-sm md:text-base font-bold text-base-content">
                  {profileData?.issueCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-['Satoshi'] text-sm md:text-base text-base-content/70">Role</span>
                <span className="font-['Satoshi'] text-sm md:text-base font-bold text-base-content capitalize">
                  {role}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-['Satoshi'] text-sm md:text-base text-base-content/70">Member Since</span>
                <span className="font-['Satoshi'] text-sm md:text-base font-bold text-base-content">
                  {profileData?.createdAt
                    ? new Date(profileData.createdAt).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenProfile;
