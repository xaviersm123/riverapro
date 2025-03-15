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
        <title>Rivera Pro | Expert Residential Remodeling in Atlanta</title>
        <meta
          name="description"
          content="Rivera Pro offers expert residential remodeling services in Atlanta, including kitchen and bathroom renovations, new construction, additions, and more. Serving Buckhead, Midtown, Sandy Springs, and the greater Atlanta area."
        />
        <meta
          name="keywords"
          content="Atlanta remodeling contractor, residential remodeling, kitchen renovation, bathroom renovation, new construction Atlanta, home additions, sheetrock, concrete, painting, framing, hardwood, carpentry, windows, roofing, siding"
        />
        <meta property="og:title" content="Rivera Pro | Expert Residential Remodeling in Atlanta" />
        <meta
          property="og:description"
          content="Rivera Pro specializes in residential remodeling, new construction, and additions in Atlanta with top-notch craftsmanship. Serving Buckhead, Midtown, and more."
        />
        <meta property="og:image" content="https://riverapro.com/og-image.jpg" />
        <meta property="og:url" content="https://riverapro.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rivera Pro | Expert Residential Remodeling in Atlanta" />
        <meta
          name="twitter:description"
          content="Rivera Pro specializes in residential remodeling, new construction, and additions in Atlanta with top-notch craftsmanship. Serving Buckhead, Midtown, and more."
        />
        <meta name="twitter:image" content="https://riverapro.com/og-image.jpg" />
        <link rel="canonical" href="https://riverapro.com" />
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
              "name": "Rivera Pro",
              "url": "https://riverapro.com",
              "logo": "https://riverapro.com/logo.png",
              "description": "Expert residential remodeling, new construction, and additions in Atlanta with top-quality craftsmanship",
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
              "email": "info@riverapro.com",
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
                "https://facebook.com/riverapro",
                "https://twitter.com/riverapro",
                "https://instagram.com/riverapro"
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