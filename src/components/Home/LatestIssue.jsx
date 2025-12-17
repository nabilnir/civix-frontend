import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FiMapPin, FiClock, FiTag, FiArrowRight, FiThumbsUp } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StatusBadge from '../Issues/StatusBadge';

const LatestIssue = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // Fetch latest resolved issues (at least 6)
    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['latestResolvedIssues'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/issues/resolved/latest', {
                params: {
                    limit: 6
                }
            });
            // Backend returns: { success: true, data: [...] }
            return res.data.data || [];
        },
        staleTime: 0, // Always consider data stale to allow refetch on invalidation
        refetchOnWindowFocus: true, // Refetch when user returns to the page
    });

    if (isLoading) {
        return (
            <section className="py-20 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9]"></div>
                    </div>
                </div>
            </section>
        );
    }

    // If no issues, show placeholder
    const displayIssues = issues.length > 0 ? issues : [];

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1 bg-[#f4f6f8] text-[#238ae9] rounded-full font-['Satoshi'] text-sm font-medium mb-3"
                    data-aos="fade-up" data-aos-duration="600">
                        Real-Time Feed
                    </span>
                    <h2 
                        className="font-['Satoshi'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#242424] leading-tight"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"
                    >
                        Latest Resolved Issues
                    </h2>
                    <p 
                        className="font-['Satoshi'] text-lg text-gray-600 mt-4"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="400"
                    >
                        See what's been resolved and the impact of citizen reporting across the city.
                    </p>
                </div>

                {/* Issues Grid */}
                {displayIssues.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayIssues.map((issue, index) => (
                            <div 
                                key={issue._id} 
                                className="bg-[#f4f6f8] rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                                onClick={() => navigate(`/issue/${issue._id}`)}
                                data-aos="fade-up" data-aos-duration="800" data-aos-delay={index * 150}
                            >
                                <div className="h-40 overflow-hidden">
                                    <img 
                                        src={issue.image || 'https://via.placeholder.com/300x200?text=Issue+Image'} 
                                        alt={issue.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="mb-3">
                                        <StatusBadge status={issue.status} />
                                    </div>
                                    <h3 className="font-['Satoshi'] text-lg font-bold text-[#242424] mb-2 line-clamp-2">
                                        {issue.title}
                                    </h3>
                                    
                                    {/* Meta Info */}
                                    <div className="space-y-1 text-sm text-gray-600 font-['Satoshi']">
                                        <div className="flex items-center gap-2">
                                            <FiTag className="text-gray-400" size={16} />
                                            <span>{issue.category}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiMapPin className="text-gray-400" size={16} />
                                            <span className="truncate">{issue.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiClock className="text-gray-400" size={16} />
                                            <span>
                                                {new Date(issue.date || issue.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Upvote Count */}
                                    {(issue.upvotes > 0 || issue.upvotedBy?.length > 0) && (
                                        <div className="mt-3">
                                            <button
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#238ae9]/10 hover:bg-[#238ae9]/20 text-[#238ae9] rounded-lg font-['Satoshi'] text-sm font-medium transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/issue/${issue._id}`);
                                                }}
                                            >
                                                <FiThumbsUp className="fill-[#238ae9]" size={16} />
                                                <span>
                                                    Upvoted by {issue.upvotes || issue.upvotedBy?.length || 0} {issue.upvotes === 1 || issue.upvotedBy?.length === 1 ? 'person' : 'people'}
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                    
                                    <div 
                                        className="mt-4 inline-flex items-center font-['Satoshi'] text-[#238ae9] font-semibold text-sm hover:text-[#1e7acc] transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/issue/${issue._id}`);
                                        }}
                                    >
                                        View Details <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 font-['Satoshi'] text-lg">
                            No resolved issues to display yet. Be the first to report an issue!
                        </p>
                    </div>
                )}

                {/* CTA to All Issues Page */}
                <div className="text-center mt-16" data-aos="fade-up" data-aos-duration="800" data-aos-delay="800">
                    <Link
                      to="/allissues"
                      className="inline-flex bg-gradient-to-br from-[#238ae9] to-[#1e7acc] text-white px-8 py-4 rounded-xl font-['Satoshi'] font-bold text-base hover:shadow-2xl hover:scale-105 transition-all shadow-lg items-center gap-2 group"
                    >
                      Explore All Reports
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestIssue;
