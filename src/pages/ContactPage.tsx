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
        <title>Contact Us | Rivera Pro</title>
        <meta
          name="description"
          content="Get in touch with Rivera Pro for inquiries, quotes, or to discuss your residential remodeling and construction needs in Atlanta."
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Rivera Pro</h1>
            <p className="text-xl text-secondary-200">
              Ready to start your home remodeling or construction project? Reach out to our team today.
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
                subtitle="We’re here to answer your questions about our residential remodeling and construction services."
              />
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-lg text-primary-600 mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Our Office</h3>
                    <p className="text-secondary-600">123 Remodeling Lane, Atlanta, GA 30301</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-lg text-primary-600 mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Phone</h3>
                    <p className="text-secondary-600">
                      <a href="tel:+14042590577" className="hover:text-primary-600 transition-colors">404-259-0577</a>
                    </p>
                    <p className="text-secondary-600">
                      <a href="tel:+14043247464" className="hover:text-primary-600 transition-colors">404-324-7464</a>
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
                      <a href="mailto:Riverapro67@gmail.com" className="hover:text-primary-600 transition-colors">Riverapro67@gmail.com</a>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.042406827407!2d-84.39119968461423!3d33.74909898068648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5038a0f1e2b1d%3A0x7c2e1a5b7e6d4b8a!2sAtlanta%2C%20GA%2C%20USA!5e0!3m2!1sen!2sus!4v1698765432109!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rivera Pro Office Location"
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
            subtitle="Learn more about our residential remodeling and construction process."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What areas do you serve?",
                answer: "We serve the greater Atlanta metropolitan area, including Buckhead, Midtown, Sandy Springs, and beyond, within a 50-mile radius of our office."
              },
              {
                question: "How do I get a quote for my remodeling project?",
                answer: "You can request a quote by filling out our contact form below, calling us at 404-259-0577 or 404-324-7464, or emailing us at Riverapro67@gmail.com. We’ll schedule a consultation to discuss your project in detail."
              },
              {
                question: "How long does a typical remodeling project take?",
                answer: "Timelines vary depending on the project scope. A kitchen or bathroom remodel might take 4-8 weeks, while larger projects like additions can take 3-6 months. We’ll provide a detailed timeline during the planning phase."
              },
              {
                question: "Are you licensed and insured?",
                answer: "Yes, Rivera Pro is fully licensed and insured, ensuring your project is protected with comprehensive liability coverage."
              },
              {
                question: "Do you offer warranties on your work?",
                answer: "Yes, we provide a 1-year warranty on all workmanship for residential remodeling and construction, along with manufacturer warranties on materials."
              },
              {
                question: "Can I choose specific materials for my project?",
                answer: "Absolutely! We work closely with you to select materials for your project, such as hardwood flooring, windows, or roofing, ensuring they meet your vision and budget."
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