import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, Building2, Hammer, Palette, PaintBucket, Users, CheckCircle } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import CTA from '../components/home/CTA';

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 'residential',
      icon: Home,
      title: 'Residential Construction',
      description: 'We build custom homes that reflect your unique style and meet your specific needs. From concept to completion, our team works closely with you to create a living space that exceeds your expectations.',
      features: [
        'Custom home design and construction',
        'Home additions and expansions',
        'Luxury home building',
        'Energy-efficient home construction',
        'Smart home integration'
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'commercial',
      icon: Building2,
      title: 'Commercial Construction',
      description: 'We deliver high-quality commercial construction services for businesses of all sizes. Our experienced team ensures that your project is completed on time, within budget, and to the highest standards.',
      features: [
        'Office buildings and retail spaces',
        'Restaurants and hospitality venues',
        'Medical facilities',
        'Industrial buildings',
        'Tenant improvements and build-outs'
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'renovation',
      icon: Hammer,
      title: 'Renovation',
      description: 'Transform your existing space with our comprehensive renovation services. Whether you are looking to update a single room or completely remodel your home or business, we have the expertise to bring your vision to life.',
      features: [
        'Kitchen and bathroom remodeling',
        'Basement finishing',
        'Whole-house renovations',
        'Historic building restoration',
        'Commercial space renovations'
      ],
      image: 'https://images.unsplash.com/photo-1574359411659-15573a27d625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'interior',
      icon: Palette,
      title: 'Interior Design',
      description: 'Our interior design services help you create beautiful, functional spaces that reflect your personal style and meet your practical needs. We work with you to select the perfect colors, materials, and furnishings for your space.',
      features: [
        'Space planning and layout design',
        'Color and material selection',
        'Custom furniture and cabinetry',
        'Lighting design',
        'Accessory and art curation'
      ],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'exterior',
      icon: PaintBucket,
      title: 'Exterior Design',
      description: 'Enhance your property\'s curb appeal with our exterior design services. From facade improvements to landscaping, we help you create an impressive and welcoming exterior that complements your building\'s architecture.',
      features: [
        'Facade design and improvements',
        'Outdoor living spaces',
        'Landscaping design',
        'Hardscaping and patios',
        'Exterior lighting design'
      ],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 'consultation',
      icon: Users,
      title: 'Consultation',
      description: 'Not sure where to start? Our consultation services provide expert guidance to help you plan your project, make informed decisions, and avoid costly mistakes. We offer professional advice on design, materials, budgeting, and more.',
      features: [
        'Project feasibility studies',
        'Budget planning and cost estimation',
        'Material and finish selection',
        'Sustainable building consultation',
        'Regulatory compliance guidance'
      ],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Our Services | Elite Contractor</title>
        <meta name="description" content="Explore our range of construction and renovation services. Whether you're looking to update a single room or undertake a full-scale renovation, we have the expertise to bring your vision to life." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-secondary-200">
              Comprehensive construction and design solutions tailored to your unique needs and vision.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="section">
        <div className="container-custom">
          <SectionHeading
            title="What We Offer"
            subtitle="From initial concept to final completion, we provide end-to-end services to bring your vision to life."
          />
          
          {services.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className={`py-16 ${index !== services.length - 1 ? 'border-b border-secondary-200' : ''}`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg overflow-hidden"
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-lg text-primary-600 mb-4">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-secondary-600 mb-6">{service.description}</p>
                  
                  <h3 className="text-xl font-semibold mb-4">What We Provide:</h3>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-secondary-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Process Section */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <SectionHeading
            title="Our Process"
            subtitle="We follow a structured approach to ensure your project is completed successfully from start to finish."
            centered
          />
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 hidden md:block"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12 relative">
              {[
                {
                  step: 1,
                  title: 'Consultation',
                  description: 'We begin with a thorough consultation to understand your vision, requirements, and budget.'
                },
                {
                  step: 2,
                  title: 'Design & Planning',
                  description: 'Our team develops detailed designs and plans, incorporating your feedback at every stage.'
                },
                {
                  step: 3,
                  title: 'Proposal & Contract',
                  description: 'We provide a comprehensive proposal outlining scope, timeline, and costs for your approval.'
                },
                {
                  step: 4,
                  title: 'Construction',
                  description: 'Our skilled craftsmen execute the project with precision, quality, and attention to detail.'
                },
                {
                  step: 5,
                  title: 'Quality Assurance',
                  description: 'We conduct thorough inspections to ensure everything meets our high standards.'
                },
                {
                  step: 6,
                  title: 'Project Completion',
                  description: 'We deliver the finished project and walk you through to ensure your complete satisfaction.'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white font-bold mb-4">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-secondary-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                  
                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <CTA />
    </PageTransition>
  );
};

export default ServicesPage;