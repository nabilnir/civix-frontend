import React from 'react';
import { Link } from 'react-router'; 
import { FiMapPin, FiClock, FiArrowRight, FiThumbsUp, FiAlertTriangle, FiTag } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

const IssueCard = ({ issue, index, onUpvote }) => {
    // Determine if issue is boosted/high priority
    const isHighPriority = issue.priority === 'High' || issue.isBoosted;

    return (
        <div 
            className={`bg-white rounded-xl shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-xl group ${
                isHighPriority 
                    ? 'border-amber-400 ring-2 ring-amber-100' 
                    : 'border-gray-100'
            }`}
            data-aos="fade-up"
            data-aos-delay={index * 50}
        >
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={issue.image || 'https://via.placeholder.com/400x300?text=Issue+Image'} 
                    alt={issue.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {isHighPriority && (
                    <span className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 font-['Satoshi']">
                        <FiAlertTriangle className="fill-white" size={12} /> BOOSTED
                    </span>
                )}
                {/* Category Badge */}
                {issue.category && (
                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 font-['Satoshi']">
                        <FiTag size={12} /> {issue.category}
                    </span>
                )}
            </div>
            
            <div className="p-5">
                <div className="flex justify-between items-start mb-3 gap-2">
                    <StatusBadge status={issue.status} />
                    {onUpvote && (
                        <button 
                            onClick={(e) => { 
                                e.preventDefault(); 
                                e.stopPropagation();
                                onUpvote(); 
                            }}
                            className="flex items-center gap-1 text-gray-500 hover:text-[#238ae9] transition-colors group flex-shrink-0"
                            title="Upvote this issue"
                        >
                            <FiThumbsUp className="group-hover:scale-110 transition-transform"/> 
                            <span className="text-sm font-bold font-['Satoshi']">
                                {issue.upvotes || issue.upvoteCount || 0}
                            </span>
                        </button>
                    )}
                </div>

                <h3 className="font-['Satoshi'] text-lg font-bold text-[#242424] mb-2 line-clamp-2 min-h-[3rem]">
                    <Link 
                        to={`/issue/${issue._id}`} 
                        className="hover:text-[#238ae9] transition-colors"
                    >
                        {issue.title}
                    </Link>
                </h3>
                
                <div className="space-y-1.5 text-sm text-gray-600 mb-4 font-['Satoshi']">
                    <p className="flex items-center gap-2">
                        <FiMapPin className="text-[#238ae9] flex-shrink-0" size={16} /> 
                        <span className="truncate">{issue.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <FiClock className="text-[#238ae9] flex-shrink-0" size={16} /> 
                        {new Date(issue.date || issue.createdAt || Date.now()).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </p>
                </div>

                <Link 
                    to={`/issue/${issue._id}`} 
                    className="inline-flex items-center text-[#238ae9] font-bold text-sm hover:underline group/link font-['Satoshi']"
                >
                    View Details 
                    <FiArrowRight className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default IssueCard;