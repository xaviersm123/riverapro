import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Hammer, PaintRoller, DoorClosed, Layers } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../ui/ServiceCard';

const Services: React.FC = () => {
  const services = [
    {
      icon: Home,
      title: 'New Construction',
      description: 'Build your dream home from the ground up with our expert new construction services, delivering quality and precision.'
    },
    {
      icon: Hammer,
      title: 'Remodeling',
      description: 'Transform your home with our comprehensive remodeling services, specializing in kitchens, bathrooms, basements, and more.'
    },
    {
      icon: Layers,
      title: 'Additions',
      description: 'Expand your living space with custom additions, seamlessly integrated into your existing home with top-notch craftsmanship.'
    },
    {
      icon: PaintRoller,
      title: 'Painting & Finishing',
      description: 'Enhance your home’s look with professional painting, sheetrock, and finishing services for a flawless result.'
    },
    {
      icon: DoorClosed,
      title: 'Windows & Siding',
      description: 'Upgrade your home’s exterior with energy-efficient windows and durable siding, installed with precision.'
    },
    {
      icon: Hammer,
      title: 'Carpentry & Framing',
      description: 'Expert carpentry and framing services to ensure your home’s structure is solid and beautifully crafted.'
    }
  ];

  return (
    <section id="services" className="section bg-secondary-50">
      <div className="container-custom">
        <SectionHeading
          title="Our Services"
          subtitle="Rivera Pro specializes in residential remodeling, new construction, and additions, delivering exceptional quality in every project."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/services" className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;