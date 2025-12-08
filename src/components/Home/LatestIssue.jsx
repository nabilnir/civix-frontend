
import React from 'react';
import { Link } from 'react-router';
import { FiMapPin, FiClock, FiTag, FiArrowRight } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';


const mockIssues = [
    {
        id: 1,
        title: "Large Pothole on Main Street",
        category: "Roads",
        status: "In-Progress",
        location: "Central Avenue, Sector 3",
        date: "2 hours ago",
        image: "https://via.placeholder.com/300x200?text=Road+Pothole",
        color: 'text-amber-600',
        bg: 'bg-amber-100'
    },
    {
        id: 2,
        title: "Streetlight Out Near School",
        category: "Lighting",
        status: "Pending",
        location: "School District 5, Block B",
        date: "5 hours ago",
        image: "https://via.placeholder.com/300x200?text=Broken+Light",
        color: 'text-gray-600',
        bg: 'bg-gray-100'
    },
    {
        id: 3,
        title: "Water Main Leakage",
        category: "Plumbing",
        status: "Resolved",
        location: "Residential Area, Suburb 1",
        date: "1 day ago",
        image: "https://via.placeholder.com/300x200?text=Water+Leak",
        color: 'text-green-600',
        bg: 'bg-green-100'
    },
    {
        id: 4,
        title: "Garbage Overflowing Bins",
        category: "Waste Management",
        status: "In-Progress",
        location: "Market Area, East Wing",
        date: "1 day ago",
        image: "https://via.placeholder.com/300x200?text=Garbage+Overflow",
        color: 'text-amber-600',
        bg: 'bg-amber-100'
    },
];

const LatestIssues = () => {
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
                        Latest Reported Issues
                    </h2>
                    <p 
                        className="font-['Satoshi'] text-lg text-gray-600 mt-4"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="400"
                    >
                        See what's being reported and the current status of resolution efforts across the city.
                    </p>
                </div>

                {/* Issues Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mockIssues.map((issue, index) => (
                        <div 
                            key={issue.id} 
                            className="bg-[#f4f6f8] rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group"
                            data-aos="fade-up" data-aos-duration="800" data-aos-delay={index * 150}
                        >
                            <div className="h-40 overflow-hidden">
                                <img 
                                    src={issue.image} 
                                    alt={issue.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${issue.color} ${issue.bg} font-['Satoshi']`}>
                                    {issue.status}
                                </span>
                                <h3 className="font-['Satoshi'] text-lg font-bold text-[#242424] mb-2 truncate">
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
                                        <span>Reported {issue.date}</span>
                                    </div>
                                </div>
                                
                                <Link 
                                    to={`/issue/${issue.id}`}
                                    className="mt-4 inline-flex items-center font-['Satoshi'] text-[#238ae9] font-semibold text-sm hover:text-[#1e7acc] transition-colors"
                                >
                                    View Details <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA to All Issues Page */}
                <div className="text-center mt-16" data-aos="fade-up" data-aos-duration="800" data-aos-delay="800">
                    <Link
                      to="/all-issues"
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

export default LatestIssues;