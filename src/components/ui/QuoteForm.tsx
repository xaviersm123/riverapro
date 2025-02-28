import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

interface QuoteFormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>();

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="John Doe"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="john@example.com"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className={`input-field ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="(555) 123-4567"
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                message: 'Invalid phone number'
              }
            })}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-1">
            Project Address
          </label>
          <input
            id="address"
            type="text"
            className={`input-field ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="123 Main St, City, State"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-secondary-700 mb-1">
            Project Type
          </label>
          <select
            id="projectType"
            className={`input-field ${errors.projectType ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            {...register('projectType', { required: 'Project type is required' })}
          >
            <option value="">Select project type</option>
            <option value="residential">Residential Construction</option>
            <option value="commercial">Commercial Construction</option>
            <option value="renovation">Renovation</option>
            <option value="interior">Interior Design</option>
            <option value="exterior">Exterior Design</option>
            <option value="other">Other</option>
          </select>
          {errors.projectType && (
            <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-secondary-700 mb-1">
            Budget Range
          </label>
          <select
            id="budget"
            className={`input-field ${errors.budget ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            {...register('budget', { required: 'Budget range is required' })}
          >
            <option value="">Select budget range</option>
            <option value="under25k">Under $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="100k-250k">$100,000 - $250,000</option>
            <option value="250k-500k">$250,000 - $500,000</option>
            <option value="over500k">Over $500,000</option>
          </select>
          {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-secondary-700 mb-1">
          Desired Timeline
        </label>
        <select
          id="timeline"
          className={`input-field ${errors.timeline ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          {...register('timeline', { required: 'Timeline is required' })}
        >
          <option value="">Select desired timeline</option>
          <option value="asap">As soon as possible</option>
          <option value="1-3months">1-3 months</option>
          <option value="3-6months">3-6 months</option>
          <option value="6-12months">6-12 months</option>
          <option value="flexible">Flexible</option>
        </select>
        {errors.timeline && (
          <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-secondary-700 mb-1">
          Project Description
        </label>
        <textarea
          id="description"
          rows={4}
          className={`input-field ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Please describe your project in detail..."
          {...register('description', { required: 'Project description is required' })}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Request Quote'}
      </button>
    </motion.form>
  );
};

export default QuoteForm;