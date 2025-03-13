import React from 'react';
import { motion } from 'framer-motion';
import { PaintBucket, Sprout, Wrench, Layers } from 'lucide-react';

const ContractorServices: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    interface Service {
        title: string;
        description: string;
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        color: string;
    }
    
    const services: Service[] = [
        {
            title: 'Painting',
            description: 'Transform your space with our professional painting services. We use high-quality paints and expert techniques for a flawless finish.',
            icon: PaintBucket,
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Landscaping',
            description: 'Enhance your outdoor space with our landscaping services. From design to maintenance, we\'ve got you covered.',
            icon: Sprout,
            color: 'from-green-500 to-green-600'
        },
        {
            title: 'Plumbing',
            description: 'Our plumbing services keep your home\'s water systems running smoothly. We handle repairs, installations, and more.',
            icon: Wrench,
            color: 'from-indigo-500 to-indigo-600'
        },
        {
            title: 'Flooring',
            description: 'Upgrade your home with our expert flooring services. We offer a variety of materials and styles to suit your needs.',
            icon: Layers,
            color: 'from-orange-500 to-orange-600'
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container-custom max-w-7xl mx-auto px-6 sm:px-8 pb-20">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Contractor Specialties</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our team delivers exceptional quality and reliability across all our specialized contractor services.
                    </p>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        
                        return (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                                variants={itemVariants}
                                whileHover={{ 
                                    y: -8,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                                <div className="p-10">
                                    <div className="mb-5 flex justify-center">
                                        <div className={`p-3 rounded-full bg-gradient-to-r ${service.color} bg-opacity-10`}>
                                            <Icon width={32} height={32} className="text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                    <p className="text-gray-600 mb-6 h-24">{service.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ContractorServices;
