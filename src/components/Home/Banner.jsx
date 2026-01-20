import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { FiArrowRight, FiCheckCircle, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const nextSlide = useCallback(() => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating, slides.length]);

  const prevSlide = () => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Auto-play slider
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-base-200">
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center ${index === currentSlide
              ? 'opacity-100 scale-100 z-10'
              : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              willChange: 'transform, opacity',
              transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1), transform 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90 transition-opacity duration-1000`}
              style={{
                opacity: index === currentSlide ? 0.9 : 0
              }}
            ></div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col justify-center h-full text-white">
                <div
                  className="max-w-2xl"
                  style={{
                    opacity: index === currentSlide ? 1 : 0,
                    transform: index === currentSlide ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms',
                    willChange: 'transform, opacity'
                  }}
                >

                  {/* Subtitle */}
                  <div
                    className="mb-4"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? 'translateY(0)' : 'translateY(-20px)',
                      transition: 'opacity 600ms ease-out 300ms, transform 600ms ease-out 300ms'
                    }}
                  >
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full font-['Satoshi'] text-sm font-medium">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1
                    className="font-['Satoshi'] w-full text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight drop-shadow-lg"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 700ms ease-out 400ms, transform 700ms ease-out 400ms'
                    }}
                  >
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p
                    className="font-['Satoshi'] text-base md:text-lg text-white/90 mb-6 leading-relaxed drop-shadow-md"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 700ms ease-out 500ms, transform 700ms ease-out 500ms'
                    }}
                  >
                    {slide.description}
                  </p>

                  {/* CTA Buttons  */}
                  <div
                    className="flex flex-wrap gap-4 mb-8"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      transform: index === currentSlide ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                      transition: 'opacity 700ms ease-out 600ms, transform 700ms ease-out 600ms'
                    }}
                  >
                    <Link
                      to="/allissues"
                      className="bg-base-100 text-primary px-6 py-3 rounded-xl font-['Satoshi'] font-bold text-sm md:text-base hover:bg-base-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 group"
                    >
                      Report an Issue
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/aboutUs"
                      className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-['Satoshi'] font-bold text-sm md:text-base hover:bg-white/30 transition-all duration-300 border-2 border-white/50"
                    >
                      Learn More
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {slide.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4"
                        style={{
                          opacity: index === currentSlide ? 1 : 0,
                          transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                          transition: `opacity 600ms ease-out ${700 + idx * 100}ms, transform 600ms ease-out ${700 + idx * 100}ms`
                        }}
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

      {/* Navigation Arrows - Hidden on mobile */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full items-center justify-center transition-all duration-300 group border-2 border-white/50 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <IoChevronBack className="text-white text-2xl group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full items-center justify-center transition-all duration-300 group border-2 border-white/50 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <IoChevronForward className="text-white text-2xl group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`transition-all duration-300 ease-out rounded-full ${index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
                } disabled:cursor-not-allowed`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
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