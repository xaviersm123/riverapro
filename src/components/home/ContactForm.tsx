import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            Have questions or want to discuss your project? Get in touch with us today.
          </p>
        </div>
        <form className="bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600" type="text" id="name" name="name" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600" type="email" id="email" name="email" required />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
            <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600" id="message" name="message" rows={6} required></textarea>
          </div>
          <div className="text-center">
            <button className="btn-primary" type="submit">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
