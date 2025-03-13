import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../ui/PageTransition';
import Hero from '../home/Hero';
import Services from '../home/Services';
import About from '../home/About';
import FeaturedProjects from './FeaturedProjects';
import Testimonials from '../home/Testimonials';
import CTA from '../home/CTA';
import ContractorServices from './ContractorServices';
import ContactForm from './ContactForm';
import BlogSection from './BlogSection';
import FAQSection from './FAQSection';

const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Elite Contractor | Premium Construction Services in Atlanta</title>
        <meta name="description" content="Elite Contractor provides premium construction and renovation services in Atlanta with exceptional craftsmanship and attention to detail." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Elite Contractor",
              "url": "https://elitecontractor.com",
              "logo": "https://elitecontractor.com/logo.png",
              "description": "Premium construction and renovation services with exceptional craftsmanship",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Construction Ave",
                "addressLocality": "Atlanta",
                "addressRegion": "GA",
                "postalCode": "30301",
                "addressCountry": "US"
              },
              "telephone": "+15551234567",
              "email": "info@elitecontractor.com"
            }
          `}
        </script>
      </Helmet>

      <Hero />
      <Services />
      <ContractorServices />
      <About />
      <FeaturedProjects />
      <Testimonials />
      <FAQSection />
      <BlogSection />
      <ContactForm />
      <CTA />
    </PageTransition>
  );
};

export default HomePage;
