import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';
import ReportIssueForm from './ReportIssueForm';

const ReportIssue = () => {
  const { isBlocked, isPremium, userData } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Check issue limit
  const issueCount = userData?.issueCount || 0;
  const canReport = isPremium || issueCount < 3;

  // Upload image to imgbb
  const uploadImage = async (file) => {
    if (!file) return '';
    
    const formData = new FormData();
    formData.append('image', file);
    
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    
    if (!imgbbApiKey || imgbbApiKey === 'your-imgbb-api-key') {
      toast.error('Image upload service not configured');
      throw new Error('Image upload service not configured');
    }
    
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
      toast.error('Failed to upload image');
      return 'https://via.placeholder.com/800x600?text=Issue+Image';
    }
  };

  const createMutation = useMutation({
    mutationFn: async ({ formData, imageFile }) => {
      let imageUrl = '';
      
      if (imageFile) {
        toast.loading('Uploading image...');
        try {
          imageUrl = await uploadImage(imageFile);
        } catch (error) {
          console.error('Image upload failed:', error);
          
          imageUrl = '';
        }
        toast.dismiss();
      }
      
      // Prepare issue data - backend will add userEmail, userName, userPhoto from token
      
      const issueData = {
        title: formData.title?.trim(),
        description: formData.description?.trim(),
        category: formData.category,
        location: (formData.location || formData.Location)?.trim(), 
        image: imageUrl || undefined, 
      };
      
      console.log('Submitting issue:', issueData);
      const res = await axiosSecure.post('/api/issues', issueData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userIssues']);
      queryClient.invalidateQueries(['issues']);
      queryClient.invalidateQueries(['userStats']);
      toast.success('Issue reported successfully!');
      navigate('/dashboard/my-issues');
    },
    onError: (error) => {
      console.error('Issue creation error:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('Authentication failed. Please log in again.');
        navigate('/login');
      } else if (error.response?.data?.needsPremium) {
        toast.error('Free users can only report 3 issues. Upgrade to premium!');
        navigate('/dashboard/profile');
      } else {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to report issue';
        toast.error(errorMessage);
      }
    },
  });

  const handleFormSubmit = (formData) => {
    if (isBlocked) {
      toast.error('Your account is blocked. Please contact authorities.');
      return;
    }
    
    if (!canReport) {
      toast.error('You have reached the limit. Please upgrade to premium.');
      navigate('/dashboard/profile');
      return;
    }
    
    createMutation.mutate({ formData, imageFile: formData.imageFile });
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

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <ReportIssueForm
          onSubmit={handleFormSubmit}
          isLoading={createMutation.isPending}
          isBlocked={isBlocked}
          canReport={canReport}
          issueCount={issueCount}
          isPremium={isPremium}
          onUpgradeClick={() => navigate('/dashboard/profile')}
        />
      </div>
    </div>
  );
};

export default ReportIssue;
