/**
 * Standard password validation utility
 * Validates password against common security requirements
 */

export const validatePassword = (password) => {
  const errors = [];

  // Minimum 8 characters
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // At least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // At least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // At least one number
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // At least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*...)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    message: errors.length > 0 ? errors[0] : null,
  };
};

/**
 * Get password requirements text for display
 */
export const getPasswordRequirements = () => [
  'At least 8 characters long',
  'At least one uppercase letter (A-Z)',
  'At least one lowercase letter (a-z)',
  'At least one number (0-9)',
  'At least one special character (!@#$%^&*...)',
];

/**
 * React Hook Form validation function
 */
export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters',
  },
  validate: (value) => {
    const validation = validatePassword(value);
    if (!validation.isValid) {
      return validation.message;
    }
    return true;
  },
};

