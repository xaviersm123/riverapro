import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import About from '../components/home/About';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Elite Contractor | Premium Construction Services</title>
        <meta name="description" content="Elite Contractor provides premium construction and renovation services with exceptional craftsmanship and attention to detail." />
      </Helmet>
      
      <Hero />
      <Services />
      <About />
      <FeaturedProjects />
      <Testimonials />
      <CTA />
    </PageTransition>
  );
};

export default HomePage;