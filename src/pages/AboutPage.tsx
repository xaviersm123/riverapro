import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Briefcase, CheckCircle } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import CTA from '../components/home/CTA';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: Award, value: '20+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Briefcase, value: '750+', label: 'Projects Completed' },
    { icon: Clock, value: '98%', label: 'On-Time Completion' }
  ];

  const values = [
    {
      title: 'Quality Craftsmanship',
      description: 'We take pride in our work and are committed to delivering the highest quality in every project we undertake.'
    },
    {
      title: 'Integrity & Transparency',
      description: 'We operate with honesty and transparency, ensuring clear communication and fair pricing throughout the process.'
    },
    {
      title: 'Client-Centered Approach',
      description: 'Your vision and satisfaction are our top priorities. We listen carefully and tailor our services to meet your specific needs.'
    },
    {
      title: 'Innovation & Expertise',
      description: 'We stay at the forefront of industry trends and technologies to bring innovative solutions to your projects.'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible practices and sustainable building methods.'
    },
    {
      title: 'Reliability',
      description: 'We deliver on our promises, completing projects on time and within budget without compromising on quality.'
    }
  ];

  const team = [
    {
      name: 'John Anderson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Lead Architect',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
    },
    {
      name: 'David Chen',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Sarah Johnson',
      role: 'Interior Designer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80'
    }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>About Us | Elite Contractor</title>
        <meta name="description" content="Learn about Elite Contractor's history, values, and the expert team behind our premium construction services." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Elite Contractor</h1>
            <p className="text-xl text-secondary-200">
              Building excellence through craftsmanship, innovation, and unwavering commitment to quality since 2005.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Our story" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title">Our Story</h2>
              <p className="text-secondary-600 mb-6">
                Founded in 2005 by John Anderson, Elite Contractor began as a small residential renovation company with a big vision: to transform the construction industry by prioritizing quality, integrity, and client satisfaction above all else.
              </p>
              <p className="text-secondary-600 mb-6">
                Over the years, we've grown from a team of three dedicated professionals to a full-service construction company with over 50 experts across various specialties. Despite our growth, we've maintained our commitment to personalized service and exceptional craftsmanship.
              </p>
              <p className="text-secondary-600">
                Today, Elite Contractor is recognized as one of the leading construction companies in the region, with a portfolio of award-winning projects spanning residential, commercial, and specialized construction. Our success is built on the relationships we've developed with our clients, many of whom return to us for multiple projects over the years.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-full mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <SectionHeading
            title="Our Core Values"
            subtitle="These principles guide everything we do and define who we are as a company."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-start mb-4">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1" />
                  <h3 className="text-xl font-bold">{value.title}</h3>
                </div>
                <p className="text-secondary-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="section">
        <div className="container-custom">
          <SectionHeading
            title="Meet Our Team"
            subtitle="The talented professionals behind our exceptional work."
            centered
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-secondary-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTA />
    </PageTransition>
  );
};

export default AboutPage;