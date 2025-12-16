import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiUser, FiMail, FiCamera } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { uploadImage as uploadImageUtil, validateImage } from '../../../Utils/imageUpload';

const StaffProfile = () => {
  const { user, updateUserProfile, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // get staff profile data
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['staffProfile', user?.email],
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
        phone: profileData.phone || '',
      });
    }
  }, [profileData, user, reset]);

  // upload image function using centralized utility
  const uploadImage = async (file) => {
    // Validate before upload
    const validation = validateImage(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    return await uploadImageUtil(file);
  };

  // update profile mutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      let photoURL = profileData?.photoURL || user?.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png';
      
      // upload image if new one selected
      if (imageFile) {
        const loadingToast = toast.loading('Uploading image...');
        try {
          photoURL = await uploadImage(imageFile);
          toast.dismiss(loadingToast);
        } catch (error) {
          toast.dismiss(loadingToast);
          throw error;
        }
      }
      
      // update firebase if name or photo changed
      const nameChanged = data.name !== user?.displayName;
      const photoChanged = imageFile && photoURL !== user?.photoURL;
      
      if (nameChanged || photoChanged) {
        try {
          await updateUserProfile(data.name, photoURL);
        } catch (error) {
          console.error('Firebase update error:', error);
        }
      }
      
      // update database
      const updateData = {
        name: data.name,
        photoURL: photoURL,
      };
      
      if (data.phone) {
        updateData.phone = data.phone;
      }
      
      const res = await axiosSecure.patch(`/api/staff/${user.email}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['staffProfile']);
      queryClient.invalidateQueries(['userRole']);
      toast.success('Profile updated successfully');
      setImageFile(null);
      setImagePreview(null);
    },
    onError: (error) => {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to update profile');
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out. Please try again.');
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          Update your profile information
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-[#242424] font-['Satoshi'] mb-6">
          Personal Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* profile picture */}
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
                {profileData?.name || user?.displayName || 'Staff Member'}
              </p>
              <p className="font-['Satoshi'] text-sm text-gray-500">
                {user?.email}
              </p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold font-['Satoshi']">
                Staff
              </span>
            </div>
          </div>

          {/* name */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
              Full Name *
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* phone */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
              Phone Number
            </label>
            <input
              {...register('phone')}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
              placeholder="Enter phone number"
            />
          </div>

          {/* email read only */}
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

          {/* submit button */}
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="w-full px-6 py-3 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateMutation.isPending ? 'Updating...' : 'Update Profile'}
          </button>

          {/* logout button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-6 py-3 mt-3 border border-red-200 text-red-600 rounded-lg font-['Satoshi'] font-semibold hover:bg-red-50 transition-colors"
          >
            Log Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffProfile;
