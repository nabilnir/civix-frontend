import React from 'react';
import { FiMapPin, FiUserCheck, FiTool, FiTarget, FiBell, FiArrowDown } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HowItWorks = () => {
    
    const steps = [
        {
            icon: FiMapPin,
            title: "Report the Issue",
            description: "Citizens submit a report with issue details, photos, and precise location via the platform.",
            aosDelay: "200"
        },
        {
            icon: FiUserCheck,
            title: "Assign to Staff",
            description: "The Admin reviews the submitted report for validity and assigns it to a relevant staff member for action.",
            aosDelay: "400"
        },
        {
            icon: FiTool,
            title: "Verification & Progress",
            description: "The assigned Staff verifies the issue's existence and begins work, updating the progress in the system.",
            aosDelay: "600"
        },
        {
            icon: FiTarget,
            title: "Track Status",
            description: "The system automatically tracks the issue's lifecycle: Pending → In-Progress → Resolved → Closed.",
            aosDelay: "800"
        },
        {
            icon: FiBell,
            title: "Get Resolution Updates",
            description: "Citizens receive real-time notifications and can track their issue's final status anytime.",
            aosDelay: "1000"
        },
    ];

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1 bg-[#f4f6f8] text-[#238ae9] rounded-full font-['Satoshi'] text-sm font-medium mb-3"
                    data-aos="fade-up" data-aos-duration="600">
                        Process Overview
                    </span>
                    <h2 
                        className="font-['Satoshi'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#242424] leading-tight"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"
                    >
                        How the System Works
                    </h2>
                    <p 
                        className="font-['Satoshi'] text-base md:text-lg text-gray-600 mt-4 px-4 md:px-0"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="400"
                    >
                        A simple, transparent, and efficient way to connect citizens and municipal services.
                    </p>
                </div>

                {/* Steps Grid - Card Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay={step.aosDelay}
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#238ae9] to-[#1e7acc] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <step.icon className="text-white text-2xl md:text-3xl" />
                            </div>

                            {/* Step Number */}
                            <div className="inline-block px-3 py-1 bg-[#f4f6f8] text-[#238ae9] rounded-full font-['Satoshi'] text-xs font-semibold mb-3">
                                Step {index + 1}
                            </div>

                            {/* Title */}
                            <h3 className="font-['Satoshi'] text-xl md:text-2xl font-bold text-[#242424] mb-3">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="font-['Satoshi'] text-sm md:text-base text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;