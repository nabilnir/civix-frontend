import React from 'react';
import Banner from '../../components/Home/Banner';
import Features from '../../components/Home/Features';
import HowItWorks from '../../components/Home/HowItWorks';
import LatestIssue from '../../components/Home/LatestIssue';
import Testimonials from '../../components/Home/Testimonials';

const Home = () => {
  return (
    <div>
        <Banner/>
        <Features />
        <HowItWorks />
        <LatestIssue />
        <Testimonials />
    </div>
  );
};

export default Home;