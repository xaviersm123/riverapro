import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';

const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Page Not Found | Elite Contractor</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center px-4 py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-9xl font-bold text-primary-600">404</h1>
            <h2 className="text-3xl font-bold text-secondary-900 mt-4 mb-6">Page Not Found</h2>
            <p className="text-secondary-600 mb-8 max-w-md mx-auto">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <Link to="/" className="btn-primary inline-flex items-center">
              <Home className="h-4 w-4 mr-2" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;