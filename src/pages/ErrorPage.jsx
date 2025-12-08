import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import videoSrc from ''

const NotFound = () => {
    
    
   
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#f4f6f8] py-20">
            <div 
                className="text-center max-w-4xl mx-auto px-4"
                data-aos="fade-up" 
                data-aos-duration="1000"
            >
                
                {/* Visual Placeholder */}
                {videoSrc ? (
                    <div className="w-full max-w-lg mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl">
                        <video 
                            src={videoSrc} 
                            autoPlay 
                            loop 
                            muted 
                            className="w-full h-auto object-cover"
                            aria-describedby="error-message"
                        />
                    </div>
                ) : (
                    
                    <div className="w-full max-w-lg mx-auto mb-8 h-64 rounded-2xl flex flex-col items-center justify-center bg-white border-4 border-dashed border-gray-300 shadow-xl">
                        <FiAlertTriangle className="text-[#238ae9] text-5xl mb-4 animate-pulse" />
                        <p className="font-['Satoshi'] text-xl font-bold text-gray-500">
                            Video Placeholder
                        </p>
                        <p className="font-['Satoshi'] text-sm text-gray-400">
                            Add your 404 video illustration here (src="").
                        </p>
                    </div>
                )}


                <h1 
                    id="error-message"
                    className="font-['Satoshi'] text-7xl md:text-9xl font-extrabold text-[#238ae9] leading-none mb-4"
                    data-aos="fade-up" 
                    data-aos-delay="200"
                >
                    404
                </h1>
                
                <h2 
                    className="font-['Satoshi'] text-3xl md:text-4xl font-bold text-[#242424] mb-4"
                    data-aos="fade-up" 
                    data-aos-delay="400"
                >
                    Page Not Found
                </h2>
                
                <p 
                    className="font-['Satoshi'] text-lg text-gray-600 mb-8 max-w-xl mx-auto"
                    data-aos="fade-up" 
                    data-aos-delay="600"
                >
                    Oops! It looks like you've encountered a broken path. The infrastructure you were looking for doesn't exist here.
                </p>
                
                <Link
                    to="/"
                    className="inline-flex items-center bg-gradient-to-br from-[#238ae9] to-[#1e7acc] text-white px-8 py-4 rounded-xl font-['Satoshi'] font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all shadow-lg group"
                    data-aos="fade-up" 
                    data-aos-delay="800"
                >
                    <FiHome className="mr-2 text-xl group-hover:-translate-y-0.5 transition-transform" />
                    Return to Home Base
                </Link>
            </div>
        </div>
    );
};

export default NotFound;