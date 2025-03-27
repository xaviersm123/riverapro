// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../../supabase'; // Adjust path to your supabase.ts file
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';

// Define the FeaturedProjects component as a React Functional Component
const FeaturedProjects: React.FC = () => {
  // State to store the featured projects fetched from Supabase
  const [projects, setProjects] = useState<any[]>([]);

  // useEffect hook to fetch featured projects when the component mounts
  useEffect(() => {
    console.log('Fetching featured projects from Supabase...');

    // Define an asynchronous function to fetch the projects
    const fetchFeaturedProjects = async () => {
      // Query the 'projects' table to select only necessary fields
      // Limiting to 3 projects as these are featured on the homepage
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, category, images')
        .limit(3);

      // Check for errors in the fetch operation
      if (error) {
        console.error('Error fetching featured projects:', error);
      } else {
        // Log the fetched data for debugging purposes
        console.log('Featured projects fetched:', data);
        // Update the state with the fetched projects (or an empty array if data is null)
        setProjects(data || []);
      }
    };

    // Call the fetch function
    fetchFeaturedProjects();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Render the FeaturedProjects component
  return (
    <section id="featured-projects" className="section">
      <div className="container-custom">
        {/* Section heading for the featured projects */}
        <SectionHeading
          title="Featured Projects"
          subtitle="Explore some of our most impressive work showcasing our expertise and attention to detail."
          centered
        />

        {/* Grid to display featured project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            // If no projects have been loaded, display a loading message
            <p>Loading featured projects...</p>
          ) : (
            // Map over the fetched projects and display each one using the ProjectCard component
            projects.map((project, index) => (
              <ProjectCard
                key={project.id} // Unique key for each project card
                id={project.id} // Project ID passed to the card
                title={project.title} // Project title passed to the card
                category={project.category} // Project category passed to the card
                // Use the first image in the images array as the thumbnail for the project
                imageUrl={project.images[0]}
                // Create descriptive alternative text for accessibility
                altText={`${project.title} - ${project.category} project by Rivera Pro`}
                delay={index} // Delay for the animation effect
              />
            ))
          )}
        </div>

        {/* "View All Projects" button that navigates to the projects route */}
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
