import React from 'react';
import { MapPin } from 'lucide-react';

const LocalServices: React.FC = () => {
  const atlantaAreas = [
    'Buckhead',
    'Midtown',
    'Downtown',
    'Decatur',
    'Sandy Springs',
    'Dunwoody',
    'Brookhaven',
    'Vinings',
    'East Atlanta',
    'Grant Park',
    'Inman Park',
    'Virginia Highland',
  ];

  return (
    <section className="py-20 bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">Proudly Serving Atlanta</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Our contracting services are available throughout the Atlanta metropolitan area, providing
            quality craftsmanship and reliable service to homeowners and businesses alike.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {atlantaAreas.map((area) => (
            <div
              key={area}
              className="bg-white p-4 rounded-lg shadow-md flex items-center transition-transform duration-300 hover:scale-105"
            >
              <MapPin className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
              <span className="text-secondary-800 font-medium">{area}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-secondary-600">
            Don't see your area? Contact us — we likely serve your location in the greater Atlanta region!
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocalServices;