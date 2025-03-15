import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, MapPin, CheckCircle } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import CTA from '../components/home/CTA';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';

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
      'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80', // Main image: Modern house under construction
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1169&q=80', // Interior
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80', // Exterior detail
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80' // Outdoor space
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1170&q=80', // Empty lot
        after: 'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80', // Completed house
        description: 'Transformed an empty lot into a modern family home with sustainable features.'
      },
      {
        before: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1170&q=80', // Old interior
        after: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1169&q=80', // New interior
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
      'https://images.unsplash.com/photo-1616594168015-7e4c3b9da2e7?auto=format&fit=crop&w=1170&q=80', // Main image: Remodeled kitchen
      'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80', // Kitchen detail
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80', // Island view
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80' // Dining area
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1170&q=80', // Old kitchen
        after: 'https://images.unsplash.com/photo-1616594168015-7e4c3b9da2e7?auto=format&fit=crop&w=1170&q=80', // New kitchen
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
      'https://images.unsplash.com/photo-1600585153491-995b341b8a01?auto=format&fit=crop&w=1170&q=80', // Main image: Roofing work
      'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80', // Roof detail
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80', // Exterior view
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80' // Attic view
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=1170&q=80', // Damaged roof
        after: 'https://images.unsplash.com/photo-1600585153491-995b341b8a01?auto=format&fit=crop&w=1170&q=80', // New roof
        description: 'Replaced a storm-damaged roof with durable shingles and improved ventilation.'
      }
    ]
  },
  {
    id: '4',
    title: 'Energy-Efficient Windows Upgrade',
    category: 'Windows & Siding',
    client: 'Brown Family',
    location: 'Buckhead, Atlanta',
    completionDate: 'August 2022',
    description: 'A full window replacement project for a 2,800 square foot home, installing energy-efficient double-pane windows and updating the exterior siding with durable fiber cement. The project improved the home’s energy efficiency and curb appeal.',
    challenge: 'The original windows were single-pane and leaking, causing high energy bills, and the siding was outdated and weather-damaged.',
    solution: 'We installed energy-efficient double-pane windows to reduce energy loss, replaced the siding with low-maintenance fiber cement, and added modern trim to enhance the home’s appearance.',
    features: [
      'Energy-efficient double-pane windows',
      'Fiber cement siding',
      'Modern trim and accents',
      'Improved insulation around windows',
      'Enhanced curb appeal'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80', // Main image: Exterior with new windows
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1169&q=80', // Window detail
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80', // Siding view
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80' // Exterior detail
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=1170&q=80', // Old exterior
        after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80', // New exterior
        description: 'Upgraded windows and siding for improved energy efficiency and modern aesthetics.'
      }
    ]
  },
  {
    id: '5',
    title: 'Spacious Home Addition',
    category: 'Additions',
    client: 'Martinez Family',
    location: 'Midtown, Atlanta',
    completionDate: 'May 2022',
    description: 'A 1,000 square foot home addition to a Midtown residence, adding a new family room, guest bedroom, and bathroom. The project seamlessly integrated with the existing structure while enhancing the home’s functionality.',
    challenge: 'The challenge was to match the addition to the existing 1950s architecture while ensuring modern functionality and energy efficiency.',
    solution: 'We used materials and design elements that complemented the original structure, added modern insulation and windows for energy efficiency, and created a seamless transition between the old and new spaces.',
    features: [
      'New family room with large windows',
      'Additional guest bedroom and bathroom',
      'Matching architectural style',
      'Energy-efficient insulation',
      'Seamless integration with existing home'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1170&q=80', // Main image: Home addition
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1169&q=80', // Interior of addition
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80', // Exterior detail
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80' // Family room
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1170&q=80', // Original home
        after: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1170&q=80', // Home with addition
        description: 'Added a 1,000 sq ft addition with a family room and guest suite.'
      }
    ]
  },
  {
    id: '6',
    title: 'Contemporary Bathroom Renovation',
    category: 'Remodeling',
    client: 'Lee Family',
    location: 'Sandy Springs, Atlanta',
    completionDate: 'January 2023',
    description: 'A complete renovation of a 200 square foot bathroom, transforming an outdated space into a modern, spa-like retreat with a walk-in shower, freestanding tub, and custom vanity.',
    challenge: 'The small space required creative design solutions to maximize functionality while maintaining a luxurious feel, and the original plumbing needed significant updates.',
    solution: 'We reconfigured the layout to include a spacious walk-in shower, installed modern plumbing fixtures, and used light colors and mirrors to enhance the sense of space.',
    features: [
      'Walk-in shower with glass enclosure',
      'Freestanding soaking tub',
      'Custom vanity with dual sinks',
      'Heated tile flooring',
      'LED lighting and mirrors'
    ],
    images: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=687&q=80', // Main image: Bathroom remodel
      'https://images.unsplash.com/photo-1600585154526-990d71b8f766?auto=format&fit=crop&w=1170&q=80', // Shower detail
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80', // Vanity view
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80' // Tub detail
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1170&q=80', // Old bathroom
        after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=687&q=80', // New bathroom
        description: 'Transformed an outdated bathroom into a modern spa-like retreat.'
      }
    ]
  },
  {
    id: '7',
    title: 'Suburban Home Build',
    category: 'New Construction',
    client: 'Garcia Family',
    location: 'Buckhead, Atlanta',
    completionDate: 'October 2022',
    description: 'A 3,500 square foot suburban home built in Buckhead, featuring a modern farmhouse design with open living spaces, a gourmet kitchen, and a large backyard. The project focused on family-friendly functionality and energy efficiency.',
    challenge: 'The client needed a family-friendly design with ample outdoor space, and the site had zoning restrictions that limited the footprint.',
    solution: 'We designed a multi-level layout to maximize space within zoning limits, created a large backyard with a deck, and incorporated energy-efficient features like double-pane windows and high-performance insulation.',
    features: [
      'Modern farmhouse design',
      'Gourmet kitchen with large island',
      'Open living and dining areas',
      'Double-pane energy-efficient windows',
      'Large backyard with deck',
      'High-performance insulation'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80', // Main image: New suburban home
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1169&q=80', // Kitchen
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80', // Exterior
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80' // Backyard
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1170&q=80', // Empty lot
        after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80', // Completed home
        description: 'Built a modern farmhouse-style home on an empty lot with family-friendly features.'
      }
    ]
  },
  {
    id: '8',
    title: 'Exterior Siding Refresh',
    category: 'Windows & Siding',
    client: 'Smith Family',
    location: 'Midtown, Atlanta',
    completionDate: 'July 2022',
    description: 'A full exterior siding refresh for a 2,500 square foot home, replacing old wood siding with durable fiber cement siding and updating the trim for a modern look. The project also included new energy-efficient windows.',
    challenge: 'The old siding was deteriorating and causing water damage, and the client wanted a modern aesthetic while maintaining the home’s character.',
    solution: 'We replaced the siding with fiber cement for durability, added modern trim in a contrasting color, and installed energy-efficient windows to improve insulation and reduce maintenance.',
    features: [
      'Durable fiber cement siding',
      'Modern contrasting trim',
      'Energy-efficient windows',
      'Improved weather resistance',
      'Low-maintenance materials'
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1170&q=80', // Main image: Exterior with new siding
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1169&q=80', // Siding detail
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80', // Window detail
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80' // Full exterior
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=1170&q=80', // Old exterior
        after: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1170&q=80', // New exterior
        description: 'Refreshed the exterior with new siding and windows for a modern, durable look.'
      }
    ]
  },
  {
    id: '9',
    title: 'Roof and Attic Renovation',
    category: 'Roofing',
    client: 'Harris Family',
    location: 'Sandy Springs, Atlanta',
    completionDate: 'April 2023',
    description: 'A comprehensive roof and attic renovation for a 3,000 square foot home, replacing the roof with asphalt shingles, adding new insulation, and converting the attic into a usable living space with proper ventilation.',
    challenge: 'The existing roof was leaking, and the attic lacked proper insulation and ventilation, making it unusable as a living space.',
    solution: 'We replaced the roof with high-quality asphalt shingles, installed new insulation and ventilation systems, and converted the attic into a functional living space with skylights for natural light.',
    features: [
      'Asphalt shingle roof replacement',
      'New attic insulation',
      'Improved ventilation system',
      'Converted attic into living space',
      'Skylights for natural light'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585153491-995b341b8a01?auto=format&fit=crop&w=1170&q=80', // Main image: Roofing project
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1169&q=80', // Attic interior
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1170&q=80', // Roof detail
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1074&q=80' // Skylight view
    ],
    beforeAfterImages: [
      {
        before: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1170&q=80', // Old attic
        after: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1169&q=80', // New attic
        description: 'Converted an unusable attic into a functional living space with new roofing and insulation.'
      }
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
                  alt={`${project.title} main image`} 
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
      
      {/* Before & After Section */}
      {project.beforeAfterImages && project.beforeAfterImages.length > 0 && (
        <section className="section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Before & After</h2>
              <p className="text-secondary-600 mb-8">
                See the dramatic transformation of this project through our before and after comparisons.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {project.beforeAfterImages.map((comparison, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col"
                  >
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <BeforeAfterSlider 
                        beforeImage={comparison.before}
                        afterImage={comparison.after}
                      />
                    </div>
                    <p className="text-center text-secondary-600">{comparison.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
      
      {/* Related Projects */}
      <section className="section bg-secondary-50">
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
                        alt={`${relatedProject.title} - ${relatedProject.category} project by Rivera Pro`} 
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