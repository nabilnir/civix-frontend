import React from 'react';
import { Link } from 'react-router';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CallToAction = () => {
  const benefits = [
    'Track issues in real-time',
    'Get priority support',
    'Unlimited issue reports',
    'Boost issue visibility',
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className="text-white"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full font-['Satoshi'] text-sm font-medium mb-4">
              Premium Features
            </span>

            <h2 className="font-['Satoshi'] text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Upgrade to Premium
              <br />
              <span className="text-white/90">Unlock Unlimited Reports</span>
            </h2>

            <p className="font-['Satoshi'] text-lg text-white/90 mb-8 leading-relaxed">
              Join thousands of premium citizens who are making a real difference in their communities. Get priority support and unlimited issue reporting.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 font-['Satoshi']"
                  data-aos="fade-right"
                  data-aos-delay={200 + index * 100}
                >
                  <FiCheckCircle className="text-white flex-shrink-0" size={20} />
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Link
                to="/register"
                className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-xl font-['Satoshi'] font-bold text-base hover:bg-base-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                Get Started Free
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/dashboard/profile"
                className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-['Satoshi'] font-bold text-base hover:bg-white/30 transition-all border-2 border-white/50"
              >
                Upgrade Now
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div
            className="relative"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
              <div className="text-center">
                <div className="mb-6">
                  <span className="text-5xl md:text-6xl font-bold text-white font-['Satoshi']">
                    1000
                  </span>
                  <span className="text-2xl text-white/80 font-['Satoshi'] ml-2">
                    BDT
                  </span>
                </div>
                <p className="text-white/90 font-['Satoshi'] text-lg mb-6">
                  One-time payment
                </p>
                <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
                  <p className="text-white font-['Satoshi'] font-semibold mb-2">
                    What you get:
                  </p>
                  <ul className="text-white/90 text-sm space-y-2 font-['Satoshi'] text-left">
                    <li className="flex items-center gap-2">
                      <FiCheckCircle size={16} />
                      Unlimited issue reports
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheckCircle size={16} />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheckCircle size={16} />
                      Boost issues for free
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheckCircle size={16} />
                      Advanced analytics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
