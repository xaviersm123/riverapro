import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, MapPin, CheckCircle } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css'; // Import the lightbox styles
import PageTransition from '../components/ui/PageTransition';
import CTA from '../components/home/CTA';

// Mock project data - reduced to 4 projects
interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  completionDate: string;
  description: string;
  challenge: string;
  solution: string;
  features: string[];
  images: string[];
  beforeAfterImages?: Array<{
    before: string;
    after: string;
    description: string;
  }>;
}

const projectsData: Project[] = [
  {
    id: '1',
    title: 'Modern Family Home',
    category: 'New Construction',
    client: 'Thompson Family',
    location: 'Buckhead, Atlanta',
    completionDate: 'June 2023',
    description: 'A modern family home built from the ground up in Buckhead, featuring an open-concept design, energy-efficient systems, and custom finishes throughout. This 4,200 square foot home includes four bedrooms, three bathrooms, and a spacious outdoor living area.',
    challenge: 'The client wanted a sustainable home with modern aesthetics while staying within a specific budget, and the site required careful planning due to its sloped terrain.',
    solution: 'We used energy-efficient materials and solar panels to meet sustainability goals, optimized the design to fit the budget, and implemented a terraced foundation to accommodate the sloped terrain.',
    features: [
      'Open-concept living area',
      'Energy-efficient windows and insulation',
      'Solar panel integration',
      'Custom hardwood flooring',
      'Outdoor deck with pergola',
      'Smart home technology'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1169&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80'
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1170&q=80',
        after: 'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80',
        description: 'Transformed an empty lot into a modern family home with sustainable features.'
      },
      {
        before: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1170&q=80',
        after: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1169&q=80',
        description: 'Created an open-concept living area with custom hardwood flooring.'
      }
    ]
  },
  {
    id: '2',
    title: 'Luxury Kitchen Remodel',
    category: 'Remodeling',
    client: 'Davis Family',
    location: 'Midtown, Atlanta',
    completionDate: 'March 2023',
    description: 'A complete kitchen remodel in a historic Midtown home, featuring custom cabinetry, premium appliances, and a modern design that complements the home’s traditional architecture. The 500 square foot kitchen now includes a large island and open shelving.',
    challenge: 'The challenge was to modernize the kitchen while preserving the historic charm of the 1920s home, including working around original structural elements.',
    solution: 'We designed custom cabinetry that matched the home’s aesthetic, used modern appliances with a vintage-inspired design, and carefully integrated new structural supports without altering the original beams.',
    features: [
      'Custom white oak cabinetry',
      'Large kitchen island with seating',
      'Premium stainless steel appliances',
      'Quartz countertops',
      'Open shelving with LED lighting',
      'Restored original hardwood floors'
    ],
    images: [
      '/project1/image12.jpg',  // Finished roof
      '/project1/image13.jpg',  // Interior framing (before)
      '/project1/image14.jpg',  // Interior framing (before)
      '/project1/image15.jpg',  // Interior framing (before)
      '/project1/image16.jpg',  // Interior framing (before)
      '/project1/image17.jpg',  // Interior framing (before)
      '/project1/image18.jpg',  // Interior framing (before)
      '/project1/image19.jpg',  // Interior framing (before)
      '/project1/image20.jpg',  // Modern bathroom with glass shower
      '/project1/image21.jpg',  // Custom wine cellar
      '/project1/image22.jpg'   // Custom wine cellar (different angle)
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1170&q=80',
        after: 'https://images.unsplash.com/photo-1616594168015-7e4c3b9da2e7?auto=format&fit=crop&w=1170&q=80',
        description: 'Transformed an outdated kitchen into a modern, functional space with custom cabinetry.'
      }
    ]
  },
  {
    id: '3',
    title: 'Roof Replacement Project',
    category: 'Roofing',
    client: 'Wilson Family',
    location: 'Sandy Springs, Atlanta',
    completionDate: 'November 2022',
    description: 'A complete roof replacement for a 3,000 square foot home in Sandy Springs, using high-quality asphalt shingles and modern underlayment for enhanced durability. The project also included new gutters and improved attic ventilation.',
    challenge: 'The existing roof had significant storm damage and poor ventilation, leading to energy inefficiency and potential structural issues.',
    solution: 'We replaced the damaged roof with durable asphalt shingles, installed a modern synthetic underlayment, added new gutters, and improved attic ventilation to enhance energy efficiency and prevent future damage.',
    features: [
      'High-quality asphalt shingles',
      'Synthetic underlayment for durability',
      'New seamless gutters',
      'Improved attic ventilation',
      'Energy-efficient design'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585153491-995b341b8a01?auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80'
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=1170&q=80',
        after: 'https://images.unsplash.com/photo-1600585153491-995b341b8a01?auto=format&fit=crop&w=1170&q=80',
        description: 'Replaced a storm-damaged roof with durable shingles and improved ventilation.'
      }
    ]
  },
  {
    id: '4',
    title: 'Complete Home Renovation with Custom Wine Cellar',
    category: 'Renovation',
    client: 'Brown Family',
    location: 'Buckhead, Atlanta',
    completionDate: 'August 2022',
    description: 'A comprehensive renovation of a 2,800 square foot home in Buckhead, transforming an outdated property into a modern living space. The project included a full roof replacement, interior framing, a luxurious bathroom upgrade with a glass shower, and a custom wine cellar with unique decor, creating a perfect blend of functionality and elegance.',
    challenge: 'The challenge was to modernize an older home while preserving its structural integrity, addressing issues like an outdated roof, inefficient layout, and lack of modern amenities, all within a tight timeline.',
    solution: 'We replaced the roof with durable asphalt shingles, restructured the interior layout with new framing, installed a modern glass shower in the bathroom, and designed a custom wine cellar with reclaimed wood and cork accents, adding both style and functionality to the home.',
    features: [
      'New asphalt shingle roof',
      'Modern glass shower with marble tiles',
      'Custom wine cellar with LED lighting',
      'Reclaimed wood wall accents',
      'Updated interior framing for open layout',
      'Energy-efficient upgrades throughout'
    ],
    images: [
      '/project1/image8.jpeg',  // Finished roof
      '/project1/image2.jpg',   // Interior framing (before)
      '/project1/image3.jpg',   // Interior framing (before)
      '/project1/image4.jpg',   // Interior framing (before)
      '/project1/image5.jpg',   // Interior framing (before)
      '/project1/image6.jpeg',  // Interior framing (before)
      '/project1/image7.jpeg',  // Interior framing (before)
      '/project1/image1.jpg',   // Interior framing (before)
      '/project1/image9.jpeg',  // Modern bathroom with glass shower
      '/project1/image10.jpg',  // Custom wine cellar
      '/project1/image11.jpeg'  // Custom wine cellar (different angle)
    ],
    beforeAfterImages: [
      {
        before: '/project1/image2.jpg',   // Interior framing (before)
        after: '/project1/image10.jpg',   // Custom wine cellar (after)
        description: 'Transformed an unfinished space into a luxurious wine cellar with custom decor.'
      },
      {
        before: '/project1/image3.jpg',   // Interior framing (before)
        after: '/project1/image9.jpeg',   // Modern bathroom (after)
        description: 'Converted a dated bathroom into a modern oasis with a glass shower and marble tiles.'
      }
    ]
  }
];

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find(p => p.id === id);

  // State for lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
  const slides = project.images.map((image) => ({
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
              <span>{project.completionDate}</span>
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
              {project.images.slice(1).map((image, index) => (
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
                  {project.features.map((feature, index) => (
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