import React, { useState } from 'react';
import { Link } from 'react-router';
import { FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import Logo from '../../components/Shared/Logo';

const ForgotPassword = () => {
    const { resetPassword, loading, setLoading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const email = event.target.email.value;

        try {
            await resetPassword(email);
            setEmailSent(true);
            toast.success('Password reset email sent! Please check your inbox.');
        } catch (err) {
            console.error('Password reset error:', err);
            
            // Firebase error handling
            if (err.code === 'auth/user-not-found') {
                toast.error('No account found with this email');
            } else if (err.code === 'auth/invalid-email') {
                toast.error('Invalid email address');
            } else {
                toast.error('Failed to send reset email. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                
                {/* Logo & Header */}
                <div className="text-center mb-8" data-aos="fade-down" data-aos-duration="600">
                    <div className="flex justify-center mb-6">
                        <Logo size="lg" showText={true} />
                    </div>
                    <h2 className="font-['Satoshi'] text-3xl font-bold text-base-content mb-2">
                        Reset Password
                    </h2>
                    <p className="font-['Satoshi'] text-sm text-base-content/70">
                        {emailSent ? "Check your email for the reset link" : "Enter your email to receive a password reset link"}
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-base-100 rounded-2xl shadow-lg p-8" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
                    
                    {!emailSent ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block font-['Satoshi'] font-semibold text-sm text-base-content mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full pl-11 pr-4 py-3.5 bg-base-200 border-2 border-transparent rounded-xl font-['Satoshi'] text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary focus:bg-base-100 transition-all"
                                    />
                                </div>
                            </div>
                            
                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || loading}
                                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary text-primary-content font-['Satoshi'] font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-['Satoshi'] text-base-content mb-2">Check your inbox</h3>
                            <p className="text-sm text-base-content/70 font-['Satoshi'] mb-6">
                                We've sent a password reset link. Please check your email to continue.
                            </p>
                            <button 
                                onClick={() => setEmailSent(false)} 
                                className="text-primary hover:text-primary/80 text-sm font-bold font-['Satoshi'] transition-colors"
                            >
                                Try another email address
                            </button>
                        </div>
                    )}

                    {/* Back to Login Link */}
                    <div className="mt-8 pt-6 border-t border-base-200 text-center">
                        <Link to="/login" className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary font-medium transition-colors inline-flex items-center gap-2 group">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span>
                            <span>Back to Login</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
