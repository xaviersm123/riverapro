import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import QuoteForm from '../components/ui/QuoteForm';

const QuotePage: React.FC = () => {
  const handleSubmit = (data: any) => {
    // In a real application, this would send the form data to a server
    console.log('Quote form submitted:', data);
    alert('Thank you for your quote request! We will get back to you within 24-48 hours.');
  };

  const benefits = [
    'Detailed, transparent pricing',
    'Personalized project approach',
    'Expert consultation and guidance',
    'Comprehensive project timeline',
    'Material and finish recommendations',
    'No obligation to proceed'
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Request a Quote | Elite Contractor</title>
        <meta name="description" content="Request a free, no-obligation quote for your construction or renovation project from Elite Contractor." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Request a Quote</h1>
            <p className="text-xl text-secondary-200">
              Get a detailed, no-obligation quote for your construction or renovation project.
            </p>
          </div>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading
                title="Free Project Estimate"
                subtitle="Tell us about your project, and we'll provide a detailed quote tailored to your specific needs and vision."
              />
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Why Request a Quote?</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-secondary-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                <h3 className="text-xl font-bold mb-3">What Happens Next?</h3>
                <ol className="space-y-3 list-decimal list-inside text-secondary-700">
                  <li>We'll review your project details within 24-48 hours</li>
                  <li>Our team will contact you to schedule a consultation</li>
                  <li>We'll discuss your project in detail and assess your needs</li>
                  <li>You'll receive a comprehensive quote with detailed pricing</li>
                  <li>If you decide to proceed, we'll develop a project plan and timeline</li>
                </ol>
              </div>
            </motion.div>
            
            {/* Quote Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Tell Us About Your Project</h2>
              <QuoteForm onSubmit={handleSubmit} />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Don't just take our word for it. Here's what our clients have to say about working with us."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "The quote process was straightforward and transparent. Elite Contractor provided a detailed breakdown of costs and timeline that helped us make an informed decision.",
                author: "Michael Chen",
                role: "Business Owner"
              },
              {
                quote: "I appreciated how thorough Elite Contractor was during the quote process. They took the time to understand our vision and provided valuable suggestions that improved our project.",
                author: "Sarah Johnson",
                role: "Homeowner"
              },
              {
                quote: "Unlike other contractors who gave vague estimates, Elite Contractor provided a comprehensive quote that outlined every aspect of our renovation. There were no surprises or hidden costs.",
                author: "David Rodriguez",
                role: "Property Manager"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <blockquote className="text-secondary-700 italic mb-6">"{testimonial.quote}"</blockquote>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-secondary-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default QuotePage;