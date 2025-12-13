import toast from 'react-hot-toast';

/**
 * Upload image to ImgBB
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The uploaded image URL
 */
export const uploadImage = async (file) => {
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!imgbbApiKey || imgbbApiKey === 'your-imgbb-api-key') {
    const errorMsg = 'Image upload service not configured. Please contact administrator.';
    toast.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Validate file before upload
  const validation = validateImage(file);
  if (!validation.valid) {
    toast.error(validation.error);
    throw new Error(validation.error);
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: 'POST',
      body: formData,
    });

    // Try to parse response as JSON
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      throw new Error(`Server returned invalid response (status: ${response.status})`);
    }

    // Check if response is successful
    if (!response.ok) {
      // ImgBB API error structure
      const errorMessage = data?.error?.message || 
                          data?.error?.code || 
                          `Upload failed with status: ${response.status}`;
      
      console.error('ImgBB API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: data?.error,
        fullResponse: data
      });

      // Provide user-friendly error messages
      if (response.status === 400) {
        if (data?.error?.code === 100) {
          throw new Error('Invalid API key. Please check your ImgBB API key configuration.');
        } else if (data?.error?.code === 105) {
          throw new Error('Invalid image format. Please use JPG, PNG, GIF, or WebP format.');
        } else if (data?.error?.code === 106) {
          throw new Error('Image file is too large. Maximum size is 32MB.');
        } else {
          throw new Error(`Invalid request: ${errorMessage}`);
        }
      } else if (response.status === 403) {
        throw new Error('API key is invalid or expired. Please check your ImgBB API key.');
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error(`Upload failed: ${errorMessage}`);
      }
    }

    // Check if upload was successful
    if (data.success && data.data?.url) {
      return data.data.url;
    }

    // Handle case where response is ok but success is false
    throw new Error(data.error?.message || data.error?.code || 'Image upload failed - invalid response');
  } catch (error) {
    console.error('Image upload error:', error);
    
    // Don't show toast if error message is already user-friendly
    if (error.message && !error.message.includes('NetworkError') && !error.message.includes('Failed to fetch')) {
      toast.error(error.message);
    } else {
      toast.error('Failed to upload image. Please check your internet connection and try again.');
    }
    
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

