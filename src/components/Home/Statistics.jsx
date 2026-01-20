
import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiUsers, FiTarget, FiTool } from 'react-icons/fi';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Statistics = () => {


    const stats = [
        {
            icon: FiCheckCircle,
            endValue: 3450,
            label: "Total Issues Resolved",
            prefix: "",
            suffix: "+",
            aosDelay: 200,
        },
        {
            icon: FiUsers,
            endValue: 875,
            label: "Active Citizens Registered",
            prefix: "",
            suffix: "+",
            aosDelay: 400,
        },
        {
            icon: FiTarget,
            endValue: 92,
            label: "Resolution Success Rate",
            prefix: "",
            suffix: "%",
            aosDelay: 600,
        },
        {
            icon: FiTool,
            endValue: 48,
            label: "Avg. Resolution Time (Hrs)",
            prefix: "",
            suffix: "h",
            aosDelay: 800,
        },
    ];

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const target = document.querySelector('#statistics-section');
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) observer.unobserve(target);
        };
    }, []);


    return (

        <section id="statistics-section" className="py-20 md:py-32 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1 bg-base-100 text-primary rounded-full font-['Satoshi'] text-sm font-medium mb-3"
                        data-aos="fade-up" data-aos-duration="600">
                        Our Impact
                    </span>
                    <h2
                        className="font-['Satoshi'] text-3xl md:text-4xl lg:text-5xl font-bold text-base-content leading-tight"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"
                    >
                        Proof of Progress in Your City
                    </h2>
                    <p
                        className="font-['Satoshi'] text-lg text-base-content/70 mt-4"
                        data-aos="fade-up"
                        data-aos-duration="600"
                        data-aos-delay="350"
                    >
                        Real numbers from real citizens—see how community action is
                        improving neighborhoods every day.
                    </p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-base-100 p-6 md:p-8 rounded-2xl border border-base-300 shadow-xl text-center"
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay={stat.aosDelay}
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                                <stat.icon className="text-primary-content text-3xl" />
                            </div>

                            <h3 className="font-['Satoshi'] text-4xl font-extrabold text-base-content mb-1 leading-none">
                                {isVisible ? (

                                    <CountUp
                                        end={stat.endValue}
                                        duration={3}
                                        separator=","
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                    />
                                ) : (

                                    `${stat.prefix}${stat.endValue}${stat.suffix}`
                                )}
                            </h3>

                            <p className="font-['Satoshi'] text-base text-base-content/70 font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;