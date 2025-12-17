/**
 * Application Constants
 */

// Issue Statuses
export const ISSUE_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  CLOSED: 'closed',
};

// Issue Priorities
export const ISSUE_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

// Issue Categories
export const ISSUE_CATEGORIES = [
  'Road & Infrastructure',
  'Water & Sewerage',
  'Electrical',
  'Waste Management',
  'Public Safety',
  'Parks & Recreation',
  'Building & Construction',
  'Traffic & Transportation',
  'Other',
];

// User Roles
export const USER_ROLES = {
  CITIZEN: 'citizen',
  STAFF: 'staff',
  ADMIN: 'admin',
};

// Payment Types
export const PAYMENT_TYPES = {
  PREMIUM_SUBSCRIPTION: 'premium_subscription',
  BOOST: 'boost',
};

// Payment Status
export const PAYMENT_STATUS = {
  SUCCESS: 'success',
  PENDING: 'pending',
  FAILED: 'failed',
};

// Staff Departments
export const STAFF_DEPARTMENTS = [
  'Public Works',
  'Water & Sewerage',
  'Electrical',
  'Roads & Transportation',
  'Parks & Recreation',
  'Building & Safety',
  'General Services',
];

// Subscription Limits
export const SUBSCRIPTION_LIMITS = {
  FREE_ISSUE_LIMIT: 3,
  PREMIUM_PRICE: 1000,
  BOOST_PRICE: 100,
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    USERS: '/api/auth/users',
  },
  ISSUES: {
    BASE: '/api/issues',
    UPVOTE: '/api/issues/upvote',
    STATUS: '/api/issues/:id/status',
  },
  STAFF: {
    BASE: '/api/staff',
    STATS: '/api/staff/stats',
    TODAY_TASKS: '/api/staff/today-tasks',
  },
  PAYMENTS: {
    BASE: '/api/payments',
  },
  USERS: {
    BLOCK: '/api/users/:email/block',
    PREMIUM: '/api/users/:email/premium',
  },
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'short',
  LONG: 'long',
  TIME: 'time',
  DATETIME: 'datetime',
  RELATIVE: 'relative',
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  ITEMS_PER_PAGE: [10, 20, 50, 100],
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'civix-token',
  USER: 'civix-user',
  THEME: 'civix-theme',
};

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Logged in successfully',
    LOGOUT: 'Logged out successfully',
    REGISTER: 'Account created successfully',
    ISSUE_CREATED: 'Issue reported successfully',
    ISSUE_UPDATED: 'Issue updated successfully',
    ISSUE_DELETED: 'Issue deleted successfully',
    PROFILE_UPDATED: 'Profile updated successfully',
    PAYMENT_SUCCESS: 'Payment processed successfully',
  },
  ERROR: {
    LOGIN: 'Login failed. Please check your credentials',
    REGISTER: 'Registration failed. Please try again',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    NETWORK: 'Network error. Please check your connection',
    GENERIC: 'Something went wrong. Please try again',
  },
};

// Validation Rules
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  PHONE_PATTERN: /^[0-9]{10,15}$/,
};

// Colors (for charts, badges, etc.)
export const COLORS = {
  PRIMARY: '#238ae9',
  SECONDARY: '#1e7acc',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#3b82f6',
  GRAY: '#6b7280',
};

// Site Information
export const SITE_INFO = {
  NAME: 'Civix',
  FULL_NAME: 'Civix - Citizen Issue Reporting Platform',
  TAGLINE: 'Empowering citizens to report, track, and resolve infrastructure issues',
  DESCRIPTION: 'Building better communities together',
};

export default {
  ISSUE_STATUS,
  ISSUE_PRIORITY,
  ISSUE_CATEGORIES,
  USER_ROLES,
  PAYMENT_TYPES,
  PAYMENT_STATUS,
  STAFF_DEPARTMENTS,
  SUBSCRIPTION_LIMITS,
  API_ENDPOINTS,
  DATE_FORMATS,
  FILE_UPLOAD,
  PAGINATION,
  STORAGE_KEYS,
  TOAST_MESSAGES,
  VALIDATION,
  COLORS,
  SITE_INFO,
};

