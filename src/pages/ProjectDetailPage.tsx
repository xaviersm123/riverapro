// src/pages/ProjectDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, MapPin, CheckCircle } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { supabase } from '../supabase';
import PageTransition from '../components/ui/PageTransition';
import CTA from '../components/home/CTA';
import LoadingIndicator from '../components/ui/LoadingIndicator'; // Import the loading indicator

// Define a more specific type for the project details
interface ProjectDetails {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  completion_date: string;
  description: string;
  challenge: string;
  solution: string;
  features: string[];
  images: string[];
}

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Optional: Add error state

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError("Project ID is missing.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      // Optimized Query: Select only necessary columns (list all used fields)
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('id, title, category, client, location, completion_date, description, challenge, solution, features, images')
        .eq('id', id)
        .single(); // Use single() as we expect only one project per ID

      if (fetchError) {
        console.error('Error fetching project:', fetchError);
        setError('Failed to load project details. The project might not exist.');
        setProject(null);
      } else {
        setProject(data);
      }
      setIsLoading(false);
    };
    fetchProject();
  }, [id]); // Re-fetch if the id changes

  // Display loading indicator
  if (isLoading) {
    return (
        <PageTransition>
             <div className="min-h-screen flex items-center justify-center">
                 <LoadingIndicator message="Loading project details..." />
             </div>
        </PageTransition>
    );
  }

  // Display error message or "Not Found" if project is null after loading
  if (error || !project) {
    return (
      <PageTransition>
          <Helmet>
             <title>Project Not Found | Rivera Pro</title>
          </Helmet>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
              <p className="mb-6 text-secondary-600">{error || "The project you're looking for doesn't exist or has been removed."}</p>
              <Link to="/projects" className="btn-primary inline-flex items-center">
                 <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
              </Link>
            </div>
          </div>
      </PageTransition>
    );
  }

  // Prepare slides for the lightbox (only if project exists)
  const slides = project.images?.map((image: string, index: number) => ({
    src: image,
    alt: `${project.title} - Image ${index + 1}`
  })) || [];

  return (
    <PageTransition>
      <Helmet>
        <title>{project.title} | Rivera Pro Projects</title>
        <meta
          name="description"
          content={`Details and images of the ${project.title} project by Rivera Pro. ${project.description?.substring(0, 150)}...`}
        />
        <link rel="canonical" href={`https://riverapro.com/projects/${project.id}`} />
         <meta property="og:title" content={`${project.title} | Rivera Pro Projects`} />
         <meta property="og:description" content={`Details and images of the ${project.title} project by Rivera Pro. ${project.description?.substring(0, 150)}...`} />
         <meta property="og:url" content={`https://riverapro.com/projects/${project.id}`} />
         <meta property="og:image" content={project.images?.[0]} /> {/* Use first image for OG */}
         {/* Add other OG/Twitter tags */}
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <Link to="/projects" className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Projects</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-secondary-200 mb-8 max-w-3xl">
            {/* Display first sentence or a short summary */}
            {project.description?.split('.')[0]}.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {project.completion_date && (
              <div className="flex items-center text-secondary-300">
                <Calendar className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0" />
                <span>{project.completion_date}</span>
              </div>
            )}
            {project.client && (
              <div className="flex items-center text-secondary-300">
                <User className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0" />
                <span>{project.client}</span>
              </div>
            )}
            {project.location && (
              <div className="flex items-center text-secondary-300">
                <MapPin className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0" />
                <span>{project.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Image Gallery */}
      {project.images && project.images.length > 0 && (
         <section className="py-12">
          <div className="container-custom">
            <div className="space-y-8">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="rounded-lg overflow-hidden cursor-pointer bg-gray-100"
                  onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
                  role="button"
                  aria-label={`View ${project.title} - Main Image in lightbox`}
                >
                  <img
                    src={project.images[0]}
                    alt={`${project.title} main image`}
                    className="w-full max-h-[700px] object-contain mx-auto" // Added mx-auto
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Gallery Images with Masonry Layout */}
              {project.images.length > 1 && (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                  {project.images.slice(1).map((image: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                      className="rounded-lg overflow-hidden mb-6 break-inside-avoid cursor-pointer"
                      onClick={() => { setLightboxIndex(index + 1); setLightboxOpen(true); }}
                      role="button"
                      aria-label={`View ${project.title} - Image ${index + 2} in lightbox`}
                    >
                      <img
                        src={image}
                        alt={`${project.title} - view ${index + 2}`}
                        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lightbox */}
          {lightboxOpen && (
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              slides={slides}
              index={lightboxIndex}
              on={{ view: ({ index }: { index: number }) => setLightboxIndex(index) }}
              styles={{ container: { backgroundColor: "rgba(0, 0, 0, .85)" } }} // Darker background
            />
          )}
        </section>
      )}


      {/* Project Details */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-8" // Added space-y-8
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
                <p className="text-secondary-600 leading-relaxed">{project.description}</p>
              </div>

              {project.challenge && (
                <div>
                  <h3 className="text-xl font-bold mb-3">The Challenge</h3>
                  <p className="text-secondary-600 leading-relaxed">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                 <div>
                  <h3 className="text-xl font-bold mb-3">Our Solution</h3>
                  <p className="text-secondary-600 leading-relaxed">{project.solution}</p>
                </div>
              )}
            </motion.div>

            {project.features && project.features.length > 0 && (
               <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-24"> {/* Added sticky top */}
                  <h3 className="text-xl font-bold mb-4">Project Features</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-secondary-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <CTA />
    </PageTransition>
  );
};

export default ProjectDetailPage;