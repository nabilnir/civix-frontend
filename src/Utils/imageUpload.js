import toast from 'react-hot-toast';

/**
 * Upload image to ImgBB
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The uploaded image URL
 */
export const uploadImage = async (file) => {
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!imgbbApiKey || imgbbApiKey === 'your-imgbb-api-key') {
    toast.error('Image upload service not configured. Please contact administrator.');
    throw new Error('Image upload service not configured');
  }

  const formData = new FormData();
  formData.append('image', file);

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
    throw error;
  }
};

/**
 * Validate image file
 * @param {File} file - The file to validate
 * @param {number} maxSize - Maximum file size in bytes (default: 5MB)
 * @returns {Object} - { valid: boolean, error?: string }
 */
export const validateImage = (file, maxSize = 5 * 1024 * 1024) => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${(maxSize / 1024 / 1024).toFixed(0)}MB`,
    };
  }

  return { valid: true };
};

/**
 * Create image preview from file
 * @param {File} file - The image file
 * @returns {Promise<string>} - Data URL for preview
 */
export const createImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default uploadImage;

