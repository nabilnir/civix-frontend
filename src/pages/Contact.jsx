// pages/Contacts.jsx
import React, { useMemo } from 'react';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiUser, FiArrowRight, FiClock, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';


const teamMembers = [
    {
        id: 1,
        name: 'Ayresa Khan',
        role: 'Chief Technology Officer (CTO)',
        bio: 'Visionary architect behind Civix. Specializing in scalable cloud infrastructure and user-centric design.',
        linkedin: 'https://linkedin.com/in/ayresakhan',
        github: 'https://github.com/ayresadev',
        imgUrl: 'https://i.pinimg.com/1200x/69/a7/85/69a7854930d077d3358b57414bf7391c.jpg' 
    },
    {
        id: 2,
        name: 'Jamal Uddin',
        role: 'Lead Frontend Developer',
        bio: 'Passionate about React and modern UI/UX principles. Ensures the platform is fast, accessible, and enjoyable.',
        linkedin: 'https://linkedin.com/in/jamaluddin',
        github: 'https://github.com/jamaldev',
        imgUrl: 'https://via.placeholder.com/200?text=Jamal+Uddin' 
    },
    {
        id: 3,
        name: 'Sara Ahmed',
        role: 'Data & Security Engineer',
        bio: 'Dedicated to data integrity and user privacy. Manages the API endpoints and ensures secure communication.',
        linkedin: 'https://linkedin.com/in/saraahmed',
        github: 'https://github.com/saracodes',
        imgUrl: 'https://via.placeholder.com/200?text=Sara+Ahmed' 
    },
];

const Contact = () => {
    const safeTeamMembers = useMemo(() =>
        teamMembers.map((member) => ({
            ...member,
            fallbackInitials: member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase(),
        }))
    , []);

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Your message has been sent! We'll get back to you soon.");
        e.target.reset();
    };

    return (
        <section className="bg-[#f4f6f8] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* -------------------- 1. Team Section (Hover Effect) -------------------- */}
                <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1 bg-white text-[#238ae9] rounded-full font-['Satoshi'] text-sm font-medium mb-3"
                    data-aos="fade-up" data-aos-duration="600">
                        Our Squad
                    </span>
                    <h1 
                        className="font-['Satoshi'] text-4xl md:text-5xl font-bold text-[#242424] mb-4 leading-tight"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"
                    >
                        Meet the Innovators
                    </h1>
                    <p 
                        className="font-['Satoshi'] text-lg text-gray-600 max-w-3xl mx-auto"
                        data-aos="fade-up" data-aos-duration="600" data-aos-delay="400"
                    >
                        We are a passionate, agile team committed to enhancing citizen engagement through technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
                    {safeTeamMembers.map((member, index) => (
                        <div 
                            key={member.id} 
                            className="team-card relative group shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer"
                            data-aos="fade-up" 
                            data-aos-delay={index * 150} 
                        >
                            {/* Profile Image Container */}
                            <div className="w-full h-80 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-4 avatar-shell relative">
                                {member.imgUrl ? (
                                    <img 
                                        src={member.imgUrl} 
                                        alt={member.name} 
                                        className="w-48 h-48 rounded-full object-cover transition-transform duration-500 group-hover:scale-105 ring-4 ring-[#238ae9]/15"
                                        onError={(e) => { 
                                            e.currentTarget.style.display = 'none'; 
                                            const fallback = e.currentTarget.closest('.avatar-shell')?.querySelector('.avatar-fallback');
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                ) : (
                                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#238ae9] to-[#1e7acc] flex items-center justify-center text-white text-3xl font-bold ring-4 ring-[#238ae9]/15 avatar-fallback">
                                        {member.fallbackInitials}
                                    </div>
                                )}
                                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#238ae9] to-[#1e7acc] flex items-center justify-center text-white text-3xl font-bold ring-4 ring-[#238ae9]/15 avatar-fallback hidden absolute">
                                    {member.fallbackInitials}
                                </div>
                            </div>

                            
                            <div className="absolute inset-0 bg-gradient-to-t from-[#238ae9]/95 to-[#238ae9]/80 flex flex-col justify-end p-6 md:p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                                
                                <h3 className="font-['Satoshi'] text-2xl font-bold text-white mb-1">
                                    {member.name}
                                </h3>
                                
                                <p className="font-['Satoshi'] text-base font-medium text-white/90 mb-3">
                                    {member.role}
                                </p>
                                
                                <p className="font-['Satoshi'] text-sm text-white/80 mb-6 italic">
                                    "{member.bio}"
                                </p>
                                
                                {/* Social Links */}
                                <div className="flex gap-4">
                                    <a 
                                        href={member.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-white hover:text-gray-200 transition-colors"
                                        aria-label={`LinkedIn profile for ${member.name}`}
                                    >
                                        <FiLinkedin size={20} />
                                    </a>
                                    <a 
                                        href={member.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-white hover:text-gray-200 transition-colors"
                                        aria-label={`GitHub profile for ${member.name}`}
                                    >
                                        <FiGithub size={20} />
                                    </a>
                                </div>
                            </div>

                            {/* Base Text  */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-300">
                                <h3 className="font-['Satoshi'] text-lg font-bold text-[#242424]">{member.name}</h3>
                                <p className="font-['Satoshi'] text-sm text-gray-600">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* -------------------- 2. Contact Form & Info -------------------- */}
                <div className="bg-white p-8 md:p-16 rounded-3xl shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* Contact Info (Left Column) */}
                        <div data-aos="fade-right" data-aos-duration="1000">
                            <span className="inline-block px-4 py-1 bg-[#f4f6f8] text-[#238ae9] rounded-full font-['Satoshi'] text-sm font-medium mb-3">
                                Get In Touch
                            </span>
                            <h2 className="font-['Satoshi'] text-3xl md:text-4xl font-bold text-[#242424] mb-6">
                                Have a Question or Suggestion?
                            </h2>
                            <p className="font-['Satoshi'] text-base text-gray-600 mb-8">
                                We collaborate with citizens, city staff, and partners to scale Civix. Reach out for support, partnerships, or press.
                            </p>

                            <div className="grid grid-cols-1 gap-4 mb-6">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#f4f6f8] text-[#242424]">
                                    <FiClock className="text-[#238ae9]" />
                                    <div className="text-sm">
                                        <p className="font-semibold">Response time</p>
                                        <p className="text-gray-600">Typically replies within 24 hours</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#f4f6f8] text-[#242424]">
                                    <FiShield className="text-[#238ae9]" />
                                    <div className="text-sm">
                                        <p className="font-semibold">Priority support</p>
                                        <p className="text-gray-600">Available for city staff & premium citizens</p>
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <FiMail className="text-[#238ae9] text-xl mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-['Satoshi'] text-sm text-gray-500">Email Us</p>
                                        <a href="mailto:support@civix.com" className="font-['Satoshi'] text-base font-semibold text-[#242424] hover:text-[#238ae9] transition-colors">support@civix.com</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FiPhone className="text-[#238ae9] text-xl mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-['Satoshi'] text-sm text-gray-500">Call Us</p>
                                        <a href="tel:+1234567890" className="font-['Satoshi'] text-base font-semibold text-[#242424] hover:text-[#238ae9] transition-colors">+1 (234) 567-890</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FiMapPin className="text-[#238ae9] text-xl mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-['Satoshi'] text-sm text-gray-500">Our Base of Operations</p>
                                        <p className="font-['Satoshi'] text-base font-semibold text-[#242424]">Dhaka, Dhaka Division, Bangladesh</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Form (Right Columns) */}
                        <div className="lg:col-span-2" data-aos="fade-left" data-aos-duration="1000">
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Name */}
                                <div className="md:col-span-1">
                                    <label htmlFor="name" className="block font-['Satoshi'] text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Your name"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-[#238ae9] focus:border-[#238ae9] transition-colors"
                                        />
                                    </div>
                                </div>
                                
                                {/* Email */}
                                <div className="md:col-span-1">
                                    <label htmlFor="email" className="block font-['Satoshi'] text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-[#238ae9] focus:border-[#238ae9] transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="md:col-span-2">
                                    <label htmlFor="subject" className="block font-['Satoshi'] text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="I have a question about..."
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-[#238ae9] focus:border-[#238ae9] transition-colors"
                                    />
                                </div>

                                {/* Message */}
                                <div className="md:col-span-2">
                                    <label htmlFor="message" className="block font-['Satoshi'] text-sm font-medium text-gray-700 mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        placeholder="Type your detailed message or suggestion here..."
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-[#238ae9] focus:border-[#238ae9] transition-colors"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center w-full bg-gradient-to-br from-[#238ae9] to-[#1e7acc] text-white px-8 py-4 rounded-xl font-['Satoshi'] font-bold text-base hover:shadow-xl transition-all shadow-lg group"
                                    >
                                        Send Message
                                        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;