import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- Hooks ---
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAxiosPublic from '../hooks/useAxiosPublic';

// --- Custom Components ---
import IssueCard from '../components/Issues/IssueCard';
import FilterSidebar from '../components/Issues/FilterSidebar';
import Pagination from '../components/Shared/Pagination';

// Initialize AOS
AOS.init();

const AllIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    // --- State ---
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [filterState, setFilterState] = useState({
        search: '',
        status: '',
        category: '',
        priority: '',
    });

    // --- Data Fetching (TanStack Query) ---
    const { data: issuesData = {}, isLoading, isError, error } = useQuery({
        queryKey: ['issues', currentPage, filterState],
        queryFn: async () => {
            try {
                const params = {
                    page: currentPage,
                    limit: 6,
                    search: filterState.search || undefined,
                    status: filterState.status || undefined,
                    category: filterState.category || undefined,
                    priority: filterState.priority || undefined
                };
                
                // Remove undefined params
                Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
                
                const res = await axiosPublic.get('/api/issues', { params });
                
                // Backend returns: { success: true, data: { issues, totalPages, ... } }
                return res.data?.data || { issues: [], totalPages: 1, currentPage: 1, totalIssues: 0 };
            } catch (err) {
                console.error('Error fetching issues:', err);
                // Return empty data on error to prevent crashes
                return { issues: [], totalPages: 1, currentPage: 1, totalIssues: 0 };
            }
        },
        keepPreviousData: true,
        retry: 2,
    });

    // Issues are already sorted by backend: boosted issues first, then regular issues
    const issues = issuesData.issues || [];
    const totalPages = issuesData.totalPages || 1;

    // --- Handlers ---
    const handleSearchChange = (e) => {
        setFilterState(prev => ({ ...prev, search: e.target.value }));
        setCurrentPage(1);
    };

    const handleFilterChange = (filterName, value) => {
        
        setFilterState(prev => ({ 
            ...prev, 
            [filterName]: prev[filterName] === value ? '' : value 
        }));
        setCurrentPage(1);
    };

    // --- Upvote Logic ---
    const upvoteMutation = useMutation({
        mutationFn: async (issueId) => {
            const res = await axiosSecure.post(`/api/issues/${issueId}/upvote`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['issues']);
            toast.success('Issue upvoted successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to upvote');
        }
    });

    const handleUpvote = (issue) => {
        // 1. Check Login
        if (!user) {
            toast.error("Please login to upvote");
            // Redirect to login, 
            return navigate('/login', { state: { from: location } });
        }
        
        // 2. Check if Own Issue
        if (user.email === issue.userEmail || user.email === issue.reporterEmail) {
            return toast.error("You cannot upvote your own issue.");
        }

        // 3. Execute Upvote
        upvoteMutation.mutate(issue._id);
    };

    return (
        <section className="bg-[#f4f6f8] py-20 md:py-32 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-down">
                    <span className="inline-block px-4 py-1 bg-white text-[#238ae9] rounded-full font-['Satoshi'] text-sm font-medium mb-3">
                        Public Report Hub
                    </span>
                    <h1 className="font-['Satoshi'] text-4xl md:text-5xl font-bold text-[#242424] mb-4 leading-tight">
                        All Citizen Reports
                    </h1>
                    <p className="font-['Satoshi'] text-lg text-gray-600 max-w-2xl mx-auto">
                        Browse and track all community-reported issues. Your voice matters in building a better city.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Sidebar  */}
                    <div className="hidden lg:block lg:col-span-1 h-fit">
                        <div className="p-6 bg-white rounded-xl shadow-lg sticky top-24 border border-gray-100">
                            <h3 className="font-bold text-lg mb-4 border-b pb-2">Filter Options</h3>
                            <FilterSidebar 
                                filterState={filterState}
                                handleSearchChange={handleSearchChange}
                                handleFilterChange={handleFilterChange}
                            />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="w-10 h-10 border-4 border-[#238ae9] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : isError ? (
                             <div className="text-center py-20 bg-red-50 rounded-xl text-red-500 border border-red-200">
                                <p className="font-['Satoshi'] font-semibold mb-2">Error loading issues</p>
                                <p className="text-sm text-red-400">{error?.message || 'Please try again later'}</p>
                             </div>
                        ) : issues.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {issues.map((issue, index) => (
                                        <IssueCard 
                                            key={issue._id} 
                                            issue={issue} 
                                            index={index} 
                                            onUpvote={() => handleUpvote(issue)}
                                        />
                                    ))}
                                </div>
                                
                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <Pagination 
                                        currentPage={currentPage} 
                                        totalPages={totalPages} 
                                        onPageChange={setCurrentPage} 
                                    />
                                )}
                            </>
                        ) : (
                            <div className="p-16 bg-white rounded-xl text-center shadow-lg border-2 border-dashed border-gray-200" data-aos="zoom-in">
                                <h3 className="font-['Satoshi'] text-xl font-bold text-gray-700">No Reports Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>

                    {/* Mobile Filter Toggle Button */}
                    <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-xs px-4">
                         <button 
                            onClick={() => setIsMobileFilterOpen(true)} 
                            className="w-full py-4 bg-[#238ae9] text-white rounded-full font-bold shadow-2xl flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                            Show Filters
                         </button>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer/Modal */}
             {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end transition-opacity">
                    <div className="w-4/5 max-w-sm bg-white h-full overflow-y-auto p-6 shadow-2xl animate-slideInRight">
                         <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <h3 className="font-bold text-xl text-[#242424]">Filters</h3>
                            <button 
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <FiX size={24}/>
                            </button>
                         </div>
                         <FilterSidebar
                            filterState={filterState}
                            handleSearchChange={handleSearchChange}
                            handleFilterChange={handleFilterChange}
                        />
                        <button 
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="w-full mt-8 bg-[#238ae9] text-white py-3 rounded-xl font-bold"
                        >
                            View Results
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AllIssues;