import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiUser, FiMail, FiCamera, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';
import { handlePayment } from '../../../Utils/payment';
import SubscriptionCard from './SubscriptionCard';

const CitizenProfile = () => {
  const { user, updateUserProfile } = useAuth();
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
      const res = await axiosSecure.get(`/api/auth/users/${user.email}`);
      return res.data.data;
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

  // Upload image
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    
    if (!imgbbApiKey || imgbbApiKey === 'your-imgbb-api-key') {
      toast.error('Image upload service not configured. Please contact administrator.');
      throw new Error('Image upload service not configured');
    }
    
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data?.url) {
        return data.data.url;
      }
      
      throw new Error(data.error?.message || 'Image upload failed');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error(error.message || 'Failed to upload image. Please try again.');
      throw error; // Re-throw to handle in mutation
    }
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

  // Premium subscription mutation
  const subscribeMutation = useMutation({
    mutationFn: async () => {
      // Handle payment (1000tk)
      const paymentResult = await handlePayment(1000, 'premium_subscription');
      
      if (paymentResult.success) {
        // Update user to premium
        await axiosSecure.patch(`/api/users/${user.email}/premium`);
        return paymentResult;
      }
      throw new Error('Payment failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userRole']);
      queryClient.invalidateQueries(['userProfile']);
      toast.success('Premium subscription activated!');
    },
    onError: () => {
      toast.error('Payment failed. Please try again.');
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
      text: 'Pay 1000tk to unlock unlimited issue reports and premium features.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#238ae9',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Pay 1000tk',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        subscribeMutation.mutate();
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          Manage your account information and subscription
        </p>
      </div>

      {/* Blocked Warning */}
      {isBlocked && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <FiAlertTriangle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-700 font-['Satoshi'] mb-1">
              Account Blocked
            </h3>
            <p className="text-red-600 text-sm font-['Satoshi']">
              Your account has been blocked by the administrator. Please contact the authorities for assistance.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#242424] font-['Satoshi'] mb-6">
            Personal Information
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={imagePreview || profileData?.photoURL || user?.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#238ae9]"
                />
                <label className="absolute bottom-0 right-0 p-2 bg-[#238ae9] text-white rounded-full cursor-pointer hover:bg-[#1e7acc] transition-colors">
                  <FiCamera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="font-['Satoshi'] font-semibold text-[#242424]">
                  {profileData?.name || user?.displayName || 'User'}
                </p>
                <p className="font-['Satoshi'] text-sm text-gray-500">
                  {user?.email}
                </p>
                {isPremium && (
                  <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs font-bold font-['Satoshi']">
                    👑 Premium Member
                  </span>
                )}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                Full Name *
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
                disabled={isBlocked}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                Email
              </label>
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                <FiMail className="text-gray-400" />
                <span className="font-['Satoshi'] text-gray-700">{user?.email}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isBlocked || updateMutation.isPending}
              className="w-full px-6 py-3 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Subscription Card */}
        <div className="space-y-6">
          <SubscriptionCard
            isPremium={isPremium}
            isBlocked={isBlocked}
            issueCount={profileData?.issueCount || 0}
            onSubscribe={handleSubscribe}
            isLoading={subscribeMutation.isPending}
          />

          {/* Account Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
              Account Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-['Satoshi'] text-gray-600">Total Issues</span>
                <span className="font-['Satoshi'] font-bold text-[#242424]">
                  {profileData?.issueCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-['Satoshi'] text-gray-600">Role</span>
                <span className="font-['Satoshi'] font-bold text-[#242424] capitalize">
                  {role}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-['Satoshi'] text-gray-600">Member Since</span>
                <span className="font-['Satoshi'] font-bold text-[#242424]">
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
