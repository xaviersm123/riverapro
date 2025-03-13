import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Home, ThumbsUp } from 'lucide-react';

const ProjectStatistics: React.FC = () => {
  const stats = [
    {
      icon: Home,
      value: '150+',
      label: 'Projects Completed',
      description: 'Successfully completed projects across Atlanta'
    },
    {
      icon: Calendar,
      value: '12+',
      label: 'Years Experience',
      description: 'Serving the Atlanta area since 2010'
    },
    {
      icon: ThumbsUp,
      value: '98%',
      label: 'Client Satisfaction',
      description: 'Our clients love our work and attention to detail'
    },
    {
      icon: Award,
      value: '15+',
      label: 'Industry Awards',
      description: 'Recognized excellence in the Atlanta contracting industry'
    }
  ];

  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">By The Numbers</h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Our track record speaks for itself. Here's why homeowners and businesses in Atlanta 
            trust us for their construction and renovation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center p-4 bg-primary-800 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-primary-200" />
                </div>
                <h3 className="text-5xl font-bold mb-2">{stat.value}</h3>
                <p className="text-xl font-semibold mb-2 text-primary-200">{stat.label}</p>
                <p className="text-primary-300">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectStatistics;
