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
import EnhancedTimelineStep from '../components/ui/EnhancedTimelineStep';

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 'new-construction',
      icon: Home,
      title: 'New Construction',
      description: 'Build your dream home with expert craftsmanship and attention to detail.',
      features: ['Custom home designs', 'Home additions', 'Eco-friendly construction', 'Smart home integration'],
      image: 'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'remodeling',
      icon: Hammer,
      title: 'Residential Remodeling',
      description: 'Transform your home with personalized renovations and quality finishes.',
      features: ['Kitchen renovations', 'Bathroom upgrades', 'Basement finishing'],
      image: 'https://images.unsplash.com/photo-1616594168015-7e4c3b9da2e7?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'roofing',
      icon: PaintBucket,
      title: 'Roofing Solutions',
      description: 'Ensure your home’s protection with durable and reliable roofing services.',
      features: ['Roof repairs', 'Replacements', 'Inspections'],
      image: 'https://images.unsplash.com/photo-1600585153491-995b341b8a01?auto=format&fit=crop&w=1170&q=80',
      tagline: 'Your Home’s First Line of Defense!'
    },
    {
      id: 'windows-siding',
      icon: PaintBucket,
      title: 'Windows & Siding',
      description: 'Enhance your home’s exterior with energy-efficient and stylish upgrades.',
      features: ['Window installation', 'Siding replacements', 'Weatherproofing'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80',
      tagline: 'Style Meets Durability!'
    },
    {
      id: 'sustainable',
      icon: Leaf,
      title: 'Sustainable Building',
      description: 'Create an eco-friendly home with sustainable construction practices.',
      features: ['Energy-efficient materials', 'Solar integration', 'Water conservation'],
      image: 'https://images.unsplash.com/photo-1575550959106-5a9defe6b388?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'painting',
      icon: PaintBucket,
      title: 'Painting & Finishing',
      description: 'Refresh your home with professional painting and flawless finishes.',
      features: ['Interior painting', 'Exterior painting', 'Sheetrock finishing'],
      image: 'https://images.unsplash.com/photo-1572125116898-2b0c6e2e6f2e?auto=format&fit=crop&w=1170&q=80',
      tagline: 'A Flawless Finish Every Time!'
    },
    {
      id: 'framing',
      icon: Wrench,
      title: 'Framing & Structural Work',
      description: 'Lay a strong foundation for your home with expert structural services.',
      features: ['Wall framing', 'Structural repairs', 'Custom builds'],
      image: 'https://ewimeryzhqirfyalakzi.supabase.co/storage/v1/object/public/project-images//construction-19696_1280.jpg',
      tagline: 'Built to Last!'
    },
    {
      id: 'hardwood-lvp',
      icon: Layers,
      title: 'Hardwood & LVP Flooring',
      description: 'Elevate your home with stunning Hardwood and LVP flooring solutions.',
      features: ['Hardwood installation', 'LVP installation', 'Refinishing', 'Custom designs'],
      image: 'https://ewimeryzhqirfyalakzi.supabase.co/storage/v1/object/public/project-images//pexels-kindelmedia-8487769.jpg',
      tagline: 'Timeless Elegance Underfoot!'
    },
    {
      id: 'carpentry',
      icon: TreePine,
      title: 'Custom Carpentry',
      description: 'Add unique wooden elements to your home with expert carpentry.',
      features: ['Custom cabinets', 'Trim work', 'Built-in shelving'],
      image: 'https://ewimeryzhqirfyalakzi.supabase.co/storage/v1/object/public/project-images//measures-5446219_1280.jpg',
      tagline: 'Crafted with Precision!'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Consultation',
      description: 'We begin with a detailed discussion to understand your home improvement goals.',
      details: 'Led by Edwin Rivera, our team meets with you to assess your vision, budget, and timeline for your residential project, offering tailored advice.'
    },
    {
      step: 2,
      title: 'Design & Planning',
      description: 'We create custom designs and plans for your home project.',
      details: 'Our designers develop detailed blueprints and visuals, incorporating your input to ensure your remodeling or construction plan is perfect.'
    },
    {
      step: 3,
      title: 'Proposal & Contract',
      description: 'We present a clear proposal with scope, timeline, and costs.',
      details: 'You’ll receive a detailed plan outlining timelines, materials, and costs for your home improvement, ensuring complete transparency.'
    },
    {
      step: 4,
      title: 'Construction',
      description: 'Our craftsmen execute your home project with precision.',
      details: 'Our skilled team brings your design to life with high-quality materials, providing regular updates and site visits throughout the process.'
    },
    {
      step: 5,
      title: 'Quality Assurance',
      description: 'We ensure every aspect meets our high standards.',
      details: 'We perform rigorous inspections to confirm your home project meets Rivera Pro’s excellence standards, making adjustments as needed.'
    },
    {
      step: 6,
      title: 'Project Completion',
      description: 'We deliver your finished home and ensure your satisfaction.',
      details: 'We guide you through the completed project, providing warranties and support for your newly enhanced home.'
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Our Services | Rivera Pro</title>
        <meta
          name="description"
          content="Discover Rivera Pro’s expert services in residential remodeling, new construction, and home enhancements in Atlanta."
        />
      </Helmet>

      <ParallaxHero
        title="Our Expertise, Your Home"
        subtitle="Delivering top-tier residential remodeling, new construction, and improvements."
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
      />

      <ToolBeltHeader />

      <section className="section bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <SectionHeading
            title="What We Offer Your Home"
            subtitle="Premium residential remodeling and construction services designed for you."
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
              Our Signature Services
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
            title="How We Enhance Your Home"
            subtitle="A streamlined process for your remodeling or construction journey."
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
{/* Subtle Blueprint Background */}

export default ServicesPage;