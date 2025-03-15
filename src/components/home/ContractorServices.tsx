import React from 'react';
import { motion } from 'framer-motion';
import { PaintRoller, Wrench, Hammer, DoorClosed, Layers, Home, HardHat, Box } from 'lucide-react';

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
            title: 'Kitchen Remodeling',
            description: 'Revamp your kitchen with modern designs, custom cabinetry, and expert craftsmanship for a space you’ll love.',
            icon: Home,
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Bathroom Renovation',
            description: 'Transform your bathroom into a luxurious retreat with our professional renovation services.',
            icon: Wrench,
            color: 'from-green-500 to-green-600'
        },
        {
            title: 'Hardwood & Carpentry',
            description: 'Add warmth and elegance with our hardwood installation and custom carpentry services.',
            icon: Hammer,
            color: 'from-indigo-500 to-indigo-600'
        },
        {
            title: 'Windows & Siding',
            description: 'Enhance your home’s exterior with energy-efficient windows and durable siding, expertly installed.',
            icon: DoorClosed,
            color: 'from-orange-500 to-orange-600'
        },
        {
            title: 'Sheetrock & Painting',
            description: 'Achieve a flawless finish with our sheetrock installation and professional painting services.',
            icon: PaintRoller,
            color: 'from-purple-500 to-purple-600'
        },
        {
            title: 'Basement Finishing',
            description: 'Turn your basement into a functional living space with our expert finishing services.',
            icon: Layers,
            color: 'from-teal-500 to-teal-600'
        },
        {
            title: 'Roofing',
            description: 'Protect your home with our reliable roofing services, ensuring durability and quality.',
            icon: HardHat,
            color: 'from-red-500 to-red-600'
        },
        {
            title: 'Concrete & Framing',
            description: 'Build a solid foundation with our concrete work and expert framing services.',
            icon: Box,
            color: 'from-gray-500 to-gray-600'
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
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Specialties</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Rivera Pro delivers top-quality craftsmanship in residential remodeling, new construction, and additions.
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
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
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