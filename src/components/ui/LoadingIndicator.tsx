// src/components/ui/LoadingIndicator.tsx
import React from 'react';
import { Loader2 } from 'lucide-react'; // Using Lucide icon

const LoadingIndicator: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-secondary-600">
      <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary-500" />
      <p>{message}</p>
    </div>
  );
};

export default LoadingIndicator;