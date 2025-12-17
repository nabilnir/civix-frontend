import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiX, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { uploadImage, validateImage } from '../../Utils/imageUpload';

const EditIssueModal = ({ issue, isOpen, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Check if issue can be edited (only if status is pending)
  const canEdit = issue?.status === 'pending';

  useEffect(() => {
    if (issue && isOpen) {
      reset({
        title: issue.title || '',
        description: issue.description || '',
        category: issue.category || '',
        location: issue.location || '',
      });
      // Set current image as preview
      setImagePreview(issue.image || null);
      setImageFile(null);
    }
  }, [issue, isOpen, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image
      const validation = validateImage(file);
      if (!validation.valid) {
        toast.error(validation.error);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      let imageUrl = data.image || issue.image;

      // Upload new image if one was selected
      if (imageFile) {
        setIsUploadingImage(true);
        try {
          const loadingToast = toast.loading('Uploading image...');
          imageUrl = await uploadImage(imageFile);
          toast.dismiss(loadingToast);
          
          if (imageUrl) {
            toast.success('Image uploaded successfully');
          } else {
            toast.error('Image upload failed. Using previous image.');
            imageUrl = issue.image;
          }
        } catch (error) {
          console.error('Image upload error:', error);
          toast.error('Image upload failed. Using previous image.');
          imageUrl = issue.image; // Keep previous image on error
        } finally {
          setIsUploadingImage(false);
        }
      }

      // Prepare update data
      const updateData = {
        ...data,
        image: imageUrl || issue.image, // Use new image or keep existing
      };

      const res = await axiosSecure.patch(`/api/issues/${issue._id}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userIssues']);
      queryClient.invalidateQueries(['issues']);
      queryClient.invalidateQueries(['issue', issue._id]);
      queryClient.invalidateQueries(['latestResolvedIssues']);
      toast.success('Issue updated successfully');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update issue');
    },
  });

  const onSubmit = (data) => {
    if (!canEdit) {
      toast.error('You can only edit issues with pending status');
      return;
    }
    updateMutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#242424] font-['Satoshi']">
            Edit Issue
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
              Issue Title *
            </label>
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9] disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter issue title"
              disabled={!canEdit}
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
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9] disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Describe the issue in detail"
              disabled={!canEdit}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9] disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={!canEdit}
            >
              <option value="">Select category</option>
              <option value="streetlight">Streetlight</option>
              <option value="pothole">Pothole</option>
              <option value="water">Water Leakage</option>
              <option value="sewerage">Sewerage</option>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9] disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter location address"
              disabled={!canEdit}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Image Upload */}
          {canEdit && (
            <div>
              <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                Issue Image
              </label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="text-gray-400 mb-2" size={32} />
                    <p className="mb-2 text-sm text-gray-500 font-['Satoshi']">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 font-['Satoshi']">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
              {issue.image && !imageFile && (
                <p className="text-xs text-gray-500 mt-2 font-['Satoshi']">
                  Current image will be kept if no new image is uploaded
                </p>
              )}
            </div>
          )}

          {/* Warning if cannot edit */}
          {!canEdit && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800 font-['Satoshi']">
                This issue can only be edited when it's in pending status. Once staff is assigned, you cannot change the image.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-['Satoshi'] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending || isUploadingImage || !canEdit}
              className="flex-1 px-6 py-3 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploadingImage ? 'Uploading image...' : updateMutation.isPending ? 'Updating...' : 'Update Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIssueModal;
