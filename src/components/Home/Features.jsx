import React from 'react';
import { Link } from 'react-router';
import { 
    FiShield, 
    FiZap, 
    FiEye, 
    FiBarChart2, 
    FiArrowUpCircle, 
    FiUsers,
    FiTablet
} from 'react-icons/fi';

const Features = () => {

    const featuresList = [
        {
            icon: FiShield,
            title: "Role-Based Security",
            description: "Dedicated access and dashboard for Admins, Staff, and Citizens to ensure secure and relevant operations.", 
            aosDelay: "200"
        },
        {
            icon: FiEye,
            title: "Full Transparency",
            description: "Track the complete lifecycle of any issue with an immutable Timeline/Tracking section for audit history.", 
            aosDelay: "300"
        },
        {
            icon: FiZap,
            title: "Response Efficiency",
            description: "Reduces response time and makes city service delivery more efficient through centralized reporting and tracking.", 
            aosDelay: "400"
        },
        {
            icon: FiBarChart2,
            title: "Data & Analytics",
            description: "Collects, analyzes, and visualizes infrastructure data on Admin dashboards to inform planning and resource allocation.", 
            aosDelay: "500"
        },
        {
            icon: FiArrowUpCircle,
            title: "Upvote & Boost Priority",
            description: "Citizens can upvote important issues and optionally boost priority for faster resolution via payment.", 
            aosDelay: "600"
        },
        {
            icon: FiTablet,
            title: "Fully Responsive Design",
            description: "Seamlessly submit and track issues across all devices, including mobile, tablet, and desktop.", 
            aosDelay: "700"
        },
    ];

    return (
        <section className="py-20 md:py-32 bg-[#f4f6f8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1 bg-white text-[#238ae9] rounded-full font-['Satoshi'] text-sm font-medium mb-3"
                    data-aos="fade-up" data-aos-duration="600">
                        Core Capabilities
                    </span>
                    <h2 
                        className="font-['Satoshi'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#242424] leading-tight"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"
                    >
                        Features That Empower Change
                    </h2>
                    <p 
                        className="font-['Satoshi'] text-lg text-gray-600 mt-4"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="400"
                    >
                        We provide the tools for efficient issue reporting and management for all stakeholders.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresList.map((feature, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                            data-aos="fade-up" data-aos-duration="800" data-aos-delay={feature.aosDelay}
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-[#238ae9] to-[#1e7acc] rounded-lg flex items-center justify-center mb-4">
                                <feature.icon className="text-white text-2xl" />
                            </div>
                            <h3 className="font-['Satoshi'] text-xl font-bold text-[#242424] mb-2">
                                {feature.title}
                            </h3>
                            <p className="font-['Satoshi'] text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
                
                {/* CTA */}
                <div className="text-center mt-16" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="800">
                    <Link
                      to="/all-issues"
                      className="inline-flex bg-gradient-to-br from-[#238ae9] to-[#1e7acc] text-white px-8 py-4 rounded-xl font-['Satoshi'] font-bold text-base hover:shadow-2xl hover:scale-105 transition-all shadow-lg items-center gap-2 group"
                    >
                      View All Issues & Report Now
                      <FiZap className="group-hover:rotate-12 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Features;