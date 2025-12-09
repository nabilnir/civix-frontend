import React from 'react';
import Banner from '../../components/Home/Banner';
import Features from '../../components/Home/Features';
import HowItWorks from '../../components/Home/HowItWorks';
import LatestIssue from '../../components/Home/LatestIssue';
import Testimonials from '../../components/Home/Testimonials';
import Statistics from '../../components/Home/Statistics';

const Home = () => {
  return (
    <div>
        <Banner/>
        <Statistics />
        <Features />
        <HowItWorks />
        <LatestIssue />
        <Testimonials />
    </div>
  );
};

export default Home;