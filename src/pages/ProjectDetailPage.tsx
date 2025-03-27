import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, MapPin, CheckCircle } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { supabase } from '../supabase'; // Adjust path to your supabase.ts file
import PageTransition from '../components/ui/PageTransition';
import CTA from '../components/home/CTA';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fetch project from Supabase based on ID
  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching project:', error);
        setProject(null);
      } else {
        setProject(data);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Prepare slides for the lightbox
  const slides = project.images.map((image: string) => ({
    src: image,
    alt: `${project.title} - Image ${project.images.indexOf(image) + 1}`
  }));

  return (
    <PageTransition>
      <Helmet>
        <title>{project.title} | Rivera Pro</title>
        <meta
          name="description"
          content={`View details of our ${project.title} project - ${project.description.substring(0, 150)}...`}
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <Link to="/projects" className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Projects</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-secondary-200 mb-8 max-w-3xl">
            {project.description.split('.')[0]}.
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center text-secondary-300">
              <Calendar className="h-5 w-5 mr-2 text-primary-400" />
              <span>{project.completion_date}</span>
            </div>
            <div className="flex items-center text-secondary-300">
              <User className="h-5 w-5 mr-2 text-primary-400" />
              <span>{project.client}</span>
            </div>
            <div className="flex items-center text-secondary-300">
              <MapPin className="h-5 w-5 mr-2 text-primary-400" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Gallery */}
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
                onClick={() => {
                  setLightboxIndex(0);
                  setLightboxOpen(true);
                }}
                role="button"
                aria-label={`View ${project.title} - Main Image in lightbox`}
              >
                <img
                  src={project.images[0]}
                  alt={`${project.title} main image`}
                  className="w-full max-h-[700px] object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Gallery Images with Masonry Layout */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {project.images.slice(1).map((image: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="rounded-lg overflow-hidden mb-6 break-inside-avoid cursor-pointer"
                  onClick={() => {
                    setLightboxIndex(index + 1);
                    setLightboxOpen(true);
                  }}
                  role="button"
                  aria-label={`View ${project.title} - Image ${index + 2} in lightbox`}
                >
                  <img
                    src={image}
                    alt={`${project.title} - view ${index + 2}`}
                    className="w-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={slides}
            index={lightboxIndex}
            on={{
              view: ({ index }: { index: number }) => setLightboxIndex(index)
            }}
          />
        )}
      </section>

      {/* Project Details */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
              <p className="text-secondary-600 mb-8">{project.description}</p>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">The Challenge</h3>
                <p className="text-secondary-600">{project.challenge}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Our Solution</h3>
                <p className="text-secondary-600">{project.solution}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
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
          </div>
        </div>
      </section>

      <CTA />
    </PageTransition>
  );
};

export default ProjectDetailPage;