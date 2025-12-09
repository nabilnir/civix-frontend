import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FiArrowRight, FiCheckCircle, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Report Infrastructure Issues",
      subtitle: "Your Voice Matters",
      description: "Spot a pothole? Broken streetlight? Report it instantly and track the resolution in real-time.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
      gradient: "from-[#238ae9] to-white-100",
      stats: [
        { icon: <FiCheckCircle />, label: "1000+ Issues Resolved" },
        { icon: <FiUsers />, label: "500+ Active Citizens" },
        { icon: <FiTrendingUp />, label: "95% Success Rate" }
      ]
    },
    {
      id: 2,
      title: "Track Every Update",
      subtitle: "Stay Informed",
      description: "Get real-time notifications and watch your reported issues move from pending to resolved.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      gradient: "from-blue-600 to-white-50",
      stats: [
        { icon: <FiCheckCircle />, label: "Real-time Tracking" },
        { icon: <FiUsers />, label: "Instant Notifications" },
        { icon: <FiTrendingUp />, label: "24/7 Support" }
      ]
    },
    {
      id: 3,
      title: "Build Better Communities",
      subtitle: "Together We Can",
      description: "Join thousands of citizens making their neighborhoods safer, cleaner, and better every day.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80",
      gradient: "from-gray-900 to-white-100",
      stats: [
        { icon: <FiCheckCircle />, label: "Community Powered" },
        { icon: <FiUsers />, label: "Collaborative Action" },
        { icon: <FiTrendingUp />, label: "Visible Results" }
      ]
    }
  ];

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#f4f6f8]">
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`}></div>
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col justify-center h-full text-white">
                <div className="max-w-2xl">
                  
                  {/* Subtitle - Fade in from top */}
                  <div
                    data-aos="fade-down"
                    data-aos-duration="800"
                    data-aos-delay="200"
                  >
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full font-['Satoshi'] text-sm font-medium mb-4">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Main Title - Fade in from left */}
                  <h1
                    className="font-['Satoshi'] w-full text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                    data-aos="fade-right"
                    data-aos-duration="800"
                    data-aos-delay="400"
                  >
                    {slide.title}
                  </h1>

                  {/* Description - Fade in from left */}
                  <p
                    className="font-['Satoshi'] text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
                    data-aos="fade-right"
                    data-aos-duration="800"
                    data-aos-delay="600"
                  >
                    {slide.description}
                  </p>

                  {/* CTA Buttons  */}
                  <div
                    className="flex flex-wrap gap-4 mb-12"
                    data-aos="zoom-in"
                    data-aos-duration="800"
                    data-aos-delay="800"
                  >
                    <Link
                      to="/all-issues"
                      className="bg-white text-[#238ae9] px-8 py-4 rounded-xl font-['Satoshi'] font-bold text-base hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 group"
                    >
                      Report an Issue
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/about"
                      className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-['Satoshi'] font-bold text-base hover:bg-white/30 transition-all border-2 border-white/50"
                    >
                      Learn More
                    </Link>
                  </div>

                  {/* Stats - Fade up with stagger */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {slide.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay={1000 + idx * 200}
                      >
                        <div className="text-3xl">{stat.icon}</div>
                        <span className="font-['Satoshi'] text-sm font-medium">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all group border-2 border-white/50 hover:scale-110"
        aria-label="Previous slide"
      >
        <IoChevronBack className="text-white text-2xl group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all group border-2 border-white/50 hover:scale-110"
        aria-label="Next slide"
      >
        <IoChevronForward className="text-white text-2xl group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-8 right-8 z-20 hidden lg:block"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="1500"
      >
        <div className="flex flex-col items-center gap-2 text-white animate-bounce">
          <span className="font-['Satoshi'] text-sm font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}