import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import About from '../components/home/About';
import ContractorServices from '../components/home/ContractorServices';
import ContactForm from '../components/home/ContactForm';
import CTA from '../components/home/CTA';
import ProjectStatistics from '../components/home/ProjectStatistics';
import CalloutBanner from '../components/home/CalloutBanner';

const FeaturedProjects = lazy(() => import('../components/home/FeaturedProjects'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const FAQSection = lazy(() => import('../components/home/FAQSection'));
const LocalServices = lazy(() => import('../components/home/LocalServices'));

const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Elite Contractor | Premium Construction Services in Atlanta</title>
        <meta
          name="description"
          content="Elite Contractor provides premium construction, renovation, and remodeling services in Atlanta with exceptional craftsmanship and attention to detail. Serving Buckhead, Midtown, Sandy Springs, and the greater Atlanta area."
        />
        <meta
          name="keywords"
          content="Atlanta contractor, home renovation Atlanta, construction services, kitchen remodeling, bathroom renovation, home improvement Atlanta, custom builds, Atlanta remodeling contractor"
        />
        <meta property="og:title" content="Elite Contractor | Premium Construction Services in Atlanta" />
        <meta
          property="og:description"
          content="Elite Contractor provides premium construction, renovation, and remodeling services in Atlanta with exceptional craftsmanship. Serving Buckhead, Midtown, and more."
        />
        <meta property="og:image" content="https://elitecontractor.com/og-image.jpg" />
        <meta property="og:url" content="https://elitecontractor.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elite Contractor | Premium Construction Services in Atlanta" />
        <meta
          name="twitter:description"
          content="Elite Contractor provides premium construction, renovation, and remodeling services in Atlanta with exceptional craftsmanship. Serving Buckhead, Midtown, and more."
        />
        <meta name="twitter:image" content="https://elitecontractor.com/og-image.jpg" />
        <link rel="canonical" href="https://elitecontractor.com" />
        <link
          rel="preload"
          href="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80&fm=webp"
          as="image"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Defer Non-Critical Scripts */}
        <script defer src="/path/to/framer-motion.js"></script>
        <script defer src="/path/to/lucide-react.js"></script>
        <script defer src="/path/to/react-router-dom.js"></script>

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "Elite Contractor",
              "url": "https://elitecontractor.com",
              "logo": "https://elitecontractor.com/logo.png",
              "description": "Premium construction and renovation services with exceptional craftsmanship in Atlanta",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Construction Ave",
                "addressLocality": "Atlanta",
                "addressRegion": "GA",
                "postalCode": "30301",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "33.7490",
                "longitude": "-84.3880"
              },
              "telephone": "+15551234567",
              "email": "info@elitecontractor.com",
              "areaServed": [
                {"@type": "City", "name": "Atlanta"},
                {"@type": "City", "name": "Buckhead"},
                {"@type": "City", "name": "Midtown"},
                {"@type": "City", "name": "Sandy Springs"}
              ],
              "priceRange": "$$-$$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "17:00"
                }
              ],
              "sameAs": [
                "https://facebook.com/elitecontractor",
                "https://twitter.com/elitecontractor",
                "https://instagram.com/elitecontractor"
              ]
            }
          `}
        </script>
      </Helmet>

      <Hero />
      <ProjectStatistics />
      <Services />
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <LocalServices />
        <ContractorServices />
        <CalloutBanner />
        <About />
        <FeaturedProjects />
        <Testimonials />
        <FAQSection />
        <ContactForm />
        <CTA />
      </Suspense>
    </PageTransition>
  );
};

export default HomePage;