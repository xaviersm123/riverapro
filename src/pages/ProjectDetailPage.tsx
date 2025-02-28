import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, MapPin, CheckCircle } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import CTA from '../components/home/CTA';

// Mock project data - in a real app, this would come from an API or database
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
}

const projectsData: Project[] = [
  {
    id: '1',
    title: 'Modern Lakeside Villa',
    category: 'Residential',
    client: 'Johnson Family',
    location: 'Lake Washington, Seattle',
    completionDate: 'June 2023',
    description: 'A stunning modern lakeside villa featuring floor-to-ceiling windows, an open-concept design, and sustainable materials throughout. This 4,500 square foot home includes five bedrooms, four bathrooms, a home theater, and a private dock.',
    challenge: 'The challenging lakeside terrain required innovative foundation solutions and careful environmental considerations to protect the surrounding ecosystem.',
    solution: 'We implemented a specialized foundation system and worked closely with environmental consultants to ensure minimal impact on the lake and surrounding wildlife. Sustainable materials and energy-efficient systems were integrated throughout the design.',
    features: [
      'Custom architectural design',
      'Floor-to-ceiling windows with lake views',
      'Geothermal heating and cooling system',
      'Smart home technology integration',
      'Custom millwork and cabinetry',
      'Outdoor living spaces with fire features'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    ]
  },
  {
    id: '2',
    title: 'Downtown Office Complex',
    category: 'Commercial',
    client: 'TechVision Inc.',
    location: 'Downtown Business District',
    completionDate: 'March 2023',
    description: 'A modern office complex designed for a leading tech company, featuring collaborative workspaces, state-of-the-art conference rooms, and employee amenities. The 25,000 square foot space spans three floors and accommodates up to 200 employees.',
    challenge: 'The client needed a space that balanced open collaboration areas with private workspaces while maintaining their brand identity throughout the design.',
    solution: 'We created a flexible floor plan with modular furniture systems that can be reconfigured as needed. Custom design elements incorporating the company\'s brand colors and ethos were integrated throughout the space.',
    features: [
      'Open concept collaborative areas',
      'Private meeting pods and focus rooms',
      'State-of-the-art conference facilities',
      'Employee lounge and wellness room',
      'Custom branding elements',
      'Energy-efficient lighting and HVAC systems'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    ]
  },
  {
    id: '3',
    title: 'Luxury Penthouse Renovation',
    category: 'Renovation',
    client: 'Martinez Family',
    location: 'City Center High-Rise',
    completionDate: 'November 2022',
    description: 'Complete renovation of a 3,200 square foot penthouse apartment, transforming an outdated space into a luxurious modern home with panoramic city views. The project included structural modifications, all new finishes, and custom features throughout.',
    challenge: 'Working in a high-rise building presented logistical challenges for material delivery and construction. Additionally, the original layout had poor flow and didn\'t maximize the stunning views.',
    solution: 'We developed a detailed logistics plan for the high-rise environment and completely reimagined the floor plan to create an open concept living space that frames the city views from every major room.',
    features: [
      'Open concept floor plan redesign',
      'Custom kitchen with premium appliances',
      'Luxury primary suite with spa bathroom',
      'Smart home automation throughout',
      'Soundproofing between floors'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
    ]
  }
];

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find(p => p.id === id);
  
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

  return (
    <PageTransition>
      <Helmet>
        <title>{project.title} | Elite Contractor</title>
        <meta name="description" content={`View details of our ${project.title} project - ${project.description.substring(0, 150)}...`} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2"
            >
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={project.images[0]} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {project.images.slice(1).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="rounded-lg overflow-hidden"
              >
                <img 
                  src={image} 
                  alt={`${project.title} - view ${index + 2}`} 
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
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
      
      {/* Related Projects */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Similar Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectsData
              .filter(p => p.category === project.category && p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link to={`/projects/${relatedProject.id}`} className="block group">
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img 
                        src={relatedProject.images[0]} 
                        alt={relatedProject.title} 
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary-600 transition-colors">{relatedProject.title}</h3>
                    <p className="text-secondary-600">{relatedProject.category}</p>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
      
      <CTA />
    </PageTransition>
  );
};

export default ProjectDetailPage;