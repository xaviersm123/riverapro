import React from 'react';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'What areas do you serve in Atlanta?',
      answer: 'We provide construction and renovation services throughout the entire Atlanta metropolitan area.'
    },
    {
      question: 'How do I get a quote for my project?',
      answer: 'You can request a quote by filling out the contact form on our website or by calling us directly at +15551234567.'
    },
    {
      question: 'What types of projects do you specialize in?',
      answer: 'We specialize in residential and commercial construction, renovations, and custom builds. Our services include everything from kitchen and bathroom remodels to full-scale home renovations and new construction.'
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Yes, we are fully licensed and insured to provide construction and renovation services in Atlanta.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Find answers to some of the most common questions about our construction and renovation services in Atlanta.
          </p>
        </div>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
