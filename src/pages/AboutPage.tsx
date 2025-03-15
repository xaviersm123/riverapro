import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, Briefcase, Clock, CheckCircle, Hammer, PaintBucket, Wrench, Home, Leaf, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import CTA from '../components/home/CTA';

const fadeSlide = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const AboutPage: React.FC = () => {
  const stats = [
    { icon: Award, value: '20+', label: 'Years Experience' },
    { icon: Home, value: '500+', label: 'Happy Clients' },
    { icon: Briefcase, value: '750+', label: 'Projects Completed' },
    { icon: Clock, value: '98%', label: 'On-Time Completion' },
  ];

  const values = [
    {
      title: 'Quality Craftsmanship',
      description: 'Rivera Pro delivers top-tier craftsmanship in every residential remodeling project with precision and care.',
      icon: Hammer,
    },
    {
      title: 'Integrity & Transparency',
      description: 'We ensure honest communication and fair pricing for all your home remodeling needs.',
      icon: CheckCircle,
    },
    {
      title: 'Client-Centered Approach',
      description: 'Your vision for a remodeled home is our priority—we tailor our services to your unique preferences.',
      icon: Users,
    },
    {
      title: 'Expertise in Remodeling',
      description: 'With decades of experience, we bring specialized skills to kitchens, bathrooms, and more.',
      icon: Wrench,
    },
    {
      title: 'Sustainable Practices',
      description: 'We use eco-friendly materials to enhance the longevity of your home renovations.',
      icon: Leaf,
    },
    {
      title: 'Reliability',
      description: 'We complete every project on time and within budget, ensuring your satisfaction.',
      icon: Clock,
    },
  ];

  const milestones = [
    {
      year: '2005',
      title: 'The Beginning',
      description: 'Rivera Pro started as a small residential remodeling contractor with a passion for quality craftsmanship.',
    },
    {
      year: '2010',
      title: 'First Major Project',
      description: 'Completed the first large-scale home remodeling project, gaining recognition for excellence.',
    },
    {
      year: '2015',
      title: 'Expanded Offerings',
      description: 'Began specializing in new construction and home additions alongside remodeling.',
    },
    {
      year: '2020',
      title: 'Industry Recognition',
      description: 'Earned praise for a luxury kitchen and bathroom renovation project.',
    },
    {
      year: '2025',
      title: 'Today',
      description: 'A trusted name in Atlanta with 750+ completed projects and a 98% on-time completion rate.',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Personalized Service',
      description: 'Led by Edwin Rivera, we offer hands-on, tailored remodeling solutions for your home.',
      icon: Home,
    },
    {
      title: 'Proven Expertise',
      description: 'Over 20 years of experience in residential remodeling and construction.',
      icon: Award,
    },
    {
      title: 'Attention to Detail',
      description: 'We focus on every detail, from painting to framing, for flawless results.',
      icon: PaintBucket,
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>About Us | Rivera Pro</title>
        <meta
          name="description"
          content="Learn about Rivera Pro, a trusted Atlanta contractor with over 20 years of experience in residential remodeling and new construction."
        />
        <meta property="og:title" content="About Us | Rivera Pro" />
        <meta
          property="og:description"
          content="Learn about Rivera Pro, a trusted Atlanta contractor with over 20 years of experience in residential remodeling and new construction."
        />
        <meta property="og:image" content="https://riverapro.com/og-image.jpg" />
        <meta property="og:url" content="https://riverapro.com/about" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://riverapro.com/about" />
        <link
          rel="preload"
          href="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80&fm=webp"
          as="image"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </Helmet>

      {/* Hero Section with Parallax Background */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80&fm=webp')",
          }}
        >
          <div className="absolute inset-0 bg-secondary-900/70"></div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeSlide}
            initial="hidden"
            whileInView="visible"
            custom={0}
          >
            About Rivera Pro
          </motion.h1>
          <motion.p
            className="text-xl text-secondary-200 mb-8 max-w-2xl mx-auto"
            variants={fadeSlide}
            initial="hidden"
            whileInView="visible"
            custom={1}
          >
            Delivering excellence in residential remodeling, new construction, and additions since 2005.
          </motion.p>
          <motion.div
            variants={fadeSlide}
            initial="hidden"
            whileInView="visible"
            custom={2}
          >
            <Link to="/contact" className="btn-primary inline-flex items-center">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Story with Timeline */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            title="Our Journey"
            subtitle="From humble beginnings to a trusted name in residential remodeling—here’s our story."
            centered
          />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 h-full hidden md:block"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={fadeSlide}
                initial="hidden"
                whileInView="visible"
                custom={index}
                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <motion.h3 className="text-xl font-bold text-primary-700 mb-2">{milestone.year}</motion.h3>
                    <motion.h4 className="text-lg font-semibold mb-2">{milestone.title}</motion.h4>
                    <motion.p className="text-secondary-600">{milestone.description}</motion.p>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white absolute left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats with Animated Counters */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeSlide}
                initial="hidden"
                whileInView="visible"
                custom={index}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-full mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <motion.div
                  className="text-3xl md:text-4xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Core Values with Enhanced Design */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <SectionHeading
            title="Our Core Values"
            subtitle="These principles guide every residential remodeling project we undertake."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeSlide}
                initial="hidden"
                whileInView="visible"
                custom={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start mb-4">
                  <value.icon className="h-8 w-8 text-primary-600 mr-3 mt-1 animate-pulse" />
                  <h3 className="text-xl font-bold text-primary-800">{value.title}</h3>
                </div>
                <motion.p className="text-secondary-600">{value.description}</motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Why Choose Us?"
            subtitle="Discover what makes Rivera Pro your trusted Atlanta remodeling contractor."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={reason.title}
                variants={fadeSlide}
                initial="hidden"
                whileInView="visible"
                custom={index}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="text-center p-6 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 shadow-md"
              >
                <div className="inline-flex items-center justify-center p-4 bg-primary-600 rounded-full text-white mb-4">
                  <reason.icon className="h-8 w-8" />
                </div>
                <motion.h3 className="text-xl font-bold text-primary-800 mb-2">{reason.title}</motion.h3>
                <motion.p className="text-secondary-600">{reason.description}</motion.p>
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