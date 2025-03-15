import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard from '../components/ui/ProjectCard';
import CTA from '../components/home/CTA';

const ProjectsPage: React.FC = () => {
  // Project categories
  const categories = [
    'All',
    'New Construction',
    'Remodeling',
    'Roofing',
    'Windows & Siding',
    'Additions'
  ];
  
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Projects data
  const projects = [
    {
      id: '1',
      title: 'Modern Family Home',
      category: 'New Construction',
      imageUrl: 'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80' // Modern house under construction
    },
    {
      id: '2',
      title: 'Luxury Kitchen Remodel',
      category: 'Remodeling',
      imageUrl: 'https://images.unsplash.com/photo-1616594168015-7e4c3b9da2e7?auto=format&fit=crop&w=1170&q=80' // Remodeled kitchen
    },
    {
      id: '3',
      title: 'Roof Replacement Project',
      category: 'Roofing',
      imageUrl: 'https://images.unsplash.com/photo-1600585153491-995b341b8a01?auto=format&fit=crop&w=1170&q=80' // Roofing work
    },
    {
      id: '4',
      title: 'Energy-Efficient Windows Upgrade',
      category: 'Windows & Siding',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80' // Exterior with new windows
    },
    {
      id: '5',
      title: 'Spacious Home Addition',
      category: 'Additions',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1170&q=80' // Home addition
    },
    {
      id: '6',
      title: 'Contemporary Bathroom Renovation',
      category: 'Remodeling',
      imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=687&q=80' // Bathroom remodel
    },
    {
      id: '7',
      title: 'Suburban Home Build',
      category: 'New Construction',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80' // New suburban home
    },
    {
      id: '8',
      title: 'Exterior Siding Refresh',
      category: 'Windows & Siding',
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1170&q=80' // Exterior with new siding
    },
    {
      id: '9',
      title: 'Roof and Attic Renovation',
      category: 'Roofing',
      imageUrl: 'https://images.unsplash.com/photo-1600585153491-995b341b8a01?auto=format&fit=crop&w=1170&q=80' // Roofing project
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
          content="Explore Rivera Pro's portfolio of residential remodeling, new construction, and home improvement projects in Atlanta, showcasing our exceptional craftsmanship."
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-secondary-200">
              Discover Rivera Pro’s portfolio of residential remodeling, new construction, and home improvement projects in Atlanta.
            </p>
          </div>
        </div>
      </section>
      
      {/* Projects Gallery */}
      <section className="section">
        <div className="container-custom">
          <SectionHeading
            title="Featured Projects"
            subtitle="Browse our collection of completed residential projects showcasing our expertise in remodeling and construction."
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                category={project.category}
                imageUrl={project.imageUrl}
                altText={`${project.title} - ${project.category} project by Rivera Pro`} // Added altText
                delay={index}
              />
            ))}
          </motion.div>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary-600 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      <CTA />
    </PageTransition>
  );
};

export default ProjectsPage;