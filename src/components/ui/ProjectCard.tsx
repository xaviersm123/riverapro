import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  altText?: string; // Add altText prop for better SEO
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  category,
  imageUrl,
  altText = title, // Fallback to title if altText isn’t provided
  delay = 0,
}) => {
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
        title={`View details of ${title} project`} // Improve accessibility
      >
        <div className="relative overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <img
              src={imageUrl}
              alt={altText}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              width={1170} // Based on Unsplash image dimensions
              height={738}
              loading="lazy" // Lazy load since FeaturedProjects is below the fold
            />
          </div>
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