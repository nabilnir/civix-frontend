import React  from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiCalendar, FiMapPin, FiTag, FiUser, FiCheckCircle, FiAlertTriangle, FiTrash2, FiEdit2, FiTrendingUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios'; 
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const IssueDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch Issue Data
    const { data: issueData, isLoading, isError } = useQuery({
        queryKey: ['issue', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/issues/${id}`);
            return res.data.data || res.data;
        }
    });

    const issue = issueData;

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
        onError: (err) => toast.error("Failed to delete issue")
    });

    // 2. Boost Mutation (Payment)
    const boostMutation = useMutation({
        mutationFn: async () => {
            const { handlePayment } = await import('../../Utils/payment');
            const paymentResult = await handlePayment(100, 'boost', id);
            
            if (!paymentResult.success) {
                throw new Error(paymentResult.error || 'Payment failed');
            }
            
            return paymentResult;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['issue', id]);
            queryClient.invalidateQueries(['issues']);
            toast.success("Issue Boosted! Priority set to High.");
        },
        onError: (error) => {
            toast.error(error.message || "Boost failed");
        }
    });

    // --- Handlers ---
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this report? This cannot be undone.")) {
            deleteMutation.mutate();
        }
    };

    const handleBoost = () => {
        if (window.confirm("Confirm payment of 100tk to boost this issue?")) {
            boostMutation.mutate();
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (isError || !issue) return <div className="min-h-screen flex items-center justify-center">Issue not found.</div>;

    // Check ownership
    const isOwner = user?.email === issue.reporterEmail;
    
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
                                <span className={`px-3 py-1 rounded-full text-xs font-bold font-['Satoshi'] ${issue.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {issue.status}
                                </span>
                                {issue.priority === 'High' && (
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <FiAlertTriangle/> High Priority
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
                                    <span>Reported by: <span className="font-semibold text-gray-700">{issue.reporterName}</span></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiMapPin className="text-[#238ae9]" />
                                    <span>{issue.location}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiCalendar className="text-[#238ae9]" />
                                    <span>{new Date(issue.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Section */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                            <h3 className="text-xl font-bold text-[#242424] mb-6 font-['Satoshi']">Issue Lifecycle</h3>
                            
                            <div className="relative border-l-2 border-gray-200 ml-3 pl-8 space-y-8">
                                {timeline.map((entry, idx) => (
                                    <div key={idx} className="relative">
                                        {/* Dot on timeline */}
                                        <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-[#238ae9] border-4 border-white shadow-sm"></span>
                                        
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                            <div>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                    {new Date(entry.date).toLocaleString()}
                                                </span>
                                                <h4 className="text-base font-bold text-gray-800 mt-1">{entry.status}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{entry.note || "Status updated"}</p>
                                            </div>
                                            <div className="mt-2 sm:mt-0">
                                                <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-600">
                                                    By: {entry.updatedBy}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {timeline.length === 0 && <p className="text-gray-500 italic">No updates yet.</p>}
                            </div>
                        </div>
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

                                    {/* Boost Button */}
                                    {issue.priority !== 'High' && (
                                        <button 
                                            onClick={handleBoost}
                                            disabled={boostMutation.isPending}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50"
                                        >
                                            <FiTrendingUp /> {boostMutation.isPending ? 'Processing...' : 'Boost (100tk)'}
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