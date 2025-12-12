import React from 'react';
import Swal from 'sweetalert2';

const ConfirmDialog = ({
  title = 'Are you sure?',
  text = 'This action cannot be undone.',
  confirmButtonText = 'Yes, proceed',
  cancelButtonText = 'Cancel',
  confirmButtonColor = '#238ae9',
  cancelButtonColor = '#6b7280',
  icon = 'warning',
  onConfirm,
  onCancel,
  showCancelButton = true,
}) => {
  const showDialog = () => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton,
      confirmButtonColor,
      cancelButtonColor,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (onConfirm) {
          onConfirm();
        }
        return { confirmed: true };
      } else {
        if (onCancel) {
          onCancel();
        }
        return { confirmed: false };
      }
    });
  };

  // Return a function that can be called to show the dialog
  return showDialog;
};

// Hook-style usage
export const useConfirmDialog = () => {
  const confirm = (options) => {
    return Swal.fire({
      title: options.title || 'Are you sure?',
      text: options.text || 'This action cannot be undone.',
      icon: options.icon || 'warning',
      showCancelButton: options.showCancelButton !== false,
      confirmButtonColor: options.confirmButtonColor || '#238ae9',
      cancelButtonColor: options.cancelButtonColor || '#6b7280',
      confirmButtonText: options.confirmButtonText || 'Yes, proceed',
      cancelButtonText: options.cancelButtonText || 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed && options.onConfirm) {
        options.onConfirm();
      } else if (!result.isConfirmed && options.onCancel) {
        options.onCancel();
      }
      return result.isConfirmed;
    });
  };

  return { confirm };
};

// Component for direct usage
export const ConfirmDialogComponent = ({
  isOpen,
  onClose,
  title = 'Are you sure?',
  text = 'This action cannot be undone.',
  confirmButtonText = 'Yes, proceed',
  cancelButtonText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#242424] font-['Satoshi'] mb-4">
            {title}
          </h2>
          <p className="text-gray-600 font-['Satoshi'] mb-6">
            {text}
          </p>
          
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                if (onCancel) onCancel();
                if (onClose) onClose();
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {cancelButtonText}
            </button>
            <button
              type="button"
              onClick={() => {
                if (onConfirm) onConfirm();
                if (onClose) onClose();
              }}
              className="flex-1 px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors"
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

