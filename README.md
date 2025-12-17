# Civix - Public Infrastructure Issue Reporting System

A comprehensive digital platform that enables citizens to report real-world public infrastructure issues such as broken streetlights, potholes, water leakage, garbage overflow, damaged footpaths, etc. Government staff and admins can manage, verify, assign, and resolve reported issues efficiently.

## Live Site

**Client:** [https://civix-auth-system.web.app](https://civix-auth-system.web.app)

**Server:** [https://civix-backend-livid.vercel.app](https://civix-backend-livid.vercel.app)


## Admin Credentials

- **Email:** `admin@civix.com`
- **Password:** `Admin@123`

## Test Credentials

### Staff Account
- **Email:** `staff@civix.com`
- **Password:** `Staff@123`
- *Note: This staff account has assigned issues and is actively working on them.*

### Citizen Account (Non-Premium)
- **Email:** `citizen@civix.com`
- **Password:** `Citizen@123`
- *Note: This citizen account has already posted 2 issues and is not a premium user.*

## Key Features

- **Secure Authentication System** - Firebase Authentication with email/password and Google Sign-in, JWT token-based authorization, and role-based access control (Admin, Staff, Citizen)

- **Fully Responsive Design** - Mobile-first approach with seamless experience across all devices (mobile, tablet, desktop). Dashboard is also fully responsive with adaptive layouts

- **Comprehensive Dashboard System** - Three distinct dashboards for Admin, Staff, and Citizens with real-time statistics, charts, and analytics powered by Recharts

- **Issue Management System** - Complete CRUD operations for issues with image upload, category classification, location tracking, status management (Pending → In-Progress → Resolved → Closed), and priority levels

- **Upvote System** - Citizens can upvote issues to show public importance. Each user can upvote an issue only once. Total upvote count is visible on issue cards and details page

- **Issue Boosting Feature** - Premium users can boost issue priority (100tk per issue) to High priority. Boosted issues automatically appear above normal issues on page 1

- **Premium Subscription System** - Free users limited to 3 issues. Premium subscription (1000tk) unlocks unlimited issue reporting, priority support, and analytics access

- **Advanced Search & Filtering** - Server-side search by issue name, category, and location. Filter by status, priority, and category with real-time updates

- **Pagination System** - Efficient server-side pagination on All Issues page. Boosted issues always appear on page 1, followed by regular issues

- **Issue Timeline & Tracking** - Complete audit trail showing issue lifecycle with status changes, staff assignments, updates, and resolution history. Timeline entries are read-only to preserve audit history

- **Staff Assignment System** - Admin can assign issues to staff members. Once assigned, staff can view and update only their assigned issues. Assignment creates timeline entry

- **Notification & Messaging System** - Real-time notifications and messaging system for users. Unread badges, mark as read functionality, and auto-refresh every 30 seconds

- **Payment Management** - Integrated Stripe payment system for premium subscriptions and issue boosting. Complete payment history with downloadable PDF invoices

- **PDF Invoice Generation** - Downloadable invoice PDFs in admin payments page and user profile page using React PDF

- **Modern UI/UX Design** - Beautiful, modern interface with AOS (Animate On Scroll) animations, smooth transitions, and consistent design language using Tailwind CSS

- **User Management** - Admin can block/unblock users, manage staff accounts (add, update, delete), and view user statistics. Blocked users can log in but cannot submit, edit, upvote, or boost issues

- **Image Upload System** - Image upload to ImgBB for issue photos and user profiles. Image validation, preview, and error handling

- **Issue Details Page** - Comprehensive issue details page with full information, edit/delete options (for issue owner when status is pending), boost button (for premium users), assigned staff information, and complete timeline

- **Profile Management** - Users can update their profile information including name, photo, and other details. Premium badge display for subscribed users

- **Smart Issue Prioritization** - Boosted issues automatically appear at the top of issue lists. High priority issues are visually distinguished

- **Analytics & Statistics** - Premium users get access to analytics charts showing issue trends, status distribution, and category breakdowns

- **Real-time Data Updates** - TanStack Query for efficient data fetching, caching, and real-time UI updates. Automatic query invalidation on mutations

- **SweetAlert2 Integration** - All user interactions use SweetAlert2 for confirmations and notifications. No browser alerts anywhere in the application

- **Dynamic Page Titles** - Custom `useTitle` hook automatically updates document title based on current page

- **Private Routes Protection** - Private routes stay logged in after page refresh using JWT tokens stored in localStorage. No redirect to login on refresh

- **Environment Variables** - All sensitive data (Firebase config, MongoDB URI, API keys) are stored in environment variables

- **404 Error Page** - Beautiful custom 404 page with navigation back to home

- **Consistent Design System** - Centralized constants for colors, statuses, categories, and site information. Consistent branding throughout the application

## Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **Firebase Authentication** - User authentication
- **Tailwind CSS** - Utility-first CSS framework
- **AOS (Animate On Scroll)** - Scroll animations
- **Framer Motion** - Advanced animations
- **React Icons** - Icon library
- **Lucide React** - Additional icons
- **SweetAlert2** - Beautiful alert dialogs
- **React Hot Toast** - Toast notifications
- **Recharts** - Chart library
- **React PDF** - PDF generation
- **Axios** - HTTP client
- **React Hook Form** - Form management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Token-based authentication
- **Stripe** - Payment processing
- **ImgBB API** - Image hosting
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling

## Project Structure

```
civix-frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Dashboard/     # Dashboard components
│   │   ├── Home/          # Homepage components
│   │   ├── Issues/        # Issue-related components
│   │   └── Shared/        # Shared components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── Utils/             # Utility functions
│   ├── Context/           # React Context providers
│   ├── routes/            # Route configuration
│   └── assets/            # Static assets
│
civix-backend/
├── routes/                # API routes
├── middleware/            # Custom middleware
├── config/                # Configuration files
└── index.js               # Server entry point
```

##  Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Firebase project
- Stripe account
- ImgBB API key
###
```
```

## Design Features

- Modern, clean UI with consistent color scheme
- Smooth animations using AOS and Framer Motion
- Responsive design for all screen sizes
- Accessible components with proper ARIA labels
- Loading states and error handling
- Toast notifications for user feedback
- SweetAlert2 for confirmations


##  License

This project is developed as part of an academic assignment.

##  Developer

Developed for better civic engagement and infrastructure management.

---

**Note:** This is a comprehensive public infrastructure issue reporting system designed to improve transparency, reduce response time, and make city service delivery more efficient.
