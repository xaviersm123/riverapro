import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ContactForm from '../components/ui/ContactForm';

const ContactPage: React.FC = () => {
  const handleSubmit = (data: any) => {
    // In a real application, this would send the form data to a server
    console.log('Form submitted:', data);
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Contact Us | Elite Contractor</title>
        <meta name="description" content="Get in touch with Elite Contractor for inquiries, quotes, or to discuss your construction and renovation needs." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-secondary-200">
              Have questions or ready to start your project? Get in touch with our team today.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information and Form */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading
                title="Get In Touch"
                subtitle="We're here to answer any questions you have about our services and how we can help with your project."
              />
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-lg text-primary-600 mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Our Office</h3>
                    <p className="text-secondary-600">123 Construction Ave, Building City, BC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-lg text-primary-600 mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Phone</h3>
                    <p className="text-secondary-600">
                      <a href="tel:+15551234567" className="hover:text-primary-600 transition-colors">(555) 123-4567</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-lg text-primary-600 mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <p className="text-secondary-600">
                      <a href="mailto:info@elitecontractor.com" className="hover:text-primary-600 transition-colors">info@elitecontractor.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-lg text-primary-600 mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Business Hours</h3>
                    <p className="text-secondary-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-secondary-600">Saturday: 9:00 AM - 2:00 PM</p>
                    <p className="text-secondary-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="rounded-lg overflow-hidden h-64 bg-secondary-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.2891632647384!2d-122.3351253!3d47.6062095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906ab6b122572d%3A0x4cc65f51348e1d43!2sSeattle%2C%20WA%2C%20USA!5e0!3m2!1sen!2sca!4v1651234567890!5m2!1sen!2sca" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm onSubmit={handleSubmit} />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services and process."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What areas do you serve?",
                answer: "We primarily serve the greater metropolitan area and surrounding suburbs within a 50-mile radius of our office. For larger projects, we may consider locations outside this range."
              },
              {
                question: "How do I get a quote for my project?",
                answer: "You can request a quote by filling out our contact form, calling our office, or visiting our Get a Quote page. We'll schedule a consultation to discuss your project in detail before providing a comprehensive estimate."
              },
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary greatly depending on scope and complexity. Small renovations might take 2-4 weeks, while custom homes can take 6-12 months. We provide detailed timelines during the planning phase."
              },
              {
                question: "Are you licensed and insured?",
                answer: "Yes, we are fully licensed, bonded, and insured. We maintain comprehensive liability insurance and workers' compensation coverage for all our projects and team members."
              },
              {
                question: "Do you offer warranties on your work?",
                answer: "Yes, we stand behind our craftsmanship with a comprehensive warranty. We offer a 1-year warranty on all workmanship and pass through manufacturer warranties on materials and products."
              },
              {
                question: "Can you work with my architect or designer?",
                answer: "Absolutely! We regularly collaborate with architects, designers, and other professionals. We're happy to work with your existing team to bring your vision to life."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-secondary-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactPage;