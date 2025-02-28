import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, Hammer, PaintBucket, Palette, Users } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../ui/ServiceCard';

const Services: React.FC = () => {
  const services = [
    {
      icon: Home,
      title: 'Residential Construction',
      description: 'Custom home building with premium materials and expert craftsmanship for your dream living space.'
    },
    {
      icon: Building2,
      title: 'Commercial Construction',
      description: 'Efficient and high-quality commercial building solutions tailored to your business needs.'
    },
    {
      icon: Hammer,
      title: 'Renovation',
      description: 'Transform your existing space with our comprehensive renovation and remodeling services.'
    },
    {
      icon: Palette,
      title: 'Interior Design',
      description: 'Thoughtful interior design that balances aesthetics, functionality, and your personal style.'
    },
    {
      icon: PaintBucket,
      title: 'Exterior Design',
      description: 'Create stunning curb appeal with our expert exterior design and landscaping services.'
    },
    {
      icon: Users,
      title: 'Consultation',
      description: 'Professional guidance and planning to help you make informed decisions about your project.'
    }
  ];

  return (
    <section id="services" className="section bg-secondary-50">
      <div className="container-custom">
        <SectionHeading
          title="Our Services"
          subtitle="We offer a comprehensive range of construction and design services to bring your vision to life."
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