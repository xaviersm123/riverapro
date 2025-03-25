import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard from '../components/ui/ProjectCard';
import CTA from '../components/home/CTA';

const ProjectsPage: React.FC = () => {
  // Project categories - updated to include Renovation
  const categories = [
    'All',
    'New Construction',
    'Remodeling',
    'Roofing',
    'Windows & Siding',
    'Renovation' // Added new category
  ];
  
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Projects data - 4 projects with updated Project 4
  const projects = [
    {
      id: '1',
      title: 'Modern Family Home',
      category: 'New Construction',
      imageUrl: 'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: '2',
      title: 'Luxury Kitchen Remodel',
      category: 'Remodeling',
      imageUrl: 'https://images.unsplash.com/photo-1616594168015-7e4c3b9da2e7?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: '3',
      title: 'Roof Replacement Project',
      category: 'Roofing',
      imageUrl: 'https://images.unsplash.com/photo-1600585153491-995b341b8a01?auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: '4',
      title: 'Complete Home Renovation with Custom Wine Cellar',
      category: 'Renovation',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80' // Placeholder; ideally, use a wine cellar image
    }
  ];
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <PageTransition>
      <Helmet>
        <title>Our Projects | Rivera Pro</title>
        <meta
          name="description"
          content="Explore Rivera Pro's portfolio of residential remodeling, new construction, and home improvement projects in Atlanta."
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-secondary-200">
              Check out some of our recent work in residential remodeling, construction, and home improvements around Atlanta.
            </p>
          </div>
        </div>
      </section>
      
      {/* Projects Gallery */}
      <section className="section">
        <div className="container-custom">
          <SectionHeading
            title="Featured Work"
            subtitle="A showcase of our craftsmanship in Atlanta-area homes."
          />
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                category={project.category}
                imageUrl={project.imageUrl}
                altText={`${project.title} - ${project.category} project by Rivera Pro`}
                delay={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      <CTA />
    </PageTransition>
  );
};

export default ProjectsPage;