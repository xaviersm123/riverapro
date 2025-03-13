import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Home, Building2, Hammer, Palette, PaintBucket, Wrench, Layers, TreePine, Droplet, Leaf } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import CTA from '../components/home/CTA';
import EnhancedServiceSection from '../components/services/EnhancedServiceSection';
import CardServiceSection from '../components/services/CardServiceSection';
import ToolBeltHeader from '../components/ui/ToolBeltHeader';
import ParallaxHero from '../components/ui/ParallaxHero';
import EnhancedTimelineStep from '../components/ui/EnhancedTimelineStep'; // New component

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 'residential',
      icon: Home,
      title: 'Residential Construction',
      description: 'Dream homes built with heart, precision, and a touch of magic!',
      features: ['Custom designs', 'Additions', 'Luxury builds', 'Eco-friendly options', 'Smart tech'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'commercial',
      icon: Building2,
      title: 'Commercial Construction',
      description: 'Business spaces that work as hard as you do—built to impress.',
      features: ['Offices', 'Retail', 'Restaurants', 'Medical facilities', 'Tenant upgrades'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'renovation',
      icon: Hammer,
      title: 'Renovation Revolution',
      description: 'Old spaces, new stories—transformations that pack a punch!',
      features: ['Kitchens', 'Bathrooms', 'Basements', 'Historic restos', 'Commercial revamps'],
      image: 'https://images.unsplash.com/photo-1574359411659-15573a27d625?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'interior',
      icon: Palette,
      title: 'Interior Design Magic',
      description: 'Spaces that pop—style and function in perfect harmony.',
      features: ['Layouts', 'Colors', 'Custom furniture', 'Lighting', 'Art curation'],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'exterior',
      icon: PaintBucket,
      title: 'Exterior Design',
      description: 'Curb appeal that turns heads—outdoor living, redefined.',
      features: ['Facades', 'Patios', 'Landscaping', 'Hardscaping', 'Lighting'],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'sustainable',
      icon: Leaf,
      title: 'Sustainable Building Solutions',
      description: 'Green living starts here—sustainable designs for a better future!',
      features: ['Solar panel integration', 'Energy-efficient materials', 'Water conservation systems', 'Green certifications', 'Eco-friendly landscaping'],
      image: 'https://images.unsplash.com/photo-1575550959106-5a9defe6b388?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'plumbing',
      icon: Wrench,
      title: 'Precision Plumbing',
      description: 'Flowing solutions with no leaks attached—plumbing done right!',
      features: ['Leak fixes', 'Pipe installs', 'Water heaters', 'Drain cleaning', '24/7 emergencies'],
      image: 'https://images.unsplash.com/photo-1581091870622-1c6b8f8c1b3b?auto=format&fit=crop&w=1170&q=80',
      tagline: 'We Keep the Water Where It Belongs!'
    },
    {
      id: 'flooring',
      icon: Layers,
      title: 'Fabulous Flooring',
      description: 'Step up your style with floors that steal the show!',
      features: ['Hardwood', 'Tile & stone', 'Carpet', 'Laminate', 'Refinishing'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80',
      tagline: 'Every Step Feels Like Home!'
    },
    {
      id: 'woodworking',
      icon: TreePine,
      title: 'Masterful Woodworking',
      description: 'Crafted with love—woodwork that’s a cut above the rest!',
      features: ['Custom cabinets', 'Shelving', 'Furniture', 'Trim', 'Restoration'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80',
      tagline: 'We Nail It Every Time!'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Consultation',
      description: 'We begin with a thorough consultation to understand your vision, requirements, and budget.',
      details: 'Our team sits down with you to understand your vision, budget, and timeline. We’ll discuss your needs in detail and provide expert advice to ensure we’re aligned from the start.'
    },
    {
      step: 2,
      title: 'Design & Planning',
      description: 'Our team develops detailed designs and plans, incorporating your feedback at every stage.',
      details: 'Our designers create detailed plans and 3D renderings, incorporating your feedback at every step. This phase ensures that every detail aligns with your vision before we start building.'
    },
    {
      step: 3,
      title: 'Proposal & Contract',
      description: 'We provide a comprehensive proposal outlining scope, timeline, and costs for your approval.',
      details: 'We develop a comprehensive project plan, including timelines, resource allocation, and milestones. You’ll receive a clear roadmap of what to expect at every stage of the process.'
    },
    {
      step: 4,
      title: 'Construction',
      description: 'Our skilled craftsmen execute the project with precision, quality, and attention to detail.',
      details: 'Our skilled craftsmen bring the design to life, using high-quality materials and techniques. We keep you updated with regular progress reports and site visits to ensure everything is on track.'
    },
    {
      step: 5,
      title: 'Quality Assurance',
      description: 'We conduct thorough inspections to ensure everything meets our high standards.',
      details: 'We conduct thorough inspections and quality checks to ensure everything meets our high standards. Any final adjustments are made to guarantee your complete satisfaction.'
    },
    {
      step: 6,
      title: 'Project Completion',
      description: 'We deliver the finished project and walk you through to ensure your complete satisfaction.',
      details: 'We walk you through the finished project, ensuring every detail is perfect. We provide all necessary documentation and warranties, and we’re here for any follow-up support you might need.'
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Our Services | Elite Craft Co.</title>
        <meta name="description" content="Discover our expert services in construction, design, woodworking, flooring, and plumbing. We bring your vision to life with skill and style!" />
      </Helmet>

      <ParallaxHero
        title="Our Craft, Your Vision"
        subtitle="From woodworking wonders to plumbing perfection, we build it all with flair."
        backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
      />

      <ToolBeltHeader />

      <section className="section bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <SectionHeading
            title="What We Bring to the Table"
            subtitle="End-to-end solutions with a passion for craftsmanship—especially in woodworking, flooring, and plumbing!"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {services.slice(0, 6).map((service, index) => (
              <CardServiceSection
                key={service.id}
                id={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                image={service.image}
                index={index}
              />
            ))}
          </div>

          <div className="py-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center text-primary-700 mb-12"
            >
              Our Signature Craft
            </motion.h2>
            {services.slice(6).map((service, index) => (
              <EnhancedServiceSection
                key={service.id}
                id={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                image={service.image}
                reverse={index % 2 === 1}
                tagline={service.tagline}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Process Section with Timeline */}
      <section className="section bg-secondary-50 relative overflow-hidden">
        {/* Subtle Blueprint Background */}
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80)' }}
        />
        <div className="container-custom relative z-10">
          <SectionHeading
            title="How We Build Your Dreams"
            subtitle="A step-by-step process that’s as solid as our woodworking!"
            centered
          />
          <div className="relative max-w-4xl mx-auto">
            {processSteps.map((item, index) => (
              <EnhancedTimelineStep
                key={index}
                step={item.step}
                title={item.title}
                description={item.description}
                details={item.details}
                isLast={index === processSteps.length - 1}
                reverse={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </PageTransition>
  );
};

export default ServicesPage;