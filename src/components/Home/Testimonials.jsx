import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FiChevronLeft, FiChevronRight, FiMessageSquare, FiStar } from 'react-icons/fi';

// Mock data structure
const mockTestimonialsData = [
  {
    id: 1,
    review: "I reported a massive water leak, and it was fixed within 12 hours! The real-time status updates and notifications made the whole process incredibly transparent. This system truly makes a difference.",
    userName: "Ayesha Khan",
    ratings: 5,
    user_photoURL: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    review: "The ability to track the issue from pending to resolution is fantastic. I used to feel like my reports disappeared into a void, but this platform has brought accountability to city services.",
    userName: "Jamal Uddin",
    ratings: 4.5,
    user_photoURL: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    review: "Reporting a damaged footpath was quick and easy. The staff update was detailed, and I appreciated the follow-up. Great platform for civic engagement!",
    userName: "Sara Ahmed",
    ratings: 5,
    user_photoURL: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    review: "Efficient and user-friendly. The map feature helped me pinpoint the exact location of the broken streetlight, leading to a fast repair. Highly recommended for all citizens.",
    userName: "Michael Jones",
    ratings: 4,
    user_photoURL: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const Testimonials = ({ testimonialsData = mockTestimonialsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto scroll effect
  useEffect(() => {

    if (testimonialsData.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex, testimonialsData.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const getVisibleTestimonials = () => {
    if (testimonialsData.length === 0) return [];

    // This logic ensures that 3 reviews are visible (current, prev, next) for the 3D carousel effect
    const reviews = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + testimonialsData.length) % testimonialsData.length;
      // Assign a 'position' (relative index: -1=left, 0=center, 1=right)
      reviews.push({ ...testimonialsData[index], position: i });
    }
    return reviews;
  };


  const slideVariants = {
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 5,
      filter: 'blur(0px)',
    },
    left: {
      x: '-60%',
      opacity: 0.3,
      scale: 0.85,
      zIndex: 1,
      filter: 'blur(2px)',
    },
    right: {
      x: '60%',
      opacity: 0.3,
      scale: 0.85,
      zIndex: 1,
      filter: 'blur(2px)',
    },
  };

  if (testimonialsData.length === 0) {
    return (
      <section className="py-16 text-center text-gray-500">
        No testimonials available at the moment.
      </section>
    );
  }

  return (
    <section className="py-16 md:py-32 bg-base-200 px-6 overflow-hidden" data-aos="fade-up" data-aos-duration="1000">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-base-100 text-primary rounded-full font-['Satoshi'] text-sm font-medium mb-3"
            data-aos="fade-up" data-aos-duration="600">
            Citizen Feedback
          </span>
          <h2
            className="font-['Satoshi'] text-3xl md:text-4xl lg:text-5xl font-bold text-base-content leading-tight"
            data-aos="fade-up" data-aos-duration="600" data-aos-delay="200"
          >
            Success Stories from Our Community
          </h2>
          <p
            className="font-['Satoshi'] text-lg text-base-content/70 mt-4"
            data-aos="fade-up" data-aos-duration="600" data-aos-delay="400"
          >
            Hear directly from citizens whose issues were efficiently resolved using the system.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative h-[400px] flex items-center justify-center mb-8">
          <AnimatePresence initial={false} custom={direction}>
            {getVisibleTestimonials().map((review) => (
              <motion.div
                key={review.id}
                custom={direction}
                variants={slideVariants}
                // Determine initial and animate state based on the review's calculated position
                initial={review.position === 0 ? 'center' : review.position === -1 ? 'left' : 'right'}
                animate={review.position === 0 ? 'center' : review.position === -1 ? 'left' : 'right'}
                // Use the same transition for smooth sliding
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  filter: { duration: 0.3 },
                }}
                className="absolute w-full max-w-xl cursor-grab active:cursor-grabbing"
              >
                <div className="bg-base-100 rounded-3xl p-8 shadow-xl mx-4 border-t-4 border-primary">

                  {/* Quote Icon - Changed color to primary blue */}
                  <FiMessageSquare className="w-12 h-12 text-primary mb-4 rotate-180" />

                  {/* Review Text */}
                  <p className="text-base-content/70 text-base md:text-lg mb-6 leading-relaxed font-['Satoshi']">
                    {review.review}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-dashed border-base-300 mb-6"></div>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={review.user_photoURL}
                      alt={review.userName}
                      className="w-14 h-14 rounded-full object-cover bg-base-200 shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-base-content text-lg font-['Satoshi']">
                        {review.userName}
                      </h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`text-lg ${i < Math.floor(review.ratings)
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-base-300'
                              }`}
                            size={18}
                          />
                        ))}
                        <span className="text-sm text-base-content/70 ml-2 font-['Satoshi']">
                          {review.ratings}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
          {/* Previous Button - Changed color and icon */}
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-base-100 border border-base-300 flex items-center justify-center hover:bg-base-200 transition-colors shadow-md"
            aria-label="Previous review"
          >
            <FiChevronLeft className="w-6 h-6 text-base-content" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-base-300 w-2.5 hover:bg-base-content/40'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button  */}
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center hover:shadow-lg transition-colors shadow-md"
            aria-label="Next review"
          >
            <FiChevronRight className="w-6 h-6 text-primary-content" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;