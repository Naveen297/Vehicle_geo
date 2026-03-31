/**
 * BackButton Component
 * Reusable back button for navigation
 */
const BackButton = ({ onClick, label = 'Back to Home' }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center mb-6 text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
};

export default BackButton;
