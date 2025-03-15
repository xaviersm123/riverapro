import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What areas do you serve in Atlanta?',
      answer: 'Rivera Pro provides residential remodeling services throughout the Atlanta metropolitan area, including Buckhead, Midtown, Sandy Springs, and beyond.'
    },
    {
      question: 'How do I get a quote for my remodeling project?',
      answer: 'You can request a free quote by filling out the contact form on our website or by calling us directly at 404-259-0577. We’ll get back to you promptly to discuss your project needs.'
    },
    {
      question: 'What types of projects do you specialize in?',
      answer: 'Rivera Pro specializes in residential remodeling, new construction, and home additions. Our expertise includes kitchen and bathroom renovations, basement finishing, windows, roofing, siding, and more.'
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Yes, Rivera Pro is fully licensed and insured to provide residential remodeling services in Atlanta.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about Rivera Pro’s residential remodeling services in Atlanta.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-lg"
            >
              <button
                className="w-full text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-2xl font-bold text-gray-900">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-600 flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 mt-4">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;