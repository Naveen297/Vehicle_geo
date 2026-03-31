import { AlertCircle } from 'lucide-react';

/**
 * ErrorMessage Component
 * Displays error messages in a consistent styled container
 */
const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-start p-4 space-x-2 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
      <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
};

export default ErrorMessage;
