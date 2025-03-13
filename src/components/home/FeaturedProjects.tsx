import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';

const FeaturedProjects: React.FC = () => {
  const projects = [
    {
      id: '1',
      title: 'Modern Lakeside Villa',
      category: 'Residential',
      imageUrl:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80&fm=webp',
      altText: 'Modern lakeside villa with glass walls in Atlanta',
    },
    {
      id: '2',
      title: 'Downtown Office Complex',
      category: 'Commercial',
      imageUrl:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80&fm=webp',
      altText: 'Downtown Atlanta office complex with modern design',
    },
    {
      id: '3',
      title: 'Luxury Penthouse Renovation',
      category: 'Renovation',
      imageUrl:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1153&q=80&fm=webp',
      altText: 'Luxury penthouse renovation in Atlanta with high-end finishes',
    },
  ];

  return (
    <section id="featured-projects" className="section">
      <div className="container-custom">
        <SectionHeading
          title="Featured Projects"
          subtitle="Explore some of our most impressive work showcasing our expertise and attention to detail."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              category={project.category}
              imageUrl={project.imageUrl}
              altText={project.altText} // Pass altText to ProjectCard
              delay={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/projects" className="btn-primary inline-flex items-center">
            <span>View All Projects</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;