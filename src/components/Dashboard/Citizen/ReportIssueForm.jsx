import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload, FiX, FiAlertCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ReportIssueForm = ({
  onSubmit,
  isLoading = false,
  isBlocked = false,
  canReport = true,
  issueCount = 0,
  isPremium = false,
  onUpgradeClick,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'File Too Large',
          text: 'Image size should be less than 5MB',
          icon: 'error',
          confirmButtonColor: '#238ae9',
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Invalid File Type',
          text: 'Please select an image file',
          icon: 'error',
          confirmButtonColor: '#238ae9',
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onFormSubmit = (data) => {
    onSubmit({ ...data, imageFile });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Blocked User Warning */}
      {isBlocked && (
        <div className="bg-error/10 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <FiAlertCircle className="text-error" size={20} />
            <div>
              <h4 className="font-['Satoshi'] font-bold text-error">Account Blocked</h4>
              <p className="font-['Satoshi'] text-sm text-error/80">
                Your account has been blocked. You cannot report issues. Please contact the authorities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Issue Limit Warning */}
      {!isPremium && issueCount >= 3 && (
        <div className="bg-warning/10 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiAlertCircle className="text-warning" size={20} />
              <div>
                <h4 className="font-['Satoshi'] font-bold text-warning-content">Issue Limit Reached</h4>
                <p className="font-['Satoshi'] text-sm text-warning-content/80">
                  Free users can only report 3 issues. Upgrade to premium for unlimited reports.
                </p>
              </div>
            </div>
            {onUpgradeClick && (
              <button
                type="button"
                onClick={onUpgradeClick}
                className="px-4 py-2 bg-warning text-warning-content rounded-lg font-['Satoshi'] font-semibold hover:bg-warning/80 transition-colors"
              >
                Upgrade Now
              </button>
            )}
          </div>
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-base-content font-['Satoshi'] mb-2">
          Issue Title *
        </label>
        <input
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 5, message: 'Title must be at least 5 characters' }
          })}
          type="text"
          disabled={!canReport || isBlocked}
          className="w-full px-4 py-3 border border-base-300 bg-base-100 text-base-content rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-base-200 disabled:cursor-not-allowed"
          placeholder="e.g., Large pothole on Main Street"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1 font-['Satoshi']">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-base-content font-['Satoshi'] mb-2">
          Description *
        </label>
        <textarea
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 20, message: 'Description must be at least 20 characters' }
          })}
          rows="5"
          disabled={!canReport || isBlocked}
          className="w-full px-4 py-3 border border-base-300 bg-base-100 text-base-content rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-base-200 disabled:cursor-not-allowed"
          placeholder="Describe the issue in detail. Include location, severity, and any relevant information..."
        />
        {errors.description && (
          <p className="text-error text-sm mt-1 font-['Satoshi']">{errors.description.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-base-content font-['Satoshi'] mb-2">
          Category *
        </label>
        <select
          {...register('category', { required: 'Category is required' })}
          disabled={!canReport || isBlocked}
          className="w-full px-4 py-3 border border-base-300 bg-base-100 text-base-content rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-base-200 disabled:cursor-not-allowed"
        >
          <option value="">Select a category</option>
          <option value="streetlight">Streetlight</option>
          <option value="pothole">Pothole</option>
          <option value="water">Water Leakage</option>
          <option value="sewerage">Sewerage</option>
          <option value="garbage">Garbage</option>
          <option value="footpath">Footpath</option>
          <option value="safety">Safety</option>
          <option value="other">Other</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1 font-['Satoshi']">{errors.category.message}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-base-content font-['Satoshi'] mb-2">
          Location *
        </label>
        <input
          {...register('location', { required: 'Location is required' })}
          type="text"
          autoComplete="off"
          disabled={!canReport || isBlocked}
          className="w-full px-4 py-3 border border-base-300 bg-base-100 text-base-content rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-base-200 disabled:cursor-not-allowed"
          placeholder="e.g., Main Street, Sector 5, Block A"
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1 font-['Satoshi']">{errors.location.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-base-content font-['Satoshi'] mb-2">
          Issue Image
        </label>
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg border border-base-300"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-2 bg-error text-white rounded-full hover:bg-error/80 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-base-300 border-dashed rounded-lg cursor-pointer hover:bg-base-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FiUpload className="text-base-content/40 mb-2" size={32} />
              <p className="mb-2 text-sm text-base-content/60 font-['Satoshi']">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-base-content/40 font-['Satoshi']">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={!canReport || isBlocked}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={!canReport || isBlocked || isLoading}
          className="w-full px-6 py-3 bg-primary text-primary-content rounded-lg font-['Satoshi'] font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            'Submit Issue'
          )}
        </button>
      </div>
    </form>
  );
};

export default ReportIssueForm;

