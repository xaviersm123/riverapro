// src/pages/HomePage.tsx
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

// Lazy load components below the fold
const FeaturedProjects = lazy(() => import('../components/home/FeaturedProjects'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const FAQSection = lazy(() => import('../components/home/FAQSection'));
const LocalServices = lazy(() => import('../components/home/LocalServices'));

// Simple Loading Component for Suspense Fallback
const SimpleLoadingFallback: React.FC = () => (
  <div className="text-center py-10 text-secondary-600">Loading content...</div>
);

const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        {/* SEO Meta Tags */}
        <title>Rivera Pro | Expert Residential Remodeling in Atlanta</title>
        <meta
          name="description"
          content="Rivera Pro offers expert residential remodeling services in Atlanta, including kitchen and bathroom renovations, new construction, additions, and more. Serving Buckhead, Midtown, Sandy Springs, and the greater Atlanta area."
        />
        <meta
          name="keywords"
          content="Atlanta remodeling contractor, residential remodeling, kitchen renovation, bathroom renovation, new construction Atlanta, home additions, sheetrock, concrete, painting, framing, hardwood, carpentry, windows, roofing, siding"
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Rivera Pro | Expert Residential Remodeling in Atlanta" />
        <meta
          property="og:description"
          content="Rivera Pro specializes in residential remodeling, new construction, and additions in Atlanta with top-notch craftsmanship. Serving Buckhead, Midtown, and more."
        />
        <meta property="og:image" content="https://riverapro.com/og-image.jpg" /> {/* Ensure this exists */}
        <meta property="og:url" content="https://riverapro.com" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rivera Pro | Expert Residential Remodeling in Atlanta" />
        <meta
          name="twitter:description"
          content="Rivera Pro specializes in residential remodeling, new construction, and additions in Atlanta with top-notch craftsmanship. Serving Buckhead, Midtown, and more."
        />
        <meta name="twitter:image" content="https://riverapro.com/og-image.jpg" /> {/* Ensure this exists */}
        {/* Canonical URL */}
        <link rel="canonical" href="https://riverapro.com" />
        {/* Preconnect to external domains if frequently used */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* NOTE: Removed incorrect manual <script defer> tags here */}

        {/* Structured Data (Schema.org) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "Rivera Pro",
              "url": "https://riverapro.com",
              "logo": "https://riverapro.com/logo.png", // Ensure this exists
              "description": "Expert residential remodeling, new construction, and additions in Atlanta with top-quality craftsmanship",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Construction Ave", // Use actual address if possible or remove if N/A
                "addressLocality": "Atlanta",
                "addressRegion": "GA",
                "postalCode": "30301", // Use relevant zip
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "33.7490",
                "longitude": "-84.3880"
              },
              "telephone": "+14042590577", // Primary phone number
              "email": "Riverapro67@gmail.com",
              "areaServed": [
                {"@type": "City", "name": "Atlanta"},
                {"@type": "City", "name": "Buckhead"},
                {"@type": "City", "name": "Midtown"},
                {"@type": "City", "name": "Sandy Springs"}
              ],
              "priceRange": "$$-$$$", // Adjust if needed
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "17:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday"],
                  "opens": "09:00",
                  "closes": "14:00"
                }
              ],
              "sameAs": [ // Update with actual social media links
                "https://facebook.com/riverapro",
                "https://twitter.com/riverapro",
                "https://instagram.com/riverapro"
              ]
            }
          `}
        </script>
      </Helmet>

      {/* Page Content */}
      <Hero />
      <ProjectStatistics />
      <Services />
      {/* Use Suspense to show a fallback while lazy components load */}
      <Suspense fallback={<SimpleLoadingFallback />}>
        <LocalServices />
        <ContractorServices />
        <CalloutBanner />
        <About />
        <FeaturedProjects />
        <Testimonials />
        <FAQSection />
      </Suspense>
      <ContactForm />
      <CTA />
    </PageTransition>
  );
};

export default HomePage;