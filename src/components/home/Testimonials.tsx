import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import TestimonialCard from '../ui/TestimonialCard';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Rivera Pro transformed our outdated kitchen into a stunning, modern space that exceeded our expectations. Their attention to detail and craftsmanship is unmatched.",
      author: "Sarah Johnson",
      role: "Homeowner",
      rating: 5
    },
    {
      quote: "Working with Rivera Pro on our office renovation was a seamless experience. They maintained clear communication throughout and delivered on time and within budget.",
      author: "Michael Chen",
      role: "Business Owner",
      rating: 5
    },
    {
      quote: "The team at Rivera Pro brought our dream home to life with their expertise and dedication. They were responsive to our needs and the quality of work is exceptional.",
      author: "Emily Rodriguez",
      role: "Homeowner",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="section bg-secondary-900 text-white">
      <div className="container-custom">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Don't just take our word for it. Hear from our satisfied clients about their experience working with us."
          centered
          light
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;