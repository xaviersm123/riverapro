// src/pages/ProjectsPage.tsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard from '../components/ui/ProjectCard';
import CTA from '../components/home/CTA';
import LoadingIndicator from '../components/ui/LoadingIndicator'; // Import the loading indicator

interface Project {
  id: number | string;
  title: string;
  category: string;
  images: string[];
}

const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Optional: Add error state

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true); // Start loading
      setError(null);     // Reset error state
      console.log('Starting to fetch projects from Supabase...');

      // Optimized Query: Select only necessary columns
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('id, title, category, images'); // Select specific columns

      if (fetchError) {
        console.error('Error fetching projects:', fetchError);
        setError('Failed to load projects. Please try again later.'); // Set error message
        setProjects([]); // Clear projects on error
      } else {
        console.log('Fetched projects data:', data);
        setProjects(data || []);

        const uniqueCategories = Array.from(
          new Set((data || []).map((project: Project) => project.category))
        );
        console.log('Unique categories fetched:', uniqueCategories);
        setCategories(['All', ...uniqueCategories]);
      }
      setIsLoading(false); // Finish loading
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  console.log('Current active category:', activeCategory);
  console.log('Filtered projects:', filteredProjects);

  return (
    <PageTransition>
      <Helmet>
        <title>Our Projects | Rivera Pro</title>
        <meta
          name="description"
          content="Explore Rivera Pro's portfolio of residential remodeling, new construction, and home improvement projects in Atlanta."
        />
        <link rel="canonical" href="https://riverapro.com/projects" />
        <meta property="og:title" content="Our Projects | Rivera Pro" />
        <meta property="og:description" content="Explore Rivera Pro's portfolio of residential remodeling, new construction, and home improvement projects in Atlanta." />
        <meta property="og:url" content="https://riverapro.com/projects" />
        {/* Add other OG/Twitter tags as needed */}
      </Helmet>

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

      <section className="section">
        <div className="container-custom">
          <SectionHeading
            title="Featured Work"
            subtitle="A showcase of our craftsmanship in Atlanta-area homes."
          />

          {!isLoading && categories.length > 1 && ( // Only show filters if loaded and there are categories
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    console.log(`Changing active category to: ${category}`);
                    setActiveCategory(category);
                  }}
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
          )}

          {/* Conditional Rendering for Loading/Error/Content */}
          {isLoading ? (
            <LoadingIndicator message="Loading projects..." />
          ) : error ? (
            <div className="text-center py-10 text-red-600">{error}</div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" // Adjusted grid columns
              layout // Animate layout changes
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  imageUrl={project.images?.[0]} // Safely access first image
                  altText={`${project.title} - ${project.category} project by Rivera Pro`}
                  delay={index}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-10 text-secondary-600">
              No projects found {activeCategory !== 'All' ? `in the "${activeCategory}" category` : ''}.
            </div>
          )}
        </div>
      </section>

      <CTA />
    </PageTransition>
  );
};

export default ProjectsPage;