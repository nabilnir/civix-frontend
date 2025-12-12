import React, { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage, FiFile } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FileUpload = ({
  onFileSelect,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  multiple = false,
  label,
  required = false,
  error,
  className = '',
}) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      toast.error(`File size must be less than ${(maxSize / 1024 / 1024).toFixed(0)}MB`);
      return;
    }

    // Validate file type
    if (accept.includes('image/*') && !file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setFileName(file.name);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    // Call parent callback
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] },
      };
      handleFileChange(fakeEvent);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-[#242424] font-['Satoshi']">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-[#238ae9]'}
          ${preview ? 'bg-gray-50' : 'bg-white'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              aria-label="Remove file"
            >
              <FiX size={20} />
            </button>
            <p className="mt-2 text-sm text-gray-600 font-['Satoshi'] truncate">
              {fileName}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                {accept.includes('image/*') ? (
                  <FiImage size={32} className="text-gray-400" />
                ) : (
                  <FiFile size={32} className="text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-[#242424] font-['Satoshi']">
                  Drag & drop file here, or{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#238ae9] hover:underline"
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-gray-500 mt-1 font-['Satoshi']">
                  Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
                </p>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 font-['Satoshi']">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;

