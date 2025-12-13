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
      console.warn('ImgBB API key not configured. Image upload skipped.');
      return '';
    }
    
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('ImgBB API Error:', response.status, errorData);
        
        if (response.status === 400) {
          throw new Error('Invalid API key or image format. Please check your ImgBB API key in .env file.');
        } else if (response.status === 403) {
          throw new Error('ImgBB API key is invalid or expired.');
        } else {
          throw new Error(`Image upload failed: ${errorData.error?.message || 'Unknown error'}`);
        }
      }
      
      const data = await response.json();
      
      if (data.success && data.data?.url) {
        return data.data.url;
      }
      
      throw new Error(data.error?.message || 'Image upload failed - invalid response');
    } catch (error) {
      console.error('Image upload error:', error);
      
      // Don't show error toast here - let the calling code decide
      // Just log and return empty string to continue without image
      if (error.message) {
        console.error('Upload error details:', error.message);
      }
      
      // Return empty string - issue will be created without image
      return '';
    }
  };

  const createMutation = useMutation({
    mutationFn: async ({ formData, imageFile }) => {
      let imageUrl = '';
      
      if (imageFile) {
        const loadingToast = toast.loading('Uploading image...');
        try {
          imageUrl = await uploadImage(imageFile);
          toast.dismiss(loadingToast);
          
          if (imageUrl) {
            toast.success('Image uploaded successfully');
          } else {
            toast.error('Image upload failed. Issue will be created without image.', { duration: 3000 });
          }
        } catch (error) {
          toast.dismiss(loadingToast);
          console.error('Image upload failed:', error);
          // Continue without image - don't block issue creation
          imageUrl = '';
          toast.error('Image upload failed. Continuing without image...', { duration: 3000 });
        }
      }
      
      // Prepare issue data - backend will add userEmail, userName, userPhoto from token
      const issueData = {
        title: formData.title?.trim(),
        description: formData.description?.trim(),
        category: formData.category,
        location: (formData.location || formData.Location)?.trim(), 
        ...(imageUrl && { image: imageUrl }), // Only include image if URL exists
      };
      
      console.log('Submitting issue:', issueData);
      
      try {
        const res = await axiosSecure.post('/api/issues', issueData);
        return res.data;
      } catch (apiError) {
        // Log full error details for debugging
        console.error('API Error:', apiError);
        console.error('API Error Response:', apiError.response?.data);
        console.error('API Error Status:', apiError.response?.status);
        
        throw apiError;
      }
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
      console.error('Error status:', error.response?.status);
      
      // Handle CORS errors
      if (!error.response && error.message?.includes('CORS') || error.code === 'ERR_NETWORK') {
        toast.error(
          'Network error: Cannot connect to server. Please check if backend is running and CORS is configured.',
          { duration: 5000 }
        );
        return;
      }
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('Authentication failed. Please log in again.');
        navigate('/login');
      } else if (error.response?.status === 404) {
        toast.error('API endpoint not found. Please check backend configuration.');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else if (error.response?.data?.needsPremium) {
        toast.error('Free users can only report 3 issues. Upgrade to premium!');
        navigate('/dashboard/profile');
      } else {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to report issue. Please try again.';
        toast.error(errorMessage, { duration: 4000 });
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
