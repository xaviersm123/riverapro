import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Define the component props
interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  altText?: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  category,
  imageUrl,
  altText = title,
  delay = 0,
}) => {
  // Log the incoming props for debugging
  console.log(`Rendering ProjectCard for ID=${id}, title=${title}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="group"
    >
      <Link
        to={`/projects/${id}`}
        className="block overflow-hidden rounded-lg"
        title={`View details of ${title} project by Rivera Pro`}
      >
        {/* 
          We use a fixed height (h-64) and overflow-hidden so very tall images 
          remain contained. object-cover ensures the image scales to fill 
          the container, cropping any excess if necessary. 
        */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={imageUrl}
            alt={altText}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            width={1170}
            height={738}
            loading="lazy"
          />
          {/* 
            The overlay for text on hover:
            We position it absolutely, with a gradient background that fades in.
          */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div className="text-white">
              <p className="text-sm font-medium text-primary-300 mb-1">{category}</p>
              <h3 className="text-xl font-bold">{title}</h3>
              <div className="mt-2 flex items-center text-primary-300 text-sm font-medium">
                <span>View Project</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
