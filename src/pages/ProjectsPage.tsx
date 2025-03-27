// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '../supabase'; // Adjust path to your supabase.ts file
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectCard from '../components/ui/ProjectCard';
import CTA from '../components/home/CTA';

// Define a TypeScript interface for the project data
interface Project {
  id: number | string;  // Unique identifier for the project (could be a string depending on your DB)
  title: string;        // Project title
  category: string;     // Project category (this will be used for filtering)
  images: string[];     // Array of image URLs for the project
}

// Define the ProjectsPage component as a React Functional Component
const ProjectsPage: React.FC = () => {
  // State to keep track of the currently active category filter.
  // Default is 'All', which means no filtering.
  const [activeCategory, setActiveCategory] = useState('All');

  // State for storing the fetched projects.
  const [projects, setProjects] = useState<Project[]>([]);

  // State for storing unique categories extracted from the fetched projects.
  // This will be used to dynamically render filter buttons.
  const [categories, setCategories] = useState<string[]>([]);

  // useEffect hook to fetch projects from Supabase when the component mounts.
  useEffect(() => {
    // Define an asynchronous function to fetch projects from Supabase.
    const fetchProjects = async () => {
      console.log('Starting to fetch projects from Supabase...');

      // Query the projects table to get only the fields needed for this page.
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, category, images');

      // If there is an error during the fetch, log it to the console.
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        // Log the fetched data for debugging purposes.
        console.log('Fetched projects data:', data);

        // Update the projects state with the fetched data,
        // defaulting to an empty array if data is null.
        setProjects(data || []);

        // Compute the unique categories from the fetched projects.
        // Using a Set to ensure uniqueness.
        const uniqueCategories = Array.from(
          new Set((data || []).map((project: Project) => project.category))
        );
        console.log('Unique categories fetched:', uniqueCategories);

        // Set the categories state with an "All" option plus the unique categories.
        setCategories(['All', ...uniqueCategories]);
      }
    };

    // Call the asynchronous fetch function.
    fetchProjects();
  }, []); // Empty dependency array ensures this runs only once when the component mounts.

  // Filter projects based on the active category selection.
  // If "All" is selected, no filtering is applied; otherwise, only projects matching the category are shown.
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  // Debug logs for the current active category and the list of filtered projects.
  console.log('Current active category:', activeCategory);
  console.log('Filtered projects:', filteredProjects);

  // Render the component
  return (
    <PageTransition>
      {/* Helmet component to manage the document head */}
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
      
      {/* Projects Gallery Section */}
      <section className="section">
        <div className="container-custom">
          <SectionHeading
            title="Featured Work"
            subtitle="A showcase of our craftsmanship in Atlanta-area homes."
          />
          
          {/* Dynamic Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  // Log the category change for debugging.
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
                // Use the first image as the thumbnail for the project.
                imageUrl={project.images[0]} 
                // Provide descriptive alternative text for accessibility.
                altText={`${project.title} - ${project.category} project by Rivera Pro`}
                delay={index} // Delay for animation effect.
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <CTA />
    </PageTransition>
  );
};

export default ProjectsPage;
