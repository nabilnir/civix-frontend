import React  from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiCalendar, FiMapPin, FiTag, FiUser, FiCheckCircle, FiAlertTriangle, FiTrash2, FiEdit2, FiTrendingUp, FiThumbsUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useTitle from '../../hooks/useTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Timeline from './Timeline';
import StatusBadge from './StatusBadge';

const IssueDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { isPremium } = useRole();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch Issue Data
    const { data: issueData, isLoading, isError } = useQuery({
        queryKey: ['issue', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/issues/${id}`);
            return res.data.data || res.data;
        }
    });

    const issue = issueData;

    // Set dynamic page title based on issue title
    useTitle(issue?.title ? `Issue: ${issue.title}` : 'Issue Details');

    // --- Mutations ---

    // 1. Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async () => {
            await axiosSecure.delete(`/api/issues/${id}`);
        },
        onSuccess: () => {
            toast.success("Issue deleted successfully");
            navigate('/all-issues');
        },
        onError: () => toast.error("Failed to delete issue")
    });

    // 2. Create Stripe checkout session for boost
    const createBoostCheckoutMutation = useMutation({
        mutationFn: async () => {
            const res = await axiosSecure.post('/api/payments/create-checkout-session', {
                amount: 100,
                type: 'boost',
                issueId: id,
            });
            return res.data;
        },
        onSuccess: (data) => {
            // Redirect to Stripe checkout
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error('Failed to create checkout session');
            }
        },
        onError: (error) => {
            console.error('Checkout session error:', error);
            toast.error(error.response?.data?.message || 'Failed to create checkout session. Please try again.');
        },
    });

    // --- Handlers ---
    const handleDelete = () => {
        Swal.fire({
            title: 'Delete Issue?',
            text: "Are you sure you want to delete this report? This cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate();
            }
        });
    };

    const handleBoost = () => {
        Swal.fire({
            title: 'Boost Issue Priority?',
            text: "Confirm payment of 100tk to boost this issue to High priority? You will be redirected to Stripe to complete the payment.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#238ae9',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Pay 100tk',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                createBoostCheckoutMutation.mutate();
            }
        });
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (isError || !issue) return <div className="min-h-screen flex items-center justify-center">Issue not found.</div>;

    // Check ownership
    const isOwner = user?.email === issue.userEmail || user?.email === issue.reporterEmail;
    
    // Timeline Data 
    // Sort timeline: Latest at top
    const timeline = issue.timeline?.sort((a, b) => new Date(b.date) - new Date(a.date)) || [];

    return (
        <section className="py-12 bg-[#f4f6f8] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Top Layout: Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Issue Info  */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Main Card */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
                            
                            {/* Header / Badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold font-['Satoshi']">
                                    {issue.category}
                                </span>
                                <StatusBadge status={issue.status} />
                                {(issue.priority === 'high' || issue.priority === 'High') && (
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 font-['Satoshi']">
                                        <FiAlertTriangle size={14}/> High Priority
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold text-[#242424] mb-4 font-['Satoshi']">{issue.title}</h1>

                            <img 
                                src={issue.image} 
                                alt={issue.title} 
                                className="w-full h-80 object-cover rounded-xl mb-6 border border-gray-100"
                            />

                            <h3 className="text-lg font-bold mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed font-['Satoshi'] mb-6">
                                {issue.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500 border-t pt-6">
                                <div className="flex items-center gap-3">
                                    <FiUser className="text-[#238ae9]" />
                                    <span>Reported by: <span className="font-semibold text-gray-700">{issue.userName || issue.reporterName || 'Unknown'}</span></span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start gap-3">
                                        <FiMapPin className="text-[#238ae9] shrink-0 mt-0.5" size={16} />
                                        <span className="flex-1">{issue.location}</span>
                                    </div>
                                    {(issue.upvotes > 0 || issue.upvotedBy?.length > 0) && (
                                        <div className="flex items-center gap-2 pl-7">
                                            <FiThumbsUp className="fill-[#238ae9] text-[#238ae9] shrink-0" size={14} />
                                            <span className="text-sm text-gray-600 font-['Satoshi']">
                                                Upvoted by {issue.upvotes || issue.upvotedBy?.length || 0} {issue.upvotes === 1 || issue.upvotedBy?.length === 1 ? 'person' : 'people'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiCalendar className="text-[#238ae9]" />
                                    <span>
                                        {issue.createdAt 
                                            ? new Date(issue.createdAt).toLocaleString('en-US', { 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) 
                                            : issue.date 
                                            ? new Date(issue.date).toLocaleString('en-US', { 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) 
                                            : 'Invalid Date'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Section */}
                        <Timeline timeline={timeline} issueStatus={issue.status} />
                    </div>

                    {/* Right Column: Staff & Actions  */}
                    <div className="space-y-6">
                        
                        {/* Assigned Staff Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-[#242424] mb-4">Assigned Staff</h3>
                            {issue.assignedStaff ? (
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={issue.assignedStaff.photoURL || 'https://via.placeholder.com/50'} 
                                        alt={issue.assignedStaff.name} 
                                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                                    />
                                    <div>
                                        <h4 className="font-bold text-sm">{issue.assignedStaff.name}</h4>
                                        <p className="text-xs text-gray-500">{issue.assignedStaff.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                                    <FiAlertTriangle />
                                    <span className="text-sm font-medium">No staff assigned yet.</span>
                                </div>
                            )}
                        </div>

                        {/* Actions Card (Only for Owner) */}
                        {isOwner && (
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-[#242424] mb-4">Actions</h3>
                                <div className="space-y-3">
                                    {/* Edit Button */}
                                    {issue.status === 'pending' && (
                                        <button 
                                            onClick={() => {
                                                // Open edit modal
                                                navigate(`/dashboard/my-issues`);
                                            }}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                                        >
                                            <FiEdit2 /> Edit Issue
                                        </button>
                                    )}

                                    {/* Boost Button - Only for Premium Users */}
                                    {isPremium && issue.priority !== 'high' && issue.priority !== 'High' && (
                                        <button 
                                            onClick={handleBoost}
                                            disabled={createBoostCheckoutMutation.isPending}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50"
                                        >
                                            <FiTrendingUp /> {createBoostCheckoutMutation.isPending ? 'Processing...' : 'Boost (100tk)'}
                                        </button>
                                    )}

                                    {/* Delete Button */}
                                    <button 
                                        onClick={handleDelete}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors"
                                    >
                                        <FiTrash2 /> Delete Report
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IssueDetails;