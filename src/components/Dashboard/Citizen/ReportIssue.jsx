import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { FiUpload, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';

const ReportIssue = () => {
  const { user } = useAuth();
  const { isBlocked, isPremium, userData } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Check issue limit
  const issueCount = userData?.issueCount || 0;
  const canReport = isPremium || issueCount < 3;

  // Upload image to imgbb or similar
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    // Using imgbb API (you can replace with your preferred image hosting)
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY || 'your-imgbb-api-key';
    
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      }
      throw new Error('Image upload failed');
    } catch (error) {
      console.error('Image upload error:', error);
      // Fallback: return a placeholder or handle error
      return 'https://via.placeholder.com/800x600?text=Issue+Image';
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data) => {
      let imageUrl = '';
      
      if (imageFile) {
        toast.loading('Uploading image...');
        imageUrl = await uploadImage(imageFile);
        toast.dismiss();
      }
      
      const issueData = {
        ...data,
        image: imageUrl,
        reporterEmail: user.email,
        reporterName: user.displayName,
      };
      
      const res = await axiosSecure.post('/api/issues', issueData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userIssues']);
      queryClient.invalidateQueries(['issues']);
      toast.success('Issue reported successfully!');
      reset();
      setImageFile(null);
      setImagePreview(null);
      navigate('/dashboard/my-issues');
    },
    onError: (error) => {
      if (error.response?.data?.needsPremium) {
        toast.error('Free users can only report 3 issues. Upgrade to premium!');
        navigate('/dashboard/profile');
      } else {
        toast.error(error.response?.data?.message || 'Failed to report issue');
      }
    },
  });

  const onSubmit = (data) => {
    if (isBlocked) {
      toast.error('Your account is blocked. Please contact authorities.');
      return;
    }
    
    if (!canReport) {
      toast.error('You have reached the limit. Please upgrade to premium.');
      navigate('/dashboard/profile');
      return;
    }
    
    createMutation.mutate(data);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
          Report New Issue
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          Help improve your community by reporting infrastructure issues
        </p>
      </div>

      {/* Blocked User Warning */}
      {isBlocked && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <FiAlertCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-700 font-['Satoshi'] mb-1">
              Account Blocked
            </h3>
            <p className="text-red-600 text-sm font-['Satoshi']">
              Your account has been blocked. Please contact the authorities for assistance.
            </p>
          </div>
        </div>
      )}

      {/* Issue Limit Warning */}
      {!isPremium && issueCount >= 3 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <FiAlertCircle className="text-amber-500 text-xl flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-amber-700 font-['Satoshi'] mb-1">
              Issue Limit Reached
            </h3>
            <p className="text-amber-600 text-sm font-['Satoshi'] mb-3">
              Free users can report a maximum of 3 issues. Upgrade to premium for unlimited reports.
            </p>
            <button
              onClick={() => navigate('/dashboard/profile')}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-amber-700 transition-colors"
            >
              Upgrade to Premium
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
              Issue Title *
            </label>
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
              placeholder="e.g., Broken streetlight on Main Street"
              disabled={isBlocked || !canReport}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
              placeholder="Provide detailed description of the issue..."
              disabled={isBlocked || !canReport}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
              Category *
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
              disabled={isBlocked || !canReport}
            >
              <option value="">Select category</option>
              <option value="streetlight">Streetlight</option>
              <option value="pothole">Pothole</option>
              <option value="water">Water Leakage</option>
              <option value="garbage">Garbage</option>
              <option value="footpath">Footpath</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
              Location *
            </label>
            <input
              {...register('location', { required: 'Location is required' })}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
              placeholder="Enter full address or location"
              disabled={isBlocked || !canReport}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
              Issue Image
            </label>
            <div className="space-y-3">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg border border-gray-300"
                />
              )}
              <label className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#238ae9] transition-colors">
                <FiUpload className="text-[#238ae9]" />
                <span className="font-['Satoshi'] text-sm text-gray-600">
                  {imageFile ? 'Change Image' : 'Upload Image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isBlocked || !canReport}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isBlocked || !canReport || createMutation.isPending}
              className="w-full px-6 py-3 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createMutation.isPending ? 'Submitting...' : 'Submit Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
