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
        <section className="py-20 md:py-32 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1 bg-base-200 text-primary rounded-full font-['Satoshi'] text-sm font-medium mb-3"
                        data-aos="fade-up" data-aos-duration="600">
                        Process Overview
                    </span>
                    <h2
                        className="font-['Satoshi'] text-3xl md:text-4xl lg:text-5xl font-bold text-base-content leading-tight"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"
                    >
                        How the System Works
                    </h2>
                    <p
                        className="font-['Satoshi'] text-base md:text-lg text-base-content/70 mt-4 px-4 md:px-0"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="400"
                    >
                        A simple, transparent, and efficient way to connect citizens and municipal services.
                    </p>
                </div>

                {/* Card Layout - Mobile Only */}
                <div className="md:hidden grid grid-cols-1 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay={step.aosDelay}
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                                <step.icon className="text-primary-content text-2xl" />
                            </div>

                            {/* Step Number */}
                            <div className="inline-block px-3 py-1 bg-base-200 text-primary rounded-full font-['Satoshi'] text-xs font-semibold mb-3">
                                Step {index + 1}
                            </div>

                            {/* Title */}
                            <h3 className="font-['Satoshi'] text-xl font-bold text-base-content mb-3">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="font-['Satoshi'] text-sm text-base-content/70 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Timeline Layout - Desktop/Tablet Only */}
                <div className="hidden md:block relative">
                    {/* Vertical Line - Centered */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-base-300 top-0 bottom-0"></div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-row mb-12 relative ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}
                        >
                            {/* Content Block */}
                            <div
                                className={`w-5/12 p-4 ${index % 2 === 0 ? 'pr-4 text-right' : 'pl-4 text-left'}`}
                                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                                data-aos-duration="800"
                                data-aos-delay={step.aosDelay}
                            >
                                <h3 className="font-['Satoshi'] text-xl font-bold text-base-content mb-2">
                                    {step.title}
                                </h3>
                                <p className="font-['Satoshi'] text-base-content/70">
                                    {step.description}
                                </p>
                            </div>

                            {/* Icon Circle - Centered on line */}
                            <div className="flex items-center justify-center w-2/12">
                                <div className="z-10 w-14 h-14 rounded-full flex items-center justify-center bg-base-100 border-4 border-primary shadow-lg">
                                    <step.icon className="text-primary text-xl" />
                                </div>
                            </div>

                            {/* Spacer */}
                            <div className="w-5/12"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;