import React from 'react';
import { Link } from 'react-router'; 
import { FiMapPin, FiClock, FiArrowRight, FiThumbsUp, FiAlertTriangle } from 'react-icons/fi';

const IssueCard = ({ issue, index, onUpvote }) => {
    // Styling logic for status badges
    let statusClass = 'text-gray-600 bg-gray-100';
    if (issue.status === 'Resolved') statusClass = 'text-green-600 bg-green-100';
    if (issue.status === 'In-Progress') statusClass = 'text-amber-600 bg-amber-100';
    if (issue.status === 'Closed') statusClass = 'text-red-600 bg-red-100';

    return (
        <div 
            className={`bg-white rounded-xl shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-xl ${issue.priority === 'High' && issue.isBoosted ? 'border-amber-400 ring-2 ring-amber-100' : 'border-gray-100'}`}
            data-aos="fade-up"
            data-aos-delay={index * 50}
        >
            <div className="relative h-48 overflow-hidden">
                <img src={issue.image} alt={issue.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {issue.isBoosted && (
                    <span className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                        <FiAlertTriangle className="fill-white" /> BOOSTED
                    </span>
                )}
            </div>
            
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${statusClass}`}>{issue.status}</span>
                    <button 
                        onClick={(e) => { e.preventDefault(); onUpvote(); }}
                        className="flex items-center gap-1 text-gray-500 hover:text-[#238ae9] transition-colors group"
                        title="Upvote this issue"
                    >
                        <FiThumbsUp className="group-hover:scale-110 transition-transform"/> 
                        <span className="text-sm font-bold">{issue.upvotes || 0}</span>
                    </button>
                </div>

                <h3 className="font-['Satoshi'] text-lg font-bold text-[#242424] mb-2 line-clamp-1">
                    <Link to={`/issue/${issue._id}`} className="hover:text-[#238ae9] transition-colors">
                        {issue.title}
                    </Link>
                </h3>
                
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p className="flex items-center gap-2">
                        <FiMapPin className="text-[#238ae9]" /> <span className="truncate">{issue.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <FiClock className="text-[#238ae9]" /> {new Date(issue.date).toLocaleDateString()}
                    </p>
                </div>

                <Link to={`/issue/${issue._id}`} className="inline-flex items-center text-[#238ae9] font-bold text-sm hover:underline">
                    View Details <FiArrowRight className="ml-1" />
                </Link>
            </div>
        </div>
    );
};

export default IssueCard;