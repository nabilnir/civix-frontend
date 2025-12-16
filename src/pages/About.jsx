
import React from 'react';
import { FiCheckCircle, FiTrendingUp, FiMap, FiUsers, FiHeart, FiZap, FiEye, FiArrowRight } from 'react-icons/fi';

import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';


import img1 from '../assets/images/img1.jpg'
import img2 from '../assets/images/img2.jpg'
import img3 from '../assets/images/img3.jpg'

const About = () => {

    const coreValues = [
        {
            icon: FiEye,
            title: "Transparency First",
            description: "Every report's journey is public, from submission to resolution, fostering trust and accountability.",
            aosDelay: 200,
        },
        {
            icon: FiZap,
            title: "Civic Efficiency",
            description: "We optimize the reporting workflow, ensuring faster response times for critical infrastructure issues.",
            aosDelay: 400,
        },
        {
            icon: FiUsers,
            title: "Community Power",
            description: "The platform empowers citizens with a collective voice, driving positive change in their neighborhoods.",
            aosDelay: 600,
        },
        {
            icon: FiHeart,
            title: "Sustainable Impact",
            description: "By collecting data, we help the municipality prioritize projects that lead to long-term urban resilience.",
            aosDelay: 800,
        },
    ];

    return (
        <section className="bg-white py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* -------------------- 1. Hero / Mission Statement -------------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">

                    {/* Text Content */}
                    <div data-aos="fade-right" data-aos-duration="1000">
                        <span className="inline-block px-4 py-1 bg-[#f4f6f8] text-[#238ae9] rounded-full font-['Satoshi'] text-sm font-medium mb-4">
                            Our Story
                        </span>

                        <h1 className="font-['Satoshi'] text-4xl md:text-5xl 
                        lg:text-6xl font-bold text-[#242424] leading-tight mb-6">
                            Building Better Cities, One 
                             <span className="text-[#238ae9]"> Report </span>
                            at a Time.
                        </h1>

                        <p className="font-['Satoshi'] text-lg text-gray-700 mb-6">
                            Civix was born from a simple belief: a well-maintained city
                            starts with empowered citizens. We bridge the communication
                            gap between the community and municipal services,
                            turning frustration into action.
                        </p>

                        <p className="font-['Satoshi'] text-base text-gray-600 mb-8">
                            We provide the digital infrastructure needed to effortlessly
                            report issues be it a pothole, a broken streetlight, or a water leak and
                            track its resolution with unprecedented transparency.
                        </p>

                        <Link
                            to="/allissues"
                            className="inline-flex bg-gradient-to-br from-[#238ae9]
                             to-[#1e7acc] text-white px-8 py-4 rounded-xl font-['Satoshi']
                              font-bold text-base hover:shadow-xl hover:scale-[1.02]
                               transition-all shadow-lg items-center gap-2 group"
                        >
                            Report Your First Issue Today
                            <FiMap className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>


                    <div
                        className="relative h-96 rounded-2xl overflow-hidden shadow-2xl
                         bg-[#f4f6f8]"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-delay="300"
                    >
                        <img
                            src="https://images.pexels.com/photos/7731331/pexels-photo-7731331.jpeg" 
                            alt="Illustration of community impact and issue resolution"
                            className="w-full h-full object-cover "
                        />
                    </div>
                </div>

                {/* -------------------- 2. Core Values / Pillars -------------------- */}
                <div className="py-16 md:py-24 bg-[#f4f6f8] rounded-3xl shadow-inner">
                    <div className="text-center max-w-3xl mx-auto mb-16 px-4">
                        <span className="inline-block px-4 py-1 bg-white text-[#238ae9] rounded-full font-['Satoshi'] text-sm font-medium mb-3"
                            data-aos="fade-up" data-aos-duration="600">
                            Our Pillars
                        </span>
                        <h2
                            className="font-['Satoshi'] text-3xl md:text-4xl font-bold text-[#242424] leading-tight"
                            data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"
                        >
                            Commitment to the Community
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                                data-aos="zoom-in"
                                data-aos-duration="800"
                                data-aos-delay={value.aosDelay}
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-[#238ae9] to-[#1e7acc] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                                    {/* Icon uses the project's primary blue gradient */}
                                    {React.createElement(value.icon, { className: "text-white text-2xl" })}
                                </div>
                                <h3 className="font-['Satoshi'] text-xl font-bold text-[#242424] mb-2">
                                    {value.title}
                                </h3>
                                <p className="font-['Satoshi'] text-sm text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* -------------------- 3. Call to Action / Team Section -------------------- */}
                <div className="mt-20 text-center">
                    <h2
                        className="font-['Satoshi'] text-3xl font-bold text-[#242424] mb-4"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        Meet the Engineers Behind the Code
                    </h2>
                    <p
                        className="font-['Satoshi'] text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="200"
                    >
                        We are a passionate team dedicated to leveraging technology for better
                        governance and civic life. Our commitment is to a bug-free and efficient platform.
                    </p>


                    <div
                        className="flex justify-center items-center gap-6"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="400"
                    >

                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#1e7acc] shadow-lg">
                            <img src={img1} alt="Team Member 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#1e7acc] shadow-lg">
                            <img src={img2} alt="Team Member 2" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#1e7acc] shadow-lg">
                            <img src={img3} alt="Team Member 3" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <Link
                        to="/contact"
                        className="inline-flex mt-12 text-[#238ae9] hover:text-[#1e7acc] font-['Satoshi'] font-semibold transition-colors items-center gap-2 group"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="600"
                    >
                        Get in touch with the team
                        <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default About;