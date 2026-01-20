import React from 'react';
import Banner from '../../components/Home/Banner';
import Features from '../../components/Home/Features';
import HowItWorks from '../../components/Home/HowItWorks';
import LatestIssue from '../../components/Home/LatestIssue';
import Testimonials from '../../components/Home/Testimonials';
import Statistics from '../../components/Home/Statistics';
import Categories from '../../components/Home/Categories';
import Highlights from '../../components/Home/Highlights';
import Blogs from '../../components/Home/Blogs';
import Newsletter from '../../components/Home/Newsletter';
import FAQ from '../../components/Home/FAQ';

const Home = () => {
  return (
    <div>
      <Banner />
      <Statistics />
      <Categories />
      <Highlights />
      <Features />
      <HowItWorks />
      <LatestIssue />
      <Blogs />
      <Testimonials />
      <Newsletter />
      <FAQ />
    </div>
  );
};

export default Home;